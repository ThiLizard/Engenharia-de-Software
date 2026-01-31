import { Thermometer, Save, XCircle } from 'lucide-react';
import '../styles/Forms.css';

export default function RegistroSintomas() {
  return (
    <div className="page-container">
      <div className="form-card">
        <header>
          <Thermometer className="icon-header" />
          <h1>Registro de Saúde</h1>
          <p>Informe o estado de saúde do aluno hoje.</p>
        </header>

        <form className="symptom-form">
          <div className="input-group">
            <label>Temperatura Corporal (°C)</label>
            <input type="number" step="0.1" placeholder="Ex: 36.5" />
          </div>

          <div className="checklist">
            <h3>Sintomas Observados:</h3>
            <label className="checkbox-item">
              <input type="checkbox" /> Coriza ou Nariz Entupido
            </label>
            <label className="checkbox-item">
              <input type="checkbox" /> Tosse Persistente
            </label>
            <label className="checkbox-item">
              <input type="checkbox" /> Dor de Garganta
            </label>
            <label className="checkbox-item">
              <input type="checkbox" /> Cansaço Excessivo
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              <Save size={18} /> Salvar Registro
            </button>
            <button type="button" className="btn-cancel">
              <XCircle size={18} /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
