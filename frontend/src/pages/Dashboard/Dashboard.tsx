import { Activity, AlertTriangle, FileText, MessageSquare, TrendingUp } from '../../components/Icons.tsx';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from '../../components/Router.tsx';
import Navbar from '../../components/Navbar';
import '../../styles/Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-text">
              <h1>Bem-vindo, {user?.name}! 👋</h1>
              <p>Acompanhe a saúde e bem-estar dos alunos em tempo real</p>
            </div>
            <div className="user-badge">
              <span className="badge-label">Tipo de Conta</span>
              <span className="badge-value">{user?.userType}</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card alert-card">
              <div className="card-icon alert-icon">
                <AlertTriangle size={28} />
              </div>
              <div className="card-content">
                <h3>Alertas Ativos</h3>
                <p className="card-value">2</p>
                <span className="card-subtitle">Surtos na região</span>
              </div>
            </div>

            <div className="summary-card success-card">
              <div className="card-icon success-icon">
                <Activity size={28} />
              </div>
              <div className="card-content">
                <h3>Status Geral</h3>
                <p className="card-value">Saudável</p>
                <span className="card-subtitle">Monitoramento em dia</span>
              </div>
            </div>

            <div className="summary-card info-card">
              <div className="card-icon info-icon">
                <TrendingUp size={28} />
              </div>
              <div className="card-content">
                <h3>Registros</h3>
                <p className="card-value">12</p>
                <span className="card-subtitle">Este mês</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="main-grid">
            {/* Recent Activity */}
            <div className="panel recent-activity">
              <div className="panel-header">
                <h2>Atividades Recentes</h2>
                <button className="view-all-btn">Ver todas</button>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">✅</div>
                  <div className="activity-details">
                    <p className="activity-title">Sintomas registrados</p>
                    <span className="activity-time">Hoje, 07:30</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info">💊</div>
                  <div className="activity-details">
                    <p className="activity-title">Medicação administrada</p>
                    <span className="activity-time">Ontem, 20:00</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon warning">📢</div>
                  <div className="activity-details">
                    <p className="activity-title">Comunicado: "Vacinação"</p>
                    <span className="activity-time">2 dias atrás</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon success">✅</div>
                  <div className="activity-details">
                    <p className="activity-title">Consulta médica realizada</p>
                    <span className="activity-time">3 dias atrás</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="panel quick-actions">
              <div className="panel-header">
                <h2>Ações Rápidas</h2>
              </div>
              <div className="actions-list">
                <button
                  className="action-btn primary"
                  onClick={() => navigate('/sintomas')}
                >
                  <FileText size={20} />
                  <span>Registrar Sintomas</span>
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => navigate('/chat')}
                >
                  <MessageSquare size={20} />
                  <span>Chat com a Escola</span>
                </button>
                <button className="action-btn tertiary">
                  <Activity size={20} />
                  <span>Histórico Médico</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
