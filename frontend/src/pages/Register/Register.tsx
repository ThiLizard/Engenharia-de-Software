import { useState } from 'react';
import { useNavigate, Link } from '../../components/Router.tsx';
import authService from '../../services/authService';
import type { RegisterRequest } from '../../services/authService';
import '../../styles/Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        name: '',
        userType: 'RESPONSAVEL',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
        }

        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await authService.register(formData);
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            navigate('/login');
        } catch (error: any) {
            setErrors({
                general: error.response?.data?.message || 'Erro ao criar conta',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <div className="register-icon">🏥</div>
                    <h1>Criar Conta</h1>
                    <p className="subtitle">Sistema EduCare</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Seu nome completo"
                            className={errors.name ? 'input-error' : ''}
                            disabled={isLoading}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu.email@exemplo.com"
                            className={errors.email ? 'input-error' : ''}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="userType">Tipo de Usuário</label>
                        <select
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            disabled={isLoading}
                        >
                            <option value="RESPONSAVEL">👤 Responsável</option>
                            <option value="ESCOLA">🏫 Escola</option>
                            <option value="MEDICO">👨‍⚕️ Médico</option>
                            <option value="ADMIN">📊 Administrador</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                className={errors.password ? 'input-error' : ''}
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
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) {
                                    setErrors({ ...errors, confirmPassword: '' });
                                }
                            }}
                            placeholder="Digite a senha novamente"
                            className={errors.confirmPassword ? 'input-error' : ''}
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                            <span className="error-text">{errors.confirmPassword}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Criando conta...
                            </>
                        ) : (
                            'Criar Conta'
                        )}
                    </button>
                </form>

                <div className="register-footer">
                    <p>
                        Já tem uma conta?{' '}
                        <Link to="/login" className="login-link">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
