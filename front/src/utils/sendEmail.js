export const sendEmail = async ({ from_name, from_email, message }) => {
  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from_name, from_email, message }),
  });
  return res.json();
};