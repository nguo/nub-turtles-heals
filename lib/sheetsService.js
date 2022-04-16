import { toCamelCase } from './utils'

const sheetsConfig = {
  url: process.env.GSHEETS_URL,
  key: process.env.GSHEETS_KEY,
  id: process.env.GSHEETS_ID
}

function constructUrl(path) {
  return sheetsConfig.url + sheetsConfig.id + path + '?key=' + sheetsConfig.key
}

/**
 * Given 2D array of spreadsheet cell values, transform it into a flat array of json data
 * where each json contains a mapping of the column header name to the cell value
 * @param values
 * @returns []
 */
function transformValuesToJsonRows(values) {
  // first row is key
  const columns = {}
  const jsonRows = []
  values.forEach((row, i) => {
    let jsonRow = {}
    row.forEach((cell, j) => {
      if (i === 0) {
        columns[j] = toCamelCase(cell)
      } else {
        jsonRow[columns[j]] = cell
      }
    })
    if (i !== 0) {
      jsonRows.push(jsonRow)
    }
  })
  return jsonRows
}

export async function getSheet(sheetName) {
  const url = constructUrl('/values/' + sheetName)
  const result = await fetch(url)
  const json = await result.json()
  return transformValuesToJsonRows(json.values)
}

export async function getSheets() {
  const url = constructUrl('')
  const result = await fetch(url)
  const json = await result.json()
  return json.sheets
}
