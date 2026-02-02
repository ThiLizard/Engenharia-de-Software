import { BrowserRouter as Router, Routes, Route } from './components/Router.tsx';

// Importação das Páginas
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import RegistroSintomas from './pages/RegistroSintomas';
import Chat from './pages/Chat/Chat.tsx';
import LandingPage from './pages/LandingPage.tsx';

// Importação de Componentes
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Importação de Contextos
import { AuthProvider } from './contexts/AuthContext.tsx';

// Importação de Estilos Globais
import './styles/Global.css' // Importação crucial
import './styles/Variables.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota Inicial - Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Rotas Públicas de Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rotas Protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sintomas"
            element={
              <ProtectedRoute>
                <RegistroSintomas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Rota 404 - Opcional */}
          <Route path="*" element={<div style={{ padding: '20px' }}>Página não encontrada (404)</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;