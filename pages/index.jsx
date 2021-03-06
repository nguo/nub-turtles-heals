import Card from '../components/card'
import Role from '../components/role'
import Dropdown from '../components/dropdown'
import Toolbar from '../components/toolbar'
import { useState } from 'react'
import fetchAssignmentRoles from '../lib/fetchAssignmentRoles'
import fetchPlayers from '../lib/fetchPlayers'
import fetchSpells from '../lib/fetchSpells'
import Layout from '../components/layout'
import CardsCollection from '../components/cardsCollection'
import { useRouter } from 'next/router'
import Copy from '../components/copy'
import { doesPlayerNameMatch, roleToString } from '../lib/utils'
import { ALL_HEALER_NAME } from '../lib/consts'

const dropdownFilters = {
  group: {
    id: 'group',
    label: 'Group Comp'
  },
  raid: {
    id: 'raid',
    label: 'Raid'
  },
  boss: {
    id: 'boss',
    label: 'Boss'
  },
  healer: {
    id: 'healer',
    label: 'Healer'
  }
}

function AssignmentsPage({
  encSummaryByEncName,
  encNamesByRaid,
  encNamesByHealer,
  encNamesByGroup,
  encNamesByBoss,
  bossesByRaid,
  rolesIndex,
  playersIndex,
  spellBook
}) {
  const orderedHealerGroups = Object.keys(encNamesByGroup).sort((a, b) => {
    if (isDefaultHealerGroup(a)) {
      return -1
    } else if (isDefaultHealerGroup(b)) {
      return 1
    } else {
      return a < b ? -1 : 1
    }
  })
  const router = useRouter()
  const defaultGroup = orderedHealerGroups[0]
  let initialRaid = ''
  let initialBoss = ''
  let initialGroup = defaultGroup
  let initialHealer = router.query.healer
  if (router.query.raid && encNamesByRaid[router.query.raid]) {
    initialRaid = router.query.raid
  }
  if (router.query.boss && encNamesByBoss[router.query.boss]) {
    initialBoss = router.query.boss
  }
  if (router.query.group && encNamesByGroup[router.query.group]) {
    initialGroup = router.query.group
  }
  const [currOpenedDropdown, setCurrOpenedDropdown] = useState('')
  const [selectedRaid, setSelectedRaid] = useState(initialRaid)
  const [selectedBoss, setSelectedBoss] = useState(initialBoss)
  const [selectedGroup, setSelectedGroup] = useState(initialGroup)
  const [selectedHealer, setSelectedHealer] = useState(initialHealer)
  const [selectableBosses, setSelectableBosses] = useState(initialRaid ? bossesByRaid[initialRaid] : Object.keys(encNamesByBoss))
  const [filteredEncounterNames, setFilteredEncounterNames] = useState(
    filterEncounters(initialRaid, initialBoss, initialGroup, initialHealer, false)
  )

  function updateQueryParams(raid, boss, group, healer) {
    const params = []
    if (group && group !== defaultGroup) {
      params.push('group=' + encodeURIComponent(group))
    }
    if (raid) {
      params.push('raid=' + encodeURIComponent(raid))
    }
    if (boss) {
      params.push('boss=' + encodeURIComponent(boss))
    }
    if (healer) {
      params.push('healer=' + encodeURIComponent(healer))
    }
    router.push(params.length ? router.pathname + '?' + params.join('&') : router.pathname, undefined, { shallow: true }, [])
  }

  function onFilterOpen(id) {
    setCurrOpenedDropdown(id)
  }

  function onSelectRaid(val) {
    setSelectedRaid(val)
    setSelectedBoss('')
    filterEncounters(val, '', selectedGroup, selectedHealer)
    updateQueryParams(val, '', selectedGroup, selectedHealer)
    setSelectableBosses(val ? bossesByRaid[val] : Object.keys(encNamesByBoss))
  }

  function onSelectBoss(val) {
    setSelectedBoss(val)
    filterEncounters(selectedRaid, val, selectedGroup, selectedHealer)
    updateQueryParams(selectedRaid, val, selectedGroup, selectedHealer)
  }

  function onSelectGroup(val) {
    setSelectedGroup(val)
    filterEncounters(selectedRaid, selectedBoss, val, selectedHealer)
    updateQueryParams(selectedRaid, selectedBoss, val, selectedHealer)
  }

  function onSelectHealer(val) {
    setSelectedHealer(val)
    filterEncounters(selectedRaid, selectedBoss, selectedGroup, val)
    updateQueryParams(selectedRaid, selectedBoss, selectedGroup, val)
  }

  function filterEncounters(raid, boss, group, healer, updateState = true) {
    let encounterNames = Object.keys(encSummaryByEncName)
    if (raid && encNamesByRaid[raid]) {
      encounterNames = encounterNames.filter((encName) => encNamesByRaid[raid].indexOf(encName) >= 0)
    }
    if (boss && encNamesByBoss[boss]) {
      encounterNames = encounterNames.filter((encName) => encNamesByBoss[boss].indexOf(encName) >= 0)
    }
    if (group && encNamesByGroup[group]) {
      encounterNames = encounterNames.filter((encName) => encNamesByGroup[group].indexOf(encName) >= 0)
    }
    if (healer) {
      // matching names include both names that include the healer and non-player, generic names (eg. "all")
      const matchingNames = Object.keys(encNamesByHealer).filter(
        (encounterHealer) => doesPlayerNameMatch(healer, encounterHealer) || !playersIndex[encounterHealer]
      )
      encounterNames = encounterNames.filter((encName) => {
        for (let matchingHealer of matchingNames) {
          if (encNamesByHealer[matchingHealer].indexOf(encName) >= 0) {
            return true
          }
        }
        return false
      })
    }
    if (updateState) {
      setFilteredEncounterNames(encounterNames)
    }
    return encounterNames
  }

  function copyEncounter(encounterSummary, encounterRoles) {
    let str = `**** Healing Assignments for ${encounterSummary.boss} ****\r\n`
    str += encounterRoles.map((role) => roleToString(role)).join('\r\n')
    str += '\r\n*********************'
    navigator.clipboard.writeText(str)
  }

  function handleFilterReset() {
    setSelectedRaid('')
    setSelectedBoss('')
    setSelectedHealer('')
    filterEncounters('', '', selectedGroup, '')
    updateQueryParams('', '', selectedGroup === defaultGroup ? '' : selectedGroup, '')
  }

  function getHealersList() {
    return Object.keys(playersIndex)
      .filter((name) => playersIndex[name].role === 'Healer')
      .sort()
  }

  function isDefaultHealerGroup(groupName) {
    return groupName && groupName.toLowerCase().indexOf('default') >= 0
  }

  return (
    <Layout pageTitle="Healing Assignments">
      <div className="toolbar-container">
        <Toolbar>
          <Dropdown
            required
            id={dropdownFilters.group.id}
            onOpen={onFilterOpen}
            forceClose={dropdownFilters.group.id !== currOpenedDropdown}
            label={dropdownFilters.group.label}
            value={selectedGroup}
            options={orderedHealerGroups}
            onSelect={onSelectGroup}
          />
          <Dropdown
            label={dropdownFilters.raid.label}
            id={dropdownFilters.raid.id}
            value={selectedRaid}
            onOpen={onFilterOpen}
            forceClose={dropdownFilters.raid.id !== currOpenedDropdown}
            options={Object.keys(encNamesByRaid).sort()}
            onSelect={onSelectRaid}
          />
          <Dropdown
            label={dropdownFilters.boss.label}
            id={dropdownFilters.boss.id}
            value={selectedBoss}
            onOpen={onFilterOpen}
            forceClose={dropdownFilters.boss.id !== currOpenedDropdown}
            options={selectableBosses.sort()}
            onSelect={onSelectBoss}
          />
          <Dropdown
            label="Healer"
            id={dropdownFilters.healer.id}
            value={selectedHealer}
            onOpen={onFilterOpen}
            forceClose={dropdownFilters.healer.id !== currOpenedDropdown}
            options={getHealersList()}
            onSelect={onSelectHealer}
          />
        </Toolbar>
        {(selectedRaid || selectedBoss || selectedHealer) && <p onClick={handleFilterReset}>Reset Selections</p>}
      </div>
      <CardsCollection>
        {filteredEncounterNames.map((encounter) => {
          const encSummary = encSummaryByEncName[encounter]
          const encRoles = encSummary.roleIds.map((rid) => rolesIndex[rid])
          encRoles.sort((a, b) => {
            // unknown healers sorted to the top
            if (!playersIndex[a.healer] && !playersIndex[b.healer]) {
              return a.healer < b.healer ? -1 : 1
            }
            if (!playersIndex[a.healer]) {
              return -1
            }
            if (!playersIndex[b.healer]) {
              return 1
            }
            return a.healer < b.healer ? -1 : 1
          })
          return (
            <Card key={encounter}>
              <div className="copy-container">
                <Copy onCopy={() => copyEncounter(encSummary, encRoles)} />
              </div>
              <div className="card-title">{encSummary.boss}</div>
              <div className="card-caption">
                ({encSummary.raid}, {encSummary.group})
              </div>
              <div className="roles-list">
                {encRoles.map((role) => {
                  return (
                    <Role
                      key={role.id}
                      role={role}
                      playersIndex={playersIndex}
                      spellBook={spellBook}
                      active={
                        doesPlayerNameMatch(selectedHealer, role.healer) ||
                        !selectedHealer ||
                        !playersIndex[role.healer] ||
                        role.healer === ALL_HEALER_NAME
                      }
                      highlight={
                        selectedHealer &&
                        (doesPlayerNameMatch(selectedHealer, role.healer) || !playersIndex[role.healer] || role.healer === ALL_HEALER_NAME)
                      }
                    />
                  )
                })}
              </div>
            </Card>
          )
        })}
      </CardsCollection>
      {filteredEncounterNames.length === 0 && <p>No matches against the selected filters</p>}
      <style jsx>{`
        .toolbar-container {
          margin: 20px 0;
        }
        .toolbar-container > p {
          cursor: pointer;
          text-decoration: underline;
        }
        .copy-container {
          width: 15px;
          float: right;
          cursor: pointer;
        }
        .card-title {
          font-size: larger;
          text-align: center;
          font-weight: bold;
        }
        .card-caption {
          font-size: small;
          text-align: center;
          color: lightgrey;
        }
        .roles-list {
          margin-top: 10px;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  const [rolesIndex, playersIndex, spellBook] = await Promise.all([fetchAssignmentRoles(), fetchPlayers(), fetchSpells()])

  const encSummaryByEncName = {}
  const encNamesByRaid = {}
  const encNamesByHealer = {}
  const encNamesByGroup = {}
  const encNamesByBoss = {}
  const bossesByRaid = {}

  for (let roleId in rolesIndex) {
    const role = rolesIndex[roleId]
    if (!encSummaryByEncName[role.encounter]) {
      encSummaryByEncName[role.encounter] = {
        raid: role.raid,
        boss: role.boss,
        group: role.group,
        roleIds: []
      }
    }
    encSummaryByEncName[role.encounter].roleIds.push(roleId)
    if (!encNamesByGroup[role.group]) {
      encNamesByGroup[role.group] = new Set()
    }
    encNamesByGroup[role.group].add(role.encounter)
    if (!encNamesByBoss[role.boss]) {
      encNamesByBoss[role.boss] = new Set()
    }
    encNamesByBoss[role.boss].add(role.encounter)
    if (!encNamesByRaid[role.raid]) {
      encNamesByRaid[role.raid] = new Set()
      bossesByRaid[role.raid] = new Set()
    }
    bossesByRaid[role.raid].add(role.boss)
    encNamesByRaid[role.raid].add(role.encounter)
    if (!encNamesByHealer[role.healer]) {
      encNamesByHealer[role.healer] = new Set()
    }
    encNamesByHealer[role.healer].add(role.encounter)
  }

  function convertSetValsToArrays(mapping) {
    for (let key in mapping) {
      mapping[key] = Array.from(mapping[key])
    }
  }

  convertSetValsToArrays(encNamesByRaid)
  convertSetValsToArrays(encNamesByHealer)
  convertSetValsToArrays(encNamesByGroup)
  convertSetValsToArrays(encNamesByBoss)
  convertSetValsToArrays(bossesByRaid)

  return {
    props: {
      encSummaryByEncName,
      encNamesByRaid,
      encNamesByHealer,
      encNamesByGroup,
      encNamesByBoss,
      bossesByRaid,
      rolesIndex,
      playersIndex,
      spellBook
    }
  }
}

export default AssignmentsPage
