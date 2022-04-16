import rsr from 'react-string-replace'
import Spell from './spell'

export default function SmartText({ text, spellBook }) {
  function parseSpells(str) {
    if (!str) {
      return <span></span>
    }
    return rsr(str, /(\[[^\]]+?])/g, (match, i) => {
      const spellInfo = spellBook[match.substring(1, match.length - 1)]
      if (spellInfo) {
        return <Spell key={i} displayText={match} spellInfo={spellInfo} />
      }
      return <span>match</span>
    })
  }

  return <>{parseSpells(text)}</>
}
