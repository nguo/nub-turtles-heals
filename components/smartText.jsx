import rsr from 'react-string-replace'
import Spell from './spell'

export default function SmartText({ text, spellBook }) {
  function parseSpells(str) {
    if (!str) {
      return <span></span>
    }
    // parse for spells
    let withSpells = rsr(str, /(\[[^\]]+?])/g, (match, i) => {
      const spellInfo = spellBook[match.substring(1, match.length - 1)]
      if (spellInfo) {
        return <Spell key={i} displayText={match} spellInfo={spellInfo} />
      }
      return <span key={i}>{match}</span>
    })
    // replace newline characters with line break
    withSpells.forEach((part, i) => {
      withSpells[i] = rsr(part, /(\n)/g, (match, i) => {
        return <br key={i} />
      })
    })
    return withSpells.flat()
  }

  return <>{parseSpells(text)}</>
}
