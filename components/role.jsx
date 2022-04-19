import SmartText from './smartText'
import Copy from './copy'
import { Fragment } from 'react'
import { roleToString } from '../lib/utils'
import { ALL_HEALER_NAME } from '../lib/consts'

export default function Role({ active, highlight, role, playersIndex, spellBook }) {
  function getHealerClass(name) {
    return (name === ALL_HEALER_NAME ? 'all' : playersIndex[name] && playersIndex[name].class).toLowerCase()
  }

  function copyRole() {
    navigator.clipboard.writeText(roleToString(role))
  }

  return (
    <div className="container" data-active={active} data-highlight={highlight}>
      <div className="name" data-class-color={getHealerClass(role.healer)}>
        {role.healer === ALL_HEALER_NAME ? '** ALL ** ' : role.healer}
      </div>
      {role.tasks.map((task, i) => {
        return (
          <Fragment key={i}>
            <div className="col2">{task.phase ? 'P' + task.phase : ''}</div>
            <div className="col3">
              <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.description} />
            </div>
            <div className="col3">
              <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.notes} />
            </div>
          </Fragment>
        )
      })}
      <div className="copy-icon">
        <Copy onCopy={copyRole} />
      </div>
      <style jsx>{`
        .container {
          border-top: 1px groove darkgrey;
          display: grid;
          grid-template-columns: [start] 6.5em [line2] 2em [line3] auto [line4] 0.8em [end];
          grid-row-gap: 0.1em;
          grid-column-gap: 0.1em;
          padding: 0.15em;
          pointer-events: auto;
          font-weight: normal;
        }
        .container[data-active='false'] {
          /** TODO: do we want to completely hide non-active roles or just dim? */
          // opacity: 0.2;
          // font-weight: lighter;
          // pointer-events: none;
          display: none;
        }
        .container[data-highlight='true'] {
          border-bottom: 1px solid #5fb701;
          border-top: 1px solid #5fb701;
          pointer-events: auto;
        }

        .copy-icon {
          display: none;
          width: 0.8em;
          grid-row-start: 1;
          grid-column-end: 5;
          justify-self: end;
          align-self: start;
          cursor: pointer;
        }
        .container:hover .copy-icon {
          display: block;
        }

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .container[data-highlight='true'] .name {
          font-weight: bold;
        }

        .col2 {
          grid-column-start: 2;
        }

        .col3 {
          grid-column-start: 3;
        }
      `}</style>
    </div>
  )
}
