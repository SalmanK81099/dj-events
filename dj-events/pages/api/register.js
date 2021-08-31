export default function handler(req, res) {
  const { user } = req.body;
  console.log(user);
  res.json({ message: 'Registered' });
}
