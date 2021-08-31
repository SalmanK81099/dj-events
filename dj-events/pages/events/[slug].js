import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import styles from "../../styles/EventPage.module.css";
import { API_URL } from "../../config/index";

const event = ({ evt }) => {
  const router = useRouter();

  const deletor = async (event) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });

      if (!res) {
        toast.error("Something Went Wrong!");
      } else {
        const evt = await res.json();
        router.push(`/events`);
      }
    }
  };
  return (
    <Layout>
      <div className={styles.eventMain}>
        <div className={styles.eventPageButtons}>
          <div className={styles.eventPageButtonsInner}>
            <Link href={`edit/${evt.id}`}>
              <a href=''>
                <FaPencilAlt /> Edit
              </a>
            </Link>

            <a onClick={deletor}>
              <FaTimes /> Delete
            </a>
          </div>
        </div>
        <h1 className={styles.title}>{evt.name}</h1>
        {evt.image == null ? (
          <h2>No Image Found</h2>
        ) : (
          <Image src={evt.image.formats.medium.url} width={960} height={600} />
        )}

        <div className={styles.info}>
          <h2>Performers</h2>
          <p>{evt.performers}</p>
        </div>
        <div className={styles.info}>
          <h2>Description</h2>
          <p>{evt.description}</p>
        </div>
        <div className={styles.info}>
          <h2>Venue: {evt.venue}</h2>
          <h3>{evt.address}</h3>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((ev) => ({ params: { slug: ev.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?_slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

export default event;
