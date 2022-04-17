import NTHead from './nTHead'
import SiteNav from './siteNav'

export default function Layout({ children, pageTitle }) {
  return (
    <div>
      <NTHead pageTitle={pageTitle}></NTHead>
      <div className="main">
        <SiteNav pageTitle={pageTitle}></SiteNav>
        <div className="contents">{children}</div>
      </div>
      <style jsx>{`
        .main {
          padding-top: 50px;
        }
        .contents {
          margin: 20px 40px;
        }
      `}</style>
    </div>
  )
}
