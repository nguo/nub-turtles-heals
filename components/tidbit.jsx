import SmartText from './smartText'

export default function Tidbit({ data }) {
  return (
    <div className="container">
      {data.name && <div className="title">{data.name}</div>}
      <div className="body">
        {data.link && (
            <a className="link" href={data.link}>
              [link here]
            </a>
        )}
        {data.image && (
            <img src={data.image} />
        )}
        <div className="summary">
          <SmartText text={data.summary} />
        </div>
        <div className="details">
          <SmartText text={data.details} />
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-bottom: 40px;
        }
        .body {
          color: #eee;
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
        img {
          display: block;
          margin: 10px auto;
          width: 80%;
          height: auto;
        }
      `}</style>
    </div>
  )
}
