import { getSheets, getSheet } from './sheetsService'

function reduceToRoles(group, tasks) {
  // each role has a unique encounter + healer combo
  const roles = {}
  for (let task of tasks) {
    const encounterName = (task.raid + '-' + task.boss + '-' + group).toLowerCase().replace(/\s/g, '')
    const roleId = encounterName + task.healer
    const taskSpecifics = {
      phase: task.phase || '',
      description: task.assignment || '',
      notes: task.notes || ''
    }
    if (!roles[roleId]) {
      roles[roleId] = {
        id: roleId,
        group: group,
        raid: task.raid || 'General',
        boss: task.boss,
        healer: task.healer,
        encounter: encounterName,
        tasks: []
      }
    }
    roles[roleId].tasks.push(taskSpecifics)
  }
  for (let roleId in roles) {
    roles[roleId].tasks.sort((a, b) => (a.phase < b.phase ? -1 : 1))
  }
  return roles
}

export default async function fetchAssignmentRoles() {
  const sheets = await getSheets()
  let result = {}
  for (let sheet of sheets) {
    const sheetName = sheet.properties.title
    if (sheetName.indexOf('*') !== 0) {
      let tasks = await getSheet(sheetName)
      Object.assign(result, reduceToRoles(sheetName, tasks))
    }
  }
  return result
}
