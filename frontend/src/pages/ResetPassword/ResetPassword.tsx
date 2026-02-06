import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from '../../components/Router.tsx';
import authService from '../../services/authService';
import '../../styles/ResetPassword.css';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setError('Token inválido');
                setIsValidating(false);
                return;
            }

            try {
                const valid = await authService.validateResetToken(token);
                setIsValidToken(valid);
                if (!valid) {
                    setError('Token inválido ou expirado');
                }
            } catch (error) {
                setError('Erro ao validar token');
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newPassword) {
            setError('Por favor, insira uma nova senha');
            return;
        }

        if (newPassword.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPassword(token, newPassword);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Erro ao redefinir senha');
        } finally {
            setIsLoading(false);
        }
    };

    if (isValidating) {
        return (
            <div className="reset-password-container">
                <div className="reset-password-box">
                    <div className="loading-message">
                        <span className="spinner-large"></span>
                        <p>Validando token...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className="reset-password-container">
                <div className="reset-password-box">
                    <div className="error-box">
                        <div className="error-icon">❌</div>
                        <h2>Token Inválido</h2>
                        <p>{error || 'O link de redefinição de senha é inválido ou expirou.'}</p>
                        <Link to="/forgot-password" className="retry-link">
                            Solicitar novo link
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="reset-password-container">
                <div className="reset-password-box">
                    <div className="success-box">
                        <div className="success-icon">✅</div>
                        <h2>Senha Redefinida!</h2>
                        <p>Sua senha foi alterada com sucesso.</p>
                        <p className="redirect-message">Redirecionando para o login...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <div className="reset-password-header">
                    <div className="reset-password-icon">🔐</div>
                    <h1>Redefinir Senha</h1>
                    <p className="subtitle">Digite sua nova senha</p>
                </div>

                <form onSubmit={handleSubmit} className="reset-password-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="newPassword">Nova Senha</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Digite a senha novamente"
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
                                Redefinindo...
                            </>
                        ) : (
                            'Redefinir Senha'
                        )}
                    </button>
                </form>

                <div className="reset-password-footer">
                    <Link to="/login" className="back-link">
                        ← Voltar para o login
                    </Link>
                </div>
            </div>
        </div>
    );
}
