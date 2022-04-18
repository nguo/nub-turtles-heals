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
      return a.phase < b.phase ? -1 : 1
    }
  })
  const router = useRouter()
  const defaultGroup = orderedHealerGroups[0]
  const { raid, boss, group, healer } = router.query
  const [currOpenedDropdown, setCurrOpenedDropdown] = useState('')
  const [selectedRaid, setSelectedRaid] = useState(raid || '')
  const [selectedBoss, setSelectedBoss] = useState(boss || '')
  const [selectedGroup, setSelectedGroup] = useState(group || defaultGroup)
  const [selectedHealer, setSelectedHealer] = useState(healer || '')
  const [selectableBosses, setSelectableBosses] = useState(Object.keys(encNamesByBoss))
  const [filteredEncounterNames, setFilteredEncounterNames] = useState(filterEncounters(raid, boss, group || defaultGroup, healer, false))

  function updateQueryParams(raid, boss, group, healer) {
    const params = []
    if (group) {
      params.push('group=' + group)
    }
    if (raid) {
      params.push('raid=' + raid)
    }
    if (boss) {
      params.push('boss=' + boss)
    }
    if (healer) {
      params.push('healer=' + healer)
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
    if (raid) {
      encounterNames = encounterNames.filter((encName) => encNamesByRaid[raid].indexOf(encName) >= 0)
    }
    if (boss) {
      encounterNames = encounterNames.filter((encName) => encNamesByBoss[boss].indexOf(encName) >= 0)
    }
    if (group) {
      encounterNames = encounterNames.filter((encName) => encNamesByGroup[group].indexOf(encName) >= 0)
    }
    if (healer) {
      encounterNames = encounterNames.filter((encName) => encNamesByHealer[healer].indexOf(encName) >= 0)
    }
    if (updateState) {
      setFilteredEncounterNames(encounterNames)
    }
    return encounterNames
  }

  function handleFilterReset() {
    setSelectedRaid('')
    setSelectedBoss('')
    setSelectedHealer('')
    filterEncounters('', '', selectedGroup, '')
    updateQueryParams('', '', '', '')
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
            options={Object.keys(encNamesByHealer).sort()}
            onSelect={onSelectHealer}
          />
        </Toolbar>
        {(selectedRaid || selectedBoss || selectedHealer) && <p onClick={handleFilterReset}>Reset Selections</p>}
      </div>
      <CardsCollection>
        {filteredEncounterNames.map((encounter) => {
          const encSummary = encSummaryByEncName[encounter]
          const encRoles = encSummary.roleIds.map((rid) => rolesIndex[rid])
          encRoles.sort((a, b) => (a.healer < b.healer ? -1 : 1))
          return (
            <Card key={encounter}>
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
                      active={role.healer === selectedHealer || !selectedHealer}
                      highlight={role.healer === selectedHealer}
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
  const rolesIndex = await fetchAssignmentRoles()
  const playersIndex = await fetchPlayers()
  const spellBook = await fetchSpells()

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
