import { useState } from 'react';
import { useNavigate, Link } from '../../components/Router.tsx';
import authService, { type RegisterRequest } from '../../services/authService';
import '../../styles/Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        name: '',
        userType: 'RESPONSAVEL',
        contato: '',
        schoolCode: '',
        cadastro: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.name) newErrors.name = 'Nome é obrigatório';
            if (!formData.email) newErrors.email = 'Email é obrigatório';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';

            if (!formData.password) newErrors.password = 'Senha é obrigatória';
            else if (formData.password.length < 6) newErrors.password = 'Senha deve ter no mínimo 6 caracteres';

            if (formData.password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
        }

        if (step === 2) {
            if (!formData.contato) {
                newErrors.contato = 'Contato é obrigatório';
            } else if (!/\d/.test(formData.contato)) {
                newErrors.contato = 'Contato deve conter números';
            }

            if (['PROFESSOR', 'GESTOR', 'ESCOLA'].includes(formData.userType)) {
                if (!formData.schoolCode) newErrors.schoolCode = 'Código da escola é obrigatório';
                if (!formData.cadastro) newErrors.cadastro = 'Nº de Cadastro é obrigatório';
            }

            // Responsavel: School Code is optional now, but warnings will be shown in UI
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsLoading(true);
        try {
            // Trim whitespace from specific fields
            const dataToSend = {
                ...formData,
                schoolCode: formData.schoolCode?.trim(),
                cadastro: formData.cadastro?.trim()
            };
            await authService.register(dataToSend);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: RegisterRequest) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <header className="register-header">
                    <div className="register-icon">🏥</div>
                    <h1>Criar Conta</h1>
                    <p className="subtitle">Passo {step + 1} de 3</p>
                </header>

                <form className="register-form" onSubmit={handleSubmit}>
                    {/* Step 0: Role Selection */}
                    {step === 0 && (
                        <div className="step-container fade-in">
                            <h3>Quem é você?</h3>
                            <div className="role-options">
                                <div
                                    className={`role-card ${formData.userType === 'RESPONSAVEL' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, userType: 'RESPONSAVEL' })}
                                >
                                    <span className="role-icon">👤</span>
                                    <span>Responsável</span>
                                </div>
                                <div
                                    className={`role-card ${formData.userType === 'PROFESSOR' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, userType: 'PROFESSOR' })}
                                >
                                    <span className="role-icon">🎓</span>
                                    <span>Professor</span>
                                </div>
                                <div
                                    className={`role-card ${formData.userType === 'GESTOR' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, userType: 'GESTOR' })}
                                >
                                    <span className="role-icon">🏫</span>
                                    <span>Gestor Escolar</span>
                                </div>
                                <div
                                    className={`role-card ${formData.userType === 'MEDICO' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, userType: 'MEDICO' })}
                                >
                                    <span className="role-icon">👨‍⚕️</span>
                                    <span>Médico</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="step-container fade-in">
                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'input-error' : ''} />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <div className="input-wrapper">
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'input-error' : ''} />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '👁️' : '👁️‍🗨️'}</button>
                                </div>
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>
                            <div className="form-group">
                                <label>Confirmar Senha</label>
                                <input type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={errors.confirmPassword ? 'input-error' : ''} />
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Specific Info */}
                    {step === 2 && (
                        <div className="step-container fade-in">
                            <div className="form-group">
                                <label>Telefone de Contato</label>
                                <input type="tel" name="contato" value={formData.contato} onChange={handleChange} placeholder="(00) 00000-0000" className={errors.contato ? 'input-error' : ''} />
                                {errors.contato && <span className="error-text">{errors.contato}</span>}
                            </div>

                            {['PROFESSOR', 'GESTOR', 'ESCOLA', 'RESPONSAVEL'].includes(formData.userType) && (
                                <div className="form-group">
                                    <label>Código da Escola</label>
                                    <input
                                        name="schoolCode"
                                        value={formData.schoolCode}
                                        onChange={handleChange}
                                        placeholder={formData.userType === 'RESPONSAVEL' ? "Código para vincular ao aluno" : "Código único da escola"}
                                        className={errors.schoolCode ? 'input-error' : ''}
                                    />
                                    {errors.schoolCode && <span className="error-text">{errors.schoolCode}</span>}
                                    {formData.userType === 'RESPONSAVEL' && <small>Obrigatório para vinculação do aluno.</small>}
                                </div>
                            )}

                            {['PROFESSOR', 'GESTOR', 'ESCOLA'].includes(formData.userType) && (
                                <div className="form-group">
                                    <label>Nº de Cadastro (Matrícula)</label>
                                    <input name="cadastro" value={formData.cadastro} onChange={handleChange} placeholder="Seu ID de funcionário" className={errors.cadastro ? 'input-error' : ''} />
                                    {errors.cadastro && <span className="error-text">{errors.cadastro}</span>}
                                </div>
                            )}

                            {errors.general && <div className="error-message general-error">{errors.general}</div>}
                        </div>
                    )}

                    <div className="wizard-controls">
                        {step > 0 && (
                            <button type="button" className="btn-secondary" onClick={handleBack}>Voltar</button>
                        )}
                        {step < 2 ? (
                            <button type="button" className="btn-primary" onClick={handleNext}>Próximo</button>
                        ) : (
                            <button type="submit" className="btn-primary" disabled={isLoading}>
                                {isLoading ? 'Finalizando...' : 'Concluir Cadastro'}
                            </button>
                        )}
                    </div>
                </form>
                <div className="register-footer">
                    <p>Já tem uma conta? <Link to="/login" className="login-link">Fazer login</Link></p>
                </div>
            </div>
        </div>
    );
}
