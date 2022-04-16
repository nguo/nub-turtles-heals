export default function Card({ children }) {
  return (
    <div className="card">
      {children}
      <style jsx>{`
        .card {
          background: rgb(32, 32, 32) none repeat scroll 0% 0%;
          border: 1px solid black;
          border-radius: 5px;
          color: #ffffff;
          padding: 10px;
        }
      `}</style>
    </div>
  )
}
