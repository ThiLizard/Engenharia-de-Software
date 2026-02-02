import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Por favor, insira seu email');
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.forgotPassword(email);
            setMessage('Instruções de recuperação foram enviadas para seu email.');

            // Em desenvolvimento, mostramos o token (REMOVER EM PRODUÇÃO)
            if (response.token) {
                setResetToken(response.token);
            }
        } catch (error: any) {
            setMessage('Se o email existir, você receberá instruções de recuperação.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <div className="forgot-password-header">
                    <div className="forgot-password-icon">🔑</div>
                    <h1>Esqueceu a Senha?</h1>
                    <p className="subtitle">
                        Digite seu email para receber instruções de recuperação
                    </p>
                </div>

                {!message ? (
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu.email@exemplo.com"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Enviando...
                                </>
                            ) : (
                                'Enviar Instruções'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        <div className="success-icon">✅</div>
                        <p>{message}</p>

                        {resetToken && (
                            <div className="dev-token-box">
                                <p className="dev-warning">⚠️ Modo de Desenvolvimento</p>
                                <p className="dev-label">Token de Reset:</p>
                                <code className="dev-token">{resetToken}</code>
                                <Link to={`/reset-password?token=${resetToken}`} className="dev-link">
                                    Ir para redefinição de senha
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                <div className="forgot-password-footer">
                    <Link to="/login" className="back-link">
                        ← Voltar para o login
                    </Link>
                </div>
            </div>
        </div>
    );
}
