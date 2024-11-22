require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/dbapp')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/users', require('./routes/userRoutes'));

// Inicia o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
