import apiClient from './apiClient';

export interface Message {
    id: number;
    text: string;
    role: 'USER' | 'BOT';
    createdAt: string;
}

export interface Conversation {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    lastMessagePreview: string | null;
}

export const createConversation = async (
    title: string
): Promise<Conversation> => {
    const response = await apiClient.post<Conversation>('/conversations', {
        title,
    });
    return response.data;
};

export const addMessage = async (
    conversationId: number,
    text: string,
    role: 'USER' | 'BOT'
): Promise<Message> => {
    const response = await apiClient.post<Message>(
        `/conversations/${conversationId}/messages`,
        { text, role }
    );
    return response.data;
};

export const getConversationHistory = async (
    conversationId: number
): Promise<Message[]> => {
    const response = await apiClient.get<Message[]>(
        `/conversations/${conversationId}/messages`
    );
    return response.data;
};

export const listConversations = async (): Promise<Conversation[]> => {
    const response = await apiClient.get<Conversation[]>('/conversations');
    return response.data;
};

export const updateConversation = async (
    id: number,
    title: string
): Promise<Conversation> => {
    const response = await apiClient.put<Conversation>(`/conversations/${id}`, {
        title,
    });
    return response.data;
};

export const deleteConversation = async (id: number): Promise<void> => {
    await apiClient.delete(`/conversations/${id}`);
};
