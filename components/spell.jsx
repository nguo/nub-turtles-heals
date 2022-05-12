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
    if (isTouchDevice || !spellInfo.link) {
      e.preventDefault()
      return
    }
    router.push(spellInfo.link)
  }

  return (
    <Tooltip
      tooltipText={
        isTouchDevice ? (
          <div>
            <div>{spellInfo.description}</div>
            {spellInfo.link && <a href={spellInfo.link}>go to spell</a>}
          </div>
        ) : (
          spellInfo.description
        )
      }>
      <div className="spell" data-clickable={spellInfo.link} onClick={onSpellClick}>
        [<span>
          <img src={spellInfo.image} />
        </span>
        <span>{displayText}</span>]
      </div>
      <style jsx>{`
        .spell {
          color: var(--color-bg-tooltip);
        }
        img {
          height: 0.8em;
          padding-right: 0.1em;
        }
        a {
          color: darkgreen;
        }
        [data-clickable]:not([data-clickable='']) {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </Tooltip>
  )
}
