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