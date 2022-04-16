import { getSheet } from './sheetsService'
import { indexBy } from './utils'

export default async function fetchPlayers() {
  let players = await getSheet('meta-players')
  return indexBy(players, 'name')
}
