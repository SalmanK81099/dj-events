import Layout from "../../components/Layout";
import Events from "../../components/Events";
import { API_URL } from "../../config/index";
import qs from "qs";

const search = ({ events }) => {
  return (
    <Layout>
      <h1>All Events</h1>
      {events.length === 0 ? (
        <h1>No Results Found</h1>
      ) : (
        events.map((data) => {
          return <Events data={data} />;
        })
      )}
    </Layout>
  );
};

export default search;

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { venue_contains: term },
        { address_contains: term },
      ],
    },
  });
  const evts = await fetch(`${API_URL}/events?${query}`);
  const events = await evts.json();
  return {
    props: { events },
  };
}
