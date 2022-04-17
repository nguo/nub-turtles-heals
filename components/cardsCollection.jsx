import Masonry from 'react-masonry-css'

export default function CardsCollection({ children }) {
  let maxCols = Math.min(children.length, 5)
  const breakpointColumnsObj = {
    default: maxCols,
    1441: Math.min(maxCols, 4),
    1200: Math.min(maxCols, 3),
    990: Math.min(maxCols, 2),
    700: 1
  }

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-column">
      {children}
    </Masonry>
  )
}
