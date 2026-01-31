import { Activity, AlertTriangle, MessageSquare, Users } from 'lucide-react';
import '../../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <header className="dash-header">
        <div className="brand">🏥 EduCare</div>
        <div className="user-info">
          <span>Olá, <strong>Responsável João</strong></span>
          <div className="avatar">JS</div>
        </div>
      </header>

      <main className="dash-content">
        <section className="summary-cards">
          <div className="card alert">
            <AlertTriangle size={32} />
            <div>
              <h3>Surtos na Região</h3>
              <p>2 Alertas Ativos</p>
            </div>
          </div>
          <div className="card status">
            <Activity size={32} />
            <div>
              <h3>Status do Aluno</h3>
              <p>Monitoramento em dia</p>
            </div>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel recent-activity">
            <h2>Atividades Recentes</h2>
            <ul>
              <li>✅ Sintomas registrados - Hoje, 07:30</li>
              <li>💊 Medicação administrada - Ontem, 20:00</li>
              <li>📢 Comunicado da Escola: "Vacinação" - 2 dias atrás</li>
            </ul>
          </div>

          <div className="panel quick-actions">
            <h2>Ações Rápidas</h2>
            <button className="btn-action">📝 Registrar Sintomas</button>
            <button className="btn-action">💬 Chat com a Escola</button>
            <button className="btn-action secondary">📅 Histórico Médico</button>
          </div>
        </section>
      </main>
    </div>
  );
}
