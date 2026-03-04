

const transporter = require('../config/mailer');

const sendEmail = async (req, res) => {
  const { from_name, from_email, message } = req.body;

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }

  try {
    await transporter.sendMail({
      from:    from_email,
      to:      process.env.EMAIL_USER,
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
    console.error('Erreur Nodemailer :', err);
    res.status(500).json({ success: false, message: 'Erreur lors de envoi.' });
  }
};

module.exports = { sendEmail };