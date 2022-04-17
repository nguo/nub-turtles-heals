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
    label: 'Resources',
    path: '/resources'
  }
]

export default function SiteNav({ pageTitle }) {
  const router = useRouter()
  const [currTabPath, setCurrTabPath] = useState(router.pathname)

  function handleClick(tabData) {
    setCurrTabPath(tabData.path)
  }

  return (
    <div>
      <Toolbar>
        {tabs.map((tabData, i) => (
          <Link key={i} href={tabData.path}>
            <Tab onClick={() => handleClick(tabData)} active={currTabPath === tabData.path} clickable={currTabPath !== tabData.path}>
              {tabData.label}
            </Tab>
          </Link>
        ))}
      </Toolbar>
      <div className="header">
        <h1>{pageTitle}</h1>
        <img alt="logo" src="/logo.png" />
      </div>
      <style jsx>{`
        div {
          position: relative;
        }
        img {
          bottom: 0;
          right: 25px;
          position: absolute;
          height: 180px;
        }
        h1 {
          display: inline-block;
          background-color: #131313;
          padding: 25px 40px;
          width: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
