import Layout from "../../components/Layout";
import styles from "../../styles/Add.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";

const add = () => {
  const router = useRouter();
  const [data, dataUpdate] = useState({
    name: "",
    venue: "",
    performers: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const onSubmittor = async (event) => {
    event.preventDefault();
    const isEmpty = Object.values(data).some((x) => x === null || x === "");
    if (isEmpty) {
      toast.error("Please Fill all Fields");
    } else {
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res) {
        toast.error("Something Went Wrong!");
      } else {
        const evt = await res.json();
        router.push(`${evt.slug}`);
      }
    }
  };

  function onChanger(event) {
    dataUpdate((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
    console.log(data);
  }
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
            value={data.date}
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
    </Layout>
  );
};

export default add;
