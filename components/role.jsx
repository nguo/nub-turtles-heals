import SmartText from './smartText'
import Copy from './copy'
import { Fragment } from 'react'
import { roleToString } from '../lib/utils'
import { ALL_HEALER_NAME } from '../lib/consts'

export default function Role({ active, highlight, role, playersIndex, spellBook }) {
  function getHealerClass(name) {
    return name === ALL_HEALER_NAME ? 'all' : (playersIndex[name] && playersIndex[name].class.toLowerCase()) || 'default'
  }

  function copyRole() {
    navigator.clipboard.writeText(roleToString(role))
  }

  return (
    <div className="container" data-active={active} data-highlight={highlight}>
      <div className="name" data-class-color={getHealerClass(role.healer)} title={role.healer}>
        {role.healer === ALL_HEALER_NAME ? '** ALL ** ' : role.healer.replace(/\//g, ' / ')}
      </div>
      <div className="roles-container">
        {role.tasks.map((task, i) => {
          return (
            <Fragment key={i}>
              {i > 0 && <div className="line"></div>}
              {task.phase && (
                <div className="col1" data-row-color={i % 2 === 0 ? 'dark' : 'light'}>
                  P{task.phase}:
                </div>
              )}
              {task.description && (
                <div className={task.phase ? 'col2' : 'col1-2'} data-row-color={i % 2 === 0 ? 'dark' : 'light'}>
                  <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.description} />
                </div>
              )}
              {task.notes && (
                <div className={task.phase ? 'col2' : 'col1-2'} data-row-color={i % 2 === 0 ? 'dark' : 'light'}>
                  <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.notes} />
                </div>
              )}
            </Fragment>
          )
        })}
        <div className="copy-icon">
          <Copy onCopy={copyRole} />
        </div>
      </div>
      <style jsx>{`
        .container {
          border-top: 1px solid var(--color-line);
          display: flex;
          width: 100%;
        }
        .container[data-active='false'] {
          /** TODO: do we want to completely hide non-active roles or just dim? */
          // opacity: 0.2;
          // font-weight: lighter;
          // pointer-events: none;
          display: none;
        }
        .container[data-highlight='true'] {
          /** TODO: do we still want highlighting? */
          // border-bottom: 1px solid var(--color-link-primary);
          // border-top: 1px solid var(--color-link-primary);
        }
        .roles-container {
          display: grid;
          grid-template-columns: [start] 3ch [line2] auto [line3] 1ch [end];
          grid-row-gap: 0.2em;
          grid-column-gap: 0.2ch;
          padding: 0.15em;
          flex-grow: 1;
        }

        .copy-icon {
          // flex: 0 0 0.8em;
          // margin-right: 0.1em;
          // padding-top: 0.15em;

          width: 0.8em;
          grid-row-start: 1;
          grid-column-end: 5;
          justify-self: end;
          align-self: start;

          opacity: 0;
          cursor: pointer;
        }
        .container:hover .copy-icon {
          opacity: 1;
        }

        .name {
          padding-top: 0.15em;
          margin-right: 0.5ch;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 0 0 8.8ch;
        }
        .container[data-highlight='true'] .name {
          font-weight: bold;
        }

        .line {
          grid-column-start: start;
          grid-column-end: 5;
          height: 1px;
          border-top: 1px dashed var(--color-line);
          opacity: 0.5;
        }

        .col1 {
          grid-column-start: start;
          grid-column-end: line2;
        }

        .col1-2 {
          grid-column-start: start;
          grid-column-end: end;
        }

        .col2 {
          grid-column-start: line2;
          grid-column-end: end;
        }
      `}</style>
    </div>
  )
}
