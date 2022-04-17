import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 5,
  1441: 4,
  1200: 3,
  990: 2,
  700: 1
}

export default function CardsCollection({ children }) {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-column">
      {children}
    </Masonry>
  )
}
