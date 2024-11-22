const api = axios.create({
    baseURL: 'http://localhost:5001/api',
  });
  
  // Login do usuário
  async function loginUser(username, password) {
    try {
      const response = await api.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = 'admin.html';
    } catch (err) {
      alert('Erro ao fazer login: ' + err.response.data.error);
    }
  }
  
  // Chamada no formulário
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginUser(username, password);
  });
  