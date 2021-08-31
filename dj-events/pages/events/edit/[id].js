import Layout from '../../../components/Layout';
import styles from '../../../styles/Add.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../../config';
import moment from 'moment';
import Image from 'next/dist/client/image';
import Modal from '../../../components/Modal';
import { FaImage } from 'react-icons/fa';
import ImageUpload from '../../../components/ImageUpload';

const edit = ({ eventStart }) => {
  const router = useRouter();
  const [data, dataUpdate] = useState({
    name: eventStart.name,
    venue: eventStart.venue,
    performers: eventStart.performers,
    address: eventStart.address,
    date: eventStart.date,
    time: eventStart.time,
    description: eventStart.description,
  });
  const [image, setImage] = useState(
    eventStart.image ? eventStart.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const onSubmittor = async (event) => {
    event.preventDefault();
    const isEmpty = Object.values(data).some((x) => x === null || x === '');
    if (isEmpty) {
      toast.error('Please Fill all Fields');
    } else {
      const res = await fetch(`${API_URL}/events/${eventStart.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res) {
        toast.error('Something Went Wrong!');
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.slug}`);
      }
    }
  };

  function onChanger(event) {
    dataUpdate((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  const imageUploaded = async (event) => {
    const res = await fetch(`${API_URL}/events/${eventStart.id}`);
    const data = await res.json();
    setImage(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout>
      <h1>Add Event</h1>

      <ToastContainer />
      <form className={styles.mainForm} onSubmit={onSubmittor}>
        <div className={styles.innerDiv}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            onChange={onChanger}
            value={data.name}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='Venue'>Venue</label>
          <input
            type='text'
            name='venue'
            onChange={onChanger}
            value={data.venue}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='performers'>Performers</label>
          <input
            type='text'
            name='performers'
            onChange={onChanger}
            value={data.performers}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            onChange={onChanger}
            value={data.address}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            name='date'
            onChange={onChanger}
            value={moment(data.date).format('yyyy-MM-DD')}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='time'>Time</label>
          <input
            type='text'
            name='time'
            onChange={onChanger}
            value={data.time}
          />
        </div>
        <div className={styles.innerDiv}>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            cols='30'
            rows='10'
            onChange={onChanger}
            value={data.description}
          ></textarea>
        </div>
        <div className={styles.btnOuter}>
          <input type='submit' name='submit' className={styles.addEventBtn} />
        </div>
      </form>
      <h2>Image</h2>
      {image ? (
        <Image src={image} width={300} height={160} />
      ) : (
        <h3>No image found</h3>
      )}
      <div>
        <button
          onClick={() => setShowModal(true)}
          className={styles.imageButton}
        >
          <FaImage /> Set Image
        </button>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          <ImageUpload evtId={eventStart.id} imageUploaded={imageUploaded} />
        </Modal>
      </div>
    </Layout>
  );
};

export default edit;

export async function getServerSideProps({ params: { id }, req }) {
  const evts = await fetch(`${API_URL}/events/${id}`);
  const eventStart = await evts.json();
  console.log(req.headers.cookie);
  return {
    props: { eventStart },
  };
}
