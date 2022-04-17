export default function Tab({ children, active, clickable, onClick }) {
  return (
    <div data-active={active} data-clickable={clickable} onClick={onClick}>
      {children}
      <style jsx>{`
        div {
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 5px solid rgb(0, 0, 0, 0);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          color: #ffffff;
          padding: 10px;
        }
        div:hover {
          color: green;
          background-color: #131313;
          border-bottom-color: yellow;
        }
        div[data-clickable='true'] {
          cursor: pointer;
        }
        div[data-active='true'] {
          background-color: #131313;
          border-bottom-color: black;
        }
      `}</style>
    </div>
  )
}
