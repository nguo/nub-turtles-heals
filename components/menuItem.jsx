export default function MenuItem({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          background: var(--color-hover-secondary);
          font-weight: bold;
          text-transform: uppercase;
          border-top: 1px solid grey;
          color: white;
          padding: 10px;
          text-align: center;
          cursor: pointer;
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
