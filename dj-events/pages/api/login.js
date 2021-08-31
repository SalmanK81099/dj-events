import { API_URL } from '../../config/index';
import cookie from 'cookie';
import CryptoJS from 'crypto-js';
export default async function handler(req, res) {
  const { identifier, password } = req.body;
  const strapiRes = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  const data = await strapiRes.json();
  if (strapiRes.ok) {
    var encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(data.jwt),
      'my-secret-key@123'
    ).toString();
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', encryptedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).json({ user: data.user });
  } else {
    res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });
  }
}
