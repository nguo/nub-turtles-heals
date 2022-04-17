import Head from 'next/head'

export default function NTHead({ pageTitle }) {
  return (
    <Head>
      <title>{pageTitle + ' | Nub Heals'}</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
  )
}
