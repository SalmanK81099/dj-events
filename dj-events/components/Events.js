import styles from '../styles/Events.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Events = ({ data }) => {
  const router = useRouter();
  return (
    <div className={styles.eventsTemplate} id={data.id}>
      {data.image == null ? (
        <h2>No Image Found</h2>
      ) : (
        <Image src={data.image.formats.thumbnail.url} width={100} height={70} />
      )}
      <div>
        <p>
          {new Date(data.date).toLocaleDateString('en-US')} {data.time}
        </p>
        <h3>{data.name}</h3>
      </div>

      <div>
        <button
          onClick={() => {
            router.push(`http://localhost:3000/events/${data.slug}`);
          }}
          className={styles.detailbtn}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Events;
