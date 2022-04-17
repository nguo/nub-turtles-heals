import { useState } from 'react'

export default function Dropdown({ id, required, label, value, options, onSelect, forceClose, onOpen }) {
  const [isOpen, setIsOpen] = useState(false)

  if (forceClose && isOpen) {
    setIsOpen(false)
  }

  function toggleMenu() {
    if (!isOpen) {
      onOpen(id)
    }
    setIsOpen(!isOpen)
  }

  function onItemClick(name) {
    onSelect(name)
    setIsOpen(!isOpen)
  }

  if (value && !required) {
    options = ['', ...options]
  }

  return (
    <div className="dropdown-container" data-open={isOpen}>
      <div className="title">{label}</div>
      <div onClick={toggleMenu}>
        <button className="menu-button" data-value={value}>
          {value || 'Select'} {isOpen ? <span className="menu-icon">&#9650;</span> : <span className="menu-icon">&#9660;</span>}
        </button>
        <div className="dropdown-list">
          {options.map((option, i) => (
            <button key={i} data-selected={value && value === option} onClick={() => onItemClick(option)}>
              {option ? (
                <span>{option}</span>
              ) : (
                <span>
                  <i>Clear Selected</i>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .dropdown-container {
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: 1fr 1fr;
          align-items: center;
          width: 100%;
          position: relative;
        }
        .dropdown-container[data-open='true'] {
          z-index: 10;
        }

        .title {
          font-weight: bold;
          text-align: center;
        }

        button {
          width: 100%;
          border: none;
          padding: 10px;
          margin: 0px auto;
          background-color: #498d01;
        }
        button[data-selected='true'] {
          font-weight: 800;
          text-transform: uppercase;
        }

        [data-value]:not([data-value='']) {
          background-color: #202020;
          color: white;
          border: 1px solid black;
        }

        .menu-button {
          font-weight: 800;
          text-transform: uppercase;
        }
        .menu-button:hover {
          background-color: #5fb701;
        }
        .dropdown-container[data-open='true'] .menu-button {
          background-color: #131313;
          color: white;
        }

        .menu-icon {
          font-size: 10px;
        }

        .dropdown-list {
          width: 100%;
          position: absolute;
          border: none;
        }
        .dropdown-container[data-open='true'] .dropdown-list {
          border: 1px solid #131313;
        }

        .dropdown-list button {
          background-color: #5fb701;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
        }
        .dropdown-list button:hover {
          background-color: #131313;
          color: white;
        }
        .dropdown-container[data-open='true'] .dropdown-list button {
          display: block;
        }
        .dropdown-container[data-open='false'] .dropdown-list button {
          display: none;
        }

        @media (max-width: 900px) {
          .dropdown-container {
            grid-template-columns: 1fr 2fr;
            grid-template-rows: auto;
          }

          .dropdown-list {
            width: calc(2 * (100% / 3));
          }
        }
      `}</style>
    </div>
  )
}
