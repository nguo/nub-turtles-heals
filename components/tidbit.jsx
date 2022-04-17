import SmartText from './smartText'

export default function Tidbit({ data }) {
  return (
    <div className="container">
      <div className="title">{data.name}</div>
      {data.link && (
        <a className="link" href={data.link}>
          [link here]
        </a>
      )}
      <div className="summary">
        <SmartText text={data.summary} />
      </div>
      <div className="details">
        <SmartText text={data.details} />
      </div>
      <style jsx>{`
        .container {
          margin-bottom: 20px;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        a {
          font-size: 12px;
        }
        .summary {
          margin-top: 10px;
          font-weight: bold;
        }
        .details {
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}
