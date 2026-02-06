import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Configuracoes.css';

export default function Configuracoes() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        userType: user?.userType || '',
        contato: '',
        endereco: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would call the update API
        alert('Funcionalidade de atualização ainda não implementada no back-end.');
        console.log('Dados atualizados:', formData);
    };

    return (
        <div className="config-page">
            <Navbar />
            <div className="config-container">
                <div className="config-card">
                    <div className="config-header">
                        <h1>Minhas Informações</h1>
                        <p>Gerencie seus dados pessoais e de acesso</p>
                    </div>

                    <form onSubmit={handleSubmit} className="config-form">
                        <div className="form-group">
                            <label htmlFor="name">Nome Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled // Disabled until backend is ready or if immutable
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="userType">Tipo de Usuário</label>
                            <input
                                type="text"
                                id="userType"
                                value={formData.userType}
                                disabled
                                className="capitalize"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contato">Contato</label>
                            <input
                                type="tel"
                                id="contato"
                                name="contato"
                                value={formData.contato}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn">Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
