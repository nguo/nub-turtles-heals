import Tab from './tab'
import { useState } from 'react'
import Toolbar from './toolbar'
import Link from 'next/link'
import { useRouter } from 'next/router'

const tabs = [
  {
    label: 'Assignments',
    path: '/'
  },
  {
    label: 'Tidbits',
    path: '/tidbits'
  }
]

export default function SiteNav({ pageTitle }) {
  const router = useRouter()
  const [currTabPath, setCurrTabPath] = useState(router.pathname)

  function handleClick(tabData) {
    setCurrTabPath(tabData.path)
  }

  return (
    <div className="site-nav-container">
      <img id="img-top" alt="logo" src="/logo.png" />
      <div className="tabs-list">
        {tabs.map((tabData, i) => (
          <Link key={i} href={tabData.path}>
            <div>
              <Tab onClick={() => handleClick(tabData)} active={currTabPath === tabData.path} clickable={currTabPath !== tabData.path}>
                {tabData.label}
              </Tab>
            </div>
          </Link>
        ))}
      </div>
      <div className="header">
        <h1>{pageTitle}</h1>
        <img id="img-right" alt="logo" src="/logo.png" />
      </div>
      <style jsx>{`
        .site-nav-container {
          padding-top: 50px;
        }

        .tabs-list {
          margin-left: 20px;
          display: flex;
          gap: 10px;
        }

        .header {
          position: relative;
        }

        #img-top {
          display: none;
        }

        #img-right {
          display: block;
          bottom: 0;
          right: 25px;
          position: absolute;
          height: 180px;
        }

        h1 {
          display: inline-block;
          background-color: var(--color-hover-secondary);
          padding: 25px 40px;
          width: 100%;
          margin: 0;
        }

        @media (max-width: 580px) {
          .site-nav-container {
            padding-top: 0;
          }

          #img-top {
            display: block;
            margin: 10px auto;
          }

          #img-right {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
