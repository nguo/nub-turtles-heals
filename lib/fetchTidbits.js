import { getSheet } from './sheetsService'

export default async function fetchTidbits(type) {
  let tidbits = await getSheet('*' + type)
  return tidbits
}
