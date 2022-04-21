export function indexBy(array, key) {
  const index = {}
  for (let obj of array) {
    index[obj[key]] = obj
  }
  return index
}

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
    .replace(/\W/g, '')
}

export function roleToString(role) {
  let str = ''
  str += `${role.healer} -> `
  str += role.tasks.map((task) => taskToString(task)).join(', ')
  return str
}

export function taskToString(task) {
  return ((task.phase && `P${task.phase}: `) || '') + task.description + ((task.notes && ` (${task.notes})`) || '')
}

export function doesPlayerNameMatch(name, indexedPlayer) {
  // some player names in the index are joint names, check for those matches
  if (!name || !indexedPlayer) {
    return false
  }
  name = name.toLowerCase()
  indexedPlayer = indexedPlayer.toLowerCase()
  return name === indexedPlayer || indexedPlayer.split('/').indexOf(name) >= 0
}
