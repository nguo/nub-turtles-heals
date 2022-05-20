import Layout from '../components/layout'
import fetchTidbits from '../lib/fetchTidbits'
import Card from '../components/card'
import Collapsible from '../components/collapsible'
import Tidbit from '../components/tidbit'

export default function GuidesPage({ plans }) {
  return (
    <Layout pageTitle="Raider Plans & Strats">
      <div className="container">
        {plans.map((data, i) => {
          const { name, ...rest } = data
          return (
            <div key={i} className="card-container">
              <Card>
                <Collapsible title={name}>
                  <div key={i} className="card-content">
                    <Tidbit data={rest} hideTitle="true" />
                  </div>
                </Collapsible>
              </Card>
            </div>
          )
        })}
        <style jsx>{`
          .container {
            max-width: 1000px;
            margin: auto;
          }
          .card-container {
            margin: 20px 0;
          }
          .card-content {
            padding: 5px 20px;
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
