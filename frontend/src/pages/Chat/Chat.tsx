import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip } from '../../components/Icons.tsx';
import Navbar from '../../components/Navbar';
import '../../styles/Chat.css';
import { useAuth } from '../../contexts/AuthContext';
import chatService, { type Message } from '../../services/chatService';

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeChatUser] = useState(2); // TODO: Select dynamically
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && activeChatUser) {
      loadMessages();
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [user, activeChatUser]);

  const loadMessages = async () => {
    if (!user) return;
    try {
      const data = await chatService.getConversation(user.id, activeChatUser);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!user || !inputText.trim()) return;

    try {
      const newMessage = await chatService.sendMessage({
        senderId: user.id,
        receiverId: activeChatUser,
        text: inputText
      });
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-layout">
      <Navbar />
      <div className="chat-container">
        <aside className="chat-sidebar">
          <div className="chat-list-header">
            <h3>Conversas</h3>
          </div>
          <div className="chat-list">
            <div className="chat-item active">
              <div className="avatar-circle">U2</div>
              <div className="chat-info">
                <h4>Usuário {activeChatUser}</h4>
                <p>Online</p>
              </div>
            </div>
            {/* Placeholder for other users */}
          </div>
        </aside>

        <section className="chat-main">
          <header className="chat-header">
            <div className="header-info">
              <h3>Chat com Usuário {activeChatUser}</h3>
              <span className="status-indicator online">Online</span>
            </div>
          </header>

          <div className="messages-area">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>Nenhuma mensagem ainda.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${msg.remetente.id === user?.id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{msg.texto}</p>
                    <span className="message-time">{formatTime(msg.dataHora)}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <button className="btn-icon"><Paperclip size={20} /></button>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn-primary btn-send" onClick={handleSendMessage}>
              <Send size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
