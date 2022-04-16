import { useState } from 'react'

export default function Dropdown({ label, value, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  function openMenu() {
    setIsOpen(true)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  function onItemClick(name) {
    onSelect(name)
    setIsOpen(!isOpen)
  }

  return (
    <div className="dropdown-container">
      <div className="title">{label}</div>
      <div onMouseEnter={openMenu} onMouseLeave={closeMenu}>
        <button data-selected="true">
          {value || 'Select'} {isOpen ? <span>&#9206;</span> : <span>&#9207;</span>}
        </button>
        <div className="dropdown-list">
          {options.map((option, i) => (
            <button key={i} onClick={() => onItemClick(option)} data-visible={isOpen}>
              {option ? <span data-selected={value && value === option}>{option}</span> : <span>&nbsp;</span>}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        [data-visible='true'] {
          display: block;
        }
        [data-visible='false'] {
          display: none;
        }
        [data-selected='true'] {
          font-weight: 800;
          text-transform: uppercase;
        }
        .title {
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
        }
        .dropdown-container {
          z-index: 10;
          width: 100%;
          position: relative;
        }
        .dropdown-list {
          width: 100%;
          position: absolute;
        }
        button {
          width: 100%;
          border: none;
          padding: 10px;
          margin: 0px auto;
          background-color: #5fb701;
        }
        .dropdown-list button {
          border-top: 1px solid rgba(0, 0, 0, 0.3);
        }
        button:hover {
          background-color: #131313;
          color: white;
        }
      `}</style>
    </div>
  )
}
