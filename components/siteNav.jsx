import Tab from './tab'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuItem from './menuItem'
import Hamburger from './hamburger'

const tabs = [
  {
    label: 'Assignments',
    path: '/'
  },
  {
    label: 'Raider Plans',
    path: '/raider-plans'
  },
  {
    label: 'Resources',
    path: '/resources'
  },
  {
    label: 'Guides',
    path: '/guides'
  }
]

export default function SiteNav({ pageTitle }) {
  const router = useRouter()
  const [currTabPath, setCurrTabPath] = useState(router.pathname)
  const [showMenu, setShowMenu] = useState(false)

  function handleClick(tabData) {
    setCurrTabPath(tabData.path)
    setShowMenu(false)
  }

  function onMenu() {
    setShowMenu(!showMenu)
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
        <div className="banner">
          <h1>{pageTitle}</h1>
          <div className="menu-button" onClick={() => onMenu()}>
            <Hamburger />
          </div>
          <img id="img-right" alt="logo" src="/logo.png" />
        </div>
        <div className="mobile-menu" data-expand={showMenu}>
          {tabs.map((tabData, i) => {
            return currTabPath === tabData.path ? (
              <></>
            ) : (
              <Link key={i} href={tabData.path}>
                <div key={i} onClick={() => handleClick(tabData)}>
                  <MenuItem>{tabData.label}</MenuItem>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .site-nav-container {
          padding-top: 50px;
        }

        .menu-button {
          display: none;
        }

        .mobile-menu {
          display: none;
        }

        .tabs-list {
          margin-left: 20px;
          display: flex;
          gap: 15px;
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
          width: 85%;
        }

        .banner {
          background-color: var(--color-hover-secondary);
          padding: 4px 40px;
          width: 100%;
          margin: 0;
        }

        @media (max-width: 700px) {
          .tabs-list {
            display: none;
          }
          .menu-button {
            cursor: pointer;
            display: block;
            top: 30px;
            right: 25px;
            position: absolute;
          }
          .mobile-menu[data-expand='true'] {
            display: block;
          }
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
