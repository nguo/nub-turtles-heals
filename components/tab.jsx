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
          color: white;
          padding: 10px;
        }
        div:hover {
          color: var(--color-hover-primary);
          background-color: var(--color-hover-secondary);
          border-bottom-color: var(--color-link-primary);
        }
        div[data-active='true'] {
          background-color: var(--color-hover-secondary);
          border-bottom-color: black;
        }
      `}</style>
    </div>
  )
}
