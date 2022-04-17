import Layout from '../components/layout'
import Tidbit from '../components/tidbit'
import fetchTidbits from '../lib/fetchTidbits'

export default function TidbitsPage({ tidbits }) {
  return (
    <Layout pageTitle="Healer Tidbits">
      {tidbits.map((tb, i) => (
        <Tidbit key={i} data={tb} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const tidbits = await fetchTidbits()
  return {
    props: {
      tidbits
    }
  }
}
