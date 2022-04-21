export default function Card({ children }) {
  return (
    <div className="card">
      {children}
      <style jsx>{`
        .card {
          background: var(--color-bg-primary);
          border: 1px solid black;
          border-radius: 5px;
          color: white;
          padding: 10px;
        }
      `}</style>
    </div>
  )
}
