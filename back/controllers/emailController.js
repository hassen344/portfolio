// controllers/emailController.js
const axios = require('axios');

const sendEmail = async (req, res) => {
  const { from_name, from_email, message } = req.body;

  console.log('=== Requête reçue ===');
  console.log('Body:', JSON.stringify(req.body));
  console.log('MAILTRAP_TOKEN:', process.env.MAILTRAP_TOKEN ? 'OK' : 'MANQUANT');
  console.log('EMAIL_TO:', process.env.EMAIL_TO || 'MANQUANT');

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }

  try {
    const payload = {
      from: { email: "hello@demomailtrap.co", name: from_name },
      to: [{ email: process.env.EMAIL_TO || 'karouidesign867@gmail.com' }],
      subject: `Message de ${from_name}`,
      html: `
        <h2>Nouveau message depuis votre portfolio</h2>
        <p><strong>Nom :</strong> ${from_name}</p>
        <p><strong>Email :</strong> ${from_email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
      category: "Contact"
    };

    console.log('=== Payload envoyé à Mailtrap ===');
    console.log(JSON.stringify(payload));

    const response = await axios.post(
      'https://send.api.mailtrap.io/api/send',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MAILTRAP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('=== Réponse Mailtrap ===', response.data);
    res.status(200).json({ success: true, message: 'Email envoyé !' });

  } catch (err) {
    console.error('=== ERREUR MAILTRAP ===');
    console.error('Status:', err.response?.status);
    console.error('Data:', JSON.stringify(err.response?.data));
    console.error('Message:', err.message);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi.",
      detail: err.response?.data || err.message
    });
  }
};

module.exports = { sendEmail };