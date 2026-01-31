import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertCircle, Activity, HeartPulse } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <nav className="landing-header">
                <div className="logo-container">
                    <HeartPulse className="logo-icon" />
                    <h1 className="landing-title">EduCare P2532</h1>
                </div>
                <Link to="/login" className="btn-login-nav">
                    Acessar Sistema
                </Link>
            </nav>

            <section className="hero-section">
                <span className="hero-badge">Saúde Escolar Inteligente</span>
                <h2 className="hero-headline">
                    Monitoramento e Prevenção <br />
                    <span>para um ambiente seguro</span>
                </h2>
                <p className="hero-description">
                    Um sistema integrado que conecta escolas, responsáveis e profissionais de saúde
                    para detectar, monitorar e prevenir surtos de doenças respiratórias no ambiente escolar.
                </p>
                <Link to="/login" className="btn-cta">
                    Começar Agora <ArrowRight className="arrow-icon" size={20} />
                </Link>
            </section>

            <section className="info-section">
                <div className="info-container">
                    <div className="section-head">
                        <h2>Por que o EduCare?</h2>
                        <p style={{ color: '#9ca3af' }}>Uma solução completa para o problema de saúde nas escolas</p>
                    </div>

                    <div className="grid-features">
                        <div className="feature-card">
                            <div className="feature-icon alert">
                                <AlertCircle />
                            </div>
                            <h3>O Problema</h3>
                            <p>
                                A propagação rápida de patógenos em ambientes escolares coloca em risco
                                alunos e professores, muitas vezes devido à falta de detecção precoce.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon check">
                                <Activity />
                            </div>
                            <h3>A Solução</h3>
                            <p>
                                Monitoramento contínuo de sintomas, registro de temperatura e
                                comunicação direta para tomadas de decisão rápidas e eficazes.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon shield">
                                <ShieldCheck />
                            </div>
                            <h3>Segurança (NFSG)</h3>
                            <p>
                                Proteção total dos dados sensíveis dos alunos, com conformidade
                                às normas de saúde e acesso restrito a usuários autorizados.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2024 Projeto P2532 - Sistema de Monitoramento de Saúde Escolar. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
