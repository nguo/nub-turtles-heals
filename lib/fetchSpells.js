import { getSheet } from './sheetsService'
import { indexBy } from './utils'

export default async function fetchSpells(req, res) {
  let spells = await getSheet('meta-spellbook')
  return indexBy(spells, 'name')
}
