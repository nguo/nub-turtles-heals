import Layout from '../components/layout'
import Tidbit from '../components/tidbit'
import fetchTidbits from '../lib/fetchTidbits'

export default function GuidesPage({ guides }) {
  return (
    <Layout pageTitle="Healer Guides">
      <div className="container">
        {guides.map((tb, i) => (
          <Tidbit key={i} data={tb} />
        ))}
        <style jsx>{`
          .container {
            max-width: 1000px;
            margin: auto;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const guides = await fetchTidbits('guides')
  return {
    props: {
      guides
    }
  }
}
