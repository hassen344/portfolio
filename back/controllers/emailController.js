// controllers/emailController.js
const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { from_name, from_email, message } = req.body;

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: from_email,
      subject: `Message de ${from_name}`,
      html: `
        <h2>Nouveau message depuis votre portfolio</h2>
        <p><strong>Nom :</strong> ${from_name}</p>
        <p><strong>Email :</strong> ${from_email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Email envoyé !' });

  } catch (err) {
    console.error('Erreur Gmail:', err.message);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi.", detail: err.message });
  }
};

module.exports = { sendEmail };