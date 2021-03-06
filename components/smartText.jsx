import rsr from 'react-string-replace'
import Spell from './spell'

export default function SmartText({ text, spellBook }) {
  function parse(str) {
    if (!str) {
      return <span></span>
    }
    // parse for spells
    let parsed
    if (spellBook) {
      parsed = rsr(str, /\[([^\]]+?)]/g, (match, i) => {
        const spellInfo = spellBook[match]
        if (spellInfo) {
          return <Spell key={'spell-' + i} displayText={match} spellInfo={spellInfo} />
        }
        return <span key={'spell-' + i}>[{match}]</span>
      })
    } else {
      parsed = [text]
    }
    // replace newline characters with line break
    parsed.forEach((part, i) => {
      parsed[i] = rsr(part, /(\n)/g, (match, i) => {
        return <br key={'br-' + i + Math.floor(Math.random() * 1000)} />
      })
    })
    parsed = parsed.flat()
    // replace urls with a tags
    parsed.forEach((part, i) => {
      parsed[i] = rsr(part, /(http[s]?:\/\/[\S]+)\s*/g, (match, i) => {
        return (
          <a key={'a-' + i} href={match} target="_blank" rel="noopener noreferrer">
            {match}
          </a>
        )
      })
    })
    return parsed.flat()
  }

  return <>{parse(text)}</>
}
