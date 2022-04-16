import Tooltip from './tooltip'

export default function Spell({ displayText, spellInfo }) {
  return (
    <Tooltip tooltipText={spellInfo.description}>
      <a href={spellInfo.spellId ? 'https://tbc.wowhead.com/spell=' + spellInfo.spellId : ''}>{displayText}</a>
      <style jsx>{`
        a {
          /*font-weight: bold;*/
          font-style: italic;
          text-decoration: underline;
          color: palegoldenrod;
        }
      `}</style>
    </Tooltip>
  )
}
