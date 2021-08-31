import Layout from '../../components/Layout';
import Events from '../../components/Events';
import { API_URL } from '../../config/index';

const index = ({ events }) => {
  return (
    <Layout>
      <h1>All Events</h1>
      {events.map((data) => {
        return <Events data={data} key={data.id} />;
      })}
    </Layout>
  );
};

export default index;

export async function getServerSideProps() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3MjkzMDM1LCJleHAiOjE2Mjk4ODUwMzV9.kuSrWIrXhyrCg-zpxd2qrf307l6OQ_BJKOf6k5j-VHA';

  const evts = await fetch(`${API_URL}/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await evts.json();
  return {
    props: { events },
  };
}
