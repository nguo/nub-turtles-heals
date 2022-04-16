import Card from '../components/card'
import Role from '../components/role'
import Head from 'next/head'
import Dropdown from '../components/dropdown'
import Toolbar from '../components/toolbar'
import { useState } from 'react'
import fetchAssignmentRoles from '../lib/fetchAssignmentRoles'
import fetchPlayers from '../lib/fetchPlayers'
import fetchSpells from '../lib/fetchSpells'

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
  const [selectedRaid, setSelectedRaid] = useState('')
  const [selectedBoss, setSelectedBoss] = useState('')
  const [selectedGroup, setSelectedGroup] = useState(Object.keys(encNamesByGroup).sort()[0])
  const [selectedHealer, setSelectedHealer] = useState('')
  const [selectableBosses, setSelectableBosses] = useState(Object.keys(encNamesByBoss))
  const [filteredEncounterNames, setFilteredEncounterNames] = useState(encNamesByGroup[selectedGroup])

  function onSelectRaid(val) {
    setSelectedRaid(val)
    setSelectedBoss('')
    filterEncounters(val, '', selectedGroup, selectedHealer)
    setSelectableBosses(val ? bossesByRaid[val] : Object.keys(encNamesByBoss))
  }

  function onSelectBoss(val) {
    setSelectedBoss(val)
    filterEncounters(selectedRaid, val, selectedGroup, selectedHealer)
  }

  function onSelectGroup(val) {
    setSelectedGroup(val)
    filterEncounters(selectedRaid, selectedBoss, val, selectedHealer)
  }

  function onSelectHealer(val) {
    setSelectedHealer(val)
    filterEncounters(selectedRaid, selectedBoss, selectedGroup, val)
  }

  function filterEncounters(raid, boss, group, healer) {
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
    setFilteredEncounterNames(encounterNames)
  }

  return (
    <>
      <Head>
        <title>Nub Heals</title>
      </Head>
      <div className="main">
        <h1>Healing Assignments</h1>
        <Toolbar>
          <Dropdown
            label="Group Configuration"
            value={selectedGroup}
            options={Object.keys(encNamesByGroup).sort()}
            onSelect={onSelectGroup}
          />
          <Dropdown label="Raid" value={selectedRaid} options={['', ...Object.keys(encNamesByRaid).sort()]} onSelect={onSelectRaid} />
          <Dropdown label="Boss" value={selectedBoss} options={['', ...selectableBosses.sort()]} onSelect={onSelectBoss} />
          <Dropdown
            label="Healer"
            value={selectedHealer}
            options={['', ...Object.keys(encNamesByHealer).sort()]}
            onSelect={onSelectHealer}
          />
        </Toolbar>
        <div className="flex-container">
          {filteredEncounterNames.map((encounter) => {
            const encSummary = encSummaryByEncName[encounter]
            const encRoles = encSummary.roleIds.map((rid) => rolesIndex[rid])
            encRoles.sort((a, b) => (a.healer < b.healer ? -1 : 1))
            return (
              <div key={encounter} className="card-container">
                <Card>
                  <div className="title">{encSummary.boss}</div>
                  <div className="caption">
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
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .main {
          margin: 40px;
        }
        .flex-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 10px;
          margin: 20px 0;
        }
        .title {
          font-size: larger;
          text-align: center;
          font-weight: bold;
        }
        .caption {
          font-size: small;
          text-align: center;
          color: lightgrey;
        }
        .roles-list {
          margin-top: 10px;
        }
        .card-container {
          /* flex: 1; */
        }
      `}</style>
    </>
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
