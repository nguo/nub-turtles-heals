export default function Toolbar({ children }) {
  return (
    <div className="toolbar">
      {children}
      <style jsx>{`
        .toolbar {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  )
}
