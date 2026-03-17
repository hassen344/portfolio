// server.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const emailRoute = require('./routes/emailRoute');
const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'https://karoui-hassen2.onrender.com',
    
    'https://portfolio-2-mo22.onrender.com'
  ]
}));
app.use(express.json());
app.use('/api', emailRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT || 3000}`);
});