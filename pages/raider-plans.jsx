import Layout from '../components/layout'
import Tidbit from '../components/tidbit'
import fetchTidbits from '../lib/fetchTidbits'

export default function GuidesPage({ plans }) {
  return (
      <Layout pageTitle="Raider Plans & Strats">
        <div className="container">
          {plans.map((tb, i) => (
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
  const plans = await fetchTidbits('raiderplans')
  return {
    props: {
      plans
    }
  }
}
