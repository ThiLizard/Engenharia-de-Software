import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importação das Páginas
import Login from './pages/Login/Login.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import RegistroSintomas from './pages/RegistroSintomas';
import Chat from './pages/Chat/Chat.tsx';
import LandingPage from './pages/LandingPage.tsx';


import './styles/Global.css' // Importação crucial
// Importação de Estilos Globais
import './styles/Variables.css';
import './App.css';

function App() {
  // Simulação de autenticação (depois será integrada com o Spring Security)
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas (Redirecionam para login se não houver token) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/sintomas"
          element={isAuthenticated ? <RegistroSintomas /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
        />

        {/* Rota Inicial - Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Rota 404 - Opcional */}
        <Route path="*" element={<div style={{ padding: '20px' }}>Página não encontrada (404)</div>} />
      </Routes>
    </Router>
  );
}

export default App;