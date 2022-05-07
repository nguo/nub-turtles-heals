import Layout from '../components/layout'
import Tidbit from '../components/tidbit'
import fetchTidbits from '../lib/fetchTidbits'

export default function ResourcesPage({ resources }) {
  return (
    <Layout pageTitle="Healer Resources">
      <div className="container">
        {resources.map((tb, i) => (
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
  const resources = await fetchTidbits('resources')
  return {
    props: {
      resources
    }
  }
}
