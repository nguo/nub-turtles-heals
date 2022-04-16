import SmartText from './smartText'

export default function Role({ active, highlight, role, playersIndex, spellBook }) {
  function getHealerColor(name) {
    if (name === 'All') {
      return 'all-color'
    }
    const details = playersIndex[name]
    if (!details) {
      return ''
    }
    return details.class.toLowerCase() + '-color'
  }

  return (
    <div className="container" data-active={active} data-highlight={highlight}>
      <div className={[getHealerColor(role.healer), 'font-bold', 'ellipsis'].join(' ')}>
        {role.healer === 'All' ? '** ALL ** ' : role.healer}
      </div>
      {role.tasks.map((task) => {
        return (
          <>
            <div className="col2">{task.phase ? 'P' + task.phase : ''}</div>
            <div className="col3">
              <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.description} />
            </div>
            <div className="col3">
              <SmartText spellBook={spellBook} playersIndex={playersIndex} text={task.notes} />
            </div>
          </>
        )
      })}
      <style jsx>{`
        .container[data-active='false'] {
          opacity: 0.2;
        }
        .container[data-highlight='true'] {
          border-bottom: 1px solid #5fb701;
          border-top: 1px solid #5fb701;
        }
        .container {
          border-top: 1px groove darkgrey;
          display: grid;
          grid-template-columns: [start] 8em [line2] 2em [line3] auto [end];
          grid-row-gap: 0.1em;
          grid-column-gap: 0.1em;
          padding: 0.15em;
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
