import { getSheet } from './sheetsService'

export default async function fetchTidBits(req, res) {
  let tidbits = await getSheet('*tidbits')
  return tidbits
}
