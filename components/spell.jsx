import Tooltip from './tooltip'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Spell({ displayText, spellInfo }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice !== touch) {
      setIsTouchDevice(touch)
    }
  }, [])

  function onSpellClick(e) {
    if (isTouchDevice || !spellInfo.spellId) {
      e.preventDefault()
      return
    }
    router.push(getLink())
  }

  function getLink() {
    return 'https://tbc.wowhead.com/spell=' + spellInfo.spellId
  }

  return (
    <Tooltip
      tooltipText={
        isTouchDevice ? (
          <div>
            <div>{spellInfo.description}</div>
            {spellInfo.spellId && <a href={getLink()}>go to spell</a>}
          </div>
        ) : (
          spellInfo.description
        )
      }>
      <div className="spell" data-spellid={spellInfo.spellId} onClick={onSpellClick}>
        {displayText}
      </div>
      <style jsx>{`
        .spell {
          font-style: italic;
          color: palegoldenrod;
        }
        a {
          color: darkgreen;
        }
        [data-spellid]:not([data-spellid='']) {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </Tooltip>
  )
}
