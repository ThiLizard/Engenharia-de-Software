import { Link, useNavigate } from './Router.tsx';
import { Home, Activity, MessageSquare, LogOut, User, Menu, X } from './Icons.tsx';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-brand">
                    <span className="brand-icon">🏥</span>
                    <span className="brand-name">EduCare</span>
                </Link>

                <button className="navbar-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <div className="navbar-user" onClick={() => {
                        navigate('/configuracoes');
                        setIsMenuOpen(false);
                    }}>
                        <div className="user-info">
                            <div className="user-avatar">
                                <User size={20} />
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name}</span>
                                <span className="user-type">{user?.userType}</span>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-links">
                        <Link
                            to="/dashboard"
                            className={`nav-link ${window.location.pathname === '/dashboard' ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home size={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to="/sintomas"
                            className={`nav-link ${window.location.pathname === '/sintomas' ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Activity size={20} />
                            <span>Sintomas</span>
                        </Link>
                        <Link
                            to="/chat"
                            className={`nav-link ${window.location.pathname === '/chat' ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <MessageSquare size={20} />
                            <span>Chat</span>
                        </Link>
                    </div>

                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
