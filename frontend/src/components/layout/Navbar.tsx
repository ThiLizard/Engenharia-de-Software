import { Link, useNavigate } from 'react-router-dom';

// Dentro do seu componente:
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('authToken');
  navigate('/login');
};

// No JSX:
<nav>
  <Link to="/dashboard">Painel</Link>
  <Link to="/sintomas">Reportar</Link>
  <Link to="/chat">Mensagens</Link>
  <button onClick={handleLogout}>Sair</button>
</nav>