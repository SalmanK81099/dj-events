import { API_URL } from '../../config/index';
import cookie from 'cookie';
import CryptoJS from 'crypto-js';
export default async function handler(req, res) {
  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Not authorized' });
    return;
  }
  const { token } = cookie.parse(req.headers.cookie);
  var bytes = CryptoJS.AES.decrypt(token, 'my-secret-key@123');
  var decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${decryptedToken}`,
    },
  });
  const user = await strapiRes.json();

  if (strapiRes.ok) {
    res.status(200).json({ user });
  } else {
    res.status(403).json({ message: 'User Forbidden' });
  }
}
