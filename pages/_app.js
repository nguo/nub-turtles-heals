import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="var(--color-hover-primary)" startPosition={0.3} stopDelayMs={200} height={10} showOnShallow={false} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
