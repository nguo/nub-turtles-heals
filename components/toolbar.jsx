export default function Toolbar({ children }) {
  return (
    <div className="toolbar">
      {children}
      <style jsx>{`
        .toolbar {
          display: flex;
          gap: 10px;
        }

        @media (max-width: 900px) {
          .toolbar {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  )
}
