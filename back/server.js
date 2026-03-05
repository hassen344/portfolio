// server.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const emailRoute = require('./routes/emailRoute');
const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'https://karouihassen.netlify.app'  // ← ajoutez votre vrai URL Netlify
  ]
})); // port Vite
app.use(express.json());
app.use('/api', emailRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT || 5000}`);
});