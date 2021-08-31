import styles from '../styles/ImageUpload.module.css';
import { useState } from 'react';
import { API_URL } from '../config';
export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const onChanger = (evt) => {
    setImage(evt.target.files[0]);
  };
  const onSubmittor = async (evt) => {
    evt.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.mainDiv}>
      <h1>Upload Image </h1>
      {uploading ? (
        <h2>Uploading...</h2>
      ) : (
        <form className={styles.mainForm} onSubmit={onSubmittor}>
          <input
            type='file'
            name='image'
            className={styles.fileType}
            onChange={onChanger}
          />
          <input type='submit' className={styles.uploadBtn} value='Upload' />
        </form>
      )}
    </div>
  );
}
