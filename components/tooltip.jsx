export default function Tooltip({ tooltipText, children }) {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltiptext">{tooltipText}</span>
      <style jsx>{`
        .tooltip {
          position: relative;
          display: inline-block;
          border-bottom: 1px dotted black;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          width: 150px;
          background-color: palegoldenrod;
          color: #000;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 150%;
          left: 50%;
          margin-left: -60px;
        }

        .tooltip .tooltiptext::after {
          content: ' ';
          position: absolute;
          top: 100%; /* At the bottom of the tooltip */
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: palegoldenrod transparent transparent transparent;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
      `}</style>
    </span>
  )
}
