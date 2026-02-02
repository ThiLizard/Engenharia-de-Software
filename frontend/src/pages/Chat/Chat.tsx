import { Send, Paperclip } from 'lucide-react';
import Navbar from '../../components/Navbar';
import '../../styles/Chat.css';

export default function Chat() {
  return (
    <>
      <Navbar />
      <div className="chat-container">
        <aside className="chat-list">
          <div className="chat-item active">
            <div className="avatar-school">🏫</div>
            <div>
              <h4>Coordenação - Unidade I</h4>
              <p>Sua mensagem foi lida</p>
            </div>
          </div>
        </aside>

        <section className="chat-window">
          <header className="chat-header">
            <h3>Coordenação - Unidade I</h3>
            <span className="status-online">Online</span>
          </header>

          <div className="messages-area">
            <div className="msg received">
              <p>Olá! Notamos que o aluno apresentou febre hoje de manhã. Ele já foi medicado?</p>
              <span>09:15</span>
            </div>
            <div className="msg sent">
              <p>Sim, administramos o antitérmico conforme a prescrição às 08:30.</p>
              <span>09:20</span>
            </div>
          </div>

          <div className="chat-input-area">
            <button className="btn-attachment"><Paperclip size={20} /></button>
            <input type="text" placeholder="Digite sua mensagem..." />
            <button className="btn-send"><Send size={20} /></button>
          </div>
        </section>
      </div>
    </>
  );
}
