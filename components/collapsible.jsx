import { useState } from 'react'

export default function Collapsible({ title, children }) {
  const [collapsed, setCollapsed] = useState(true)

  function toggleCollapse() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="container">
      <div className="title" data-clickable="true" onClick={toggleCollapse}>
        <span className="collapse-icon">{collapsed ? '+' : '-'}</span>
        <span>{title}</span>
      </div>
      <div className="body" data-collapsed={collapsed}>
        {children}
      </div>
      <style jsx>{`
        .collapse-icon {
          width: 30px;
          display: inline-block;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          margin: 10px;
        }
        .body {
          border-top: 1px grey solid;
        }
        .body[data-collapsed='true'] {
          display: none;
        }
      `}</style>
    </div>
  )
}
