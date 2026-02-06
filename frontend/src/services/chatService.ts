import api from './api';

export interface Message {
    id: number;
    remetente: {
        id: number;
        nome: string;
    };
    destinatario: {
        id: number;
        nome: string;
    };
    texto: string;
    dataHora: string;
}

export interface MessageRequest {
    senderId: number;
    receiverId: number;
    text: string;
}

const chatService = {
    sendMessage: async (request: MessageRequest): Promise<Message> => {
        const response = await api.post<Message>('/chat/send', request);
        return response.data;
    },

    getConversation: async (user1Id: number, user2Id: number): Promise<Message[]> => {
        const response = await api.get<Message[]>(`/chat/conversation/${user1Id}/${user2Id}`);
        return response.data;
    }
};

export default chatService;
