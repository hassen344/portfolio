// config/mailer.js
const axios = require('axios');
require('dotenv').config();

const sendMailtrap = async ({ from, to, subject, html }) => {
  const response = await axios.post(
    'https://send.api.mailtrap.io/api/send',
    {
      from: {
        email: "hello@demomailtrap.co",
        name: from.name || "Smart Oil Press"
      },
      to: [{ email: to }],
      subject: subject,
      html: html,
      category: "Contact"
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.MAILTRAP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

module.exports = { sendMailtrap };