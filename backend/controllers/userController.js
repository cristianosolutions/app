const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Criar usuário
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await User.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
