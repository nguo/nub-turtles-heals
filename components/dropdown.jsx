import { useState } from 'react'

export default function Dropdown({ required, label, value, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
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
        <button className="menu-button">
          {value || 'Select'} {isOpen ? <span>&#9206;</span> : <span>&#9207;</span>}
        </button>
        <div className="dropdown-list">
          {options.map((option, i) => (
            <button key={i} onClick={() => onItemClick(option)}>
              {option ? (
                <span data-selected={value && value === option}>{option}</span>
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
          width: 100%;
          position: relative;
        }
        .dropdown-container[data-open='true'] {
          z-index: 10;
        }

        .title {
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
        }

        button {
          width: 100%;
          border: none;
          padding: 10px;
          margin: 0px auto;
          background-color: #5fb701;
        }
        button[data-selected='true'] {
          font-weight: 800;
          text-transform: uppercase;
        }

        .menu-button {
          font-weight: 800;
          text-transform: uppercase;
        }
        .menu-button:hover {
          background-color: #498d01;
        }
        .dropdown-container[data-open='true'] .menu-button {
          background-color: #131313;
          color: white;
        }

        .dropdown-list {
          width: 100%;
          position: absolute;
        }

        .dropdown-list button {
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
      `}</style>
    </div>
  )
}
