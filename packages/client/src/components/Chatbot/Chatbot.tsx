import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
    addMessage,
    createConversation,
    deleteConversation,
    getConversationHistory,
    listConversations,
    type Conversation,
    updateConversation,
} from '../../services/conversationService';
import ChatInput, { type ChatFormData } from './ChatInput';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import TypingIndector from './TypingIndector';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

type ChatResponse = {
    answer: string;
};

const Chatbot = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] =
        useState<Conversation | null>(() => {
            const saved = localStorage.getItem('activeConversation');
            return saved ? JSON.parse(saved) : null;
        });
    const [error, setError] = useState('');
    const [isBotActive, setIsBotActive] = useState(true);
    const conversationId = useRef(crypto.randomUUID());

    const handleRenameConversation = async (id: number, title: string) => {
        try {
            const updatedConvo = await updateConversation(id, title);
            setConversations(prev =>
                prev.map(c => (c.id === id ? updatedConvo : c))
            );
            if (activeConversation?.id === id) {
                setActiveConversation(updatedConvo);
            }
        } catch (error) {
            console.error('Failed to rename conversation:', error);
            setError('Failed to rename conversation.');
        }
    };

    const handleDeleteConversation = async (id: number) => {
        try {
            await deleteConversation(id);
            setConversations(prev => prev.filter(c => c.id !== id));
            if (activeConversation?.id === id) {
                handleNewConversation();
            }
        } catch (error) {
            console.error('Failed to delete conversation:', error);
            setError('Failed to delete conversation.');
        }
    };

    useEffect(() => {
        const initializeOrResetChat = async () => {
            if (user) {
                // User is logged in, fetch their conversations
                try {
                    const convos = await listConversations();
                    setConversations(convos);
                    // Check for a saved active conversation, otherwise, no conversation is active
                    const savedConvo =
                        localStorage.getItem('activeConversation');
                    if (savedConvo) {
                        handleSelectConversation(JSON.parse(savedConvo));
                    } else {
                        // If no active conversation is saved, clear messages
                        setMessages([]);
                        setActiveConversation(null);
                    }
                } catch (error) {
                    console.error('Failed to fetch conversations:', error);
                    setError('Failed to load conversations.');
                }
            } else {
                // User is logged out, clear all conversation state
                setMessages([]);
                setConversations([]);
                setActiveConversation(null);
                localStorage.removeItem('activeConversation');
            }
        };

        initializeOrResetChat();
    }, [user]);

    useEffect(() => {
        if (activeConversation) {
            localStorage.setItem(
                'activeConversation',
                JSON.stringify(activeConversation)
            );
        } else {
            localStorage.removeItem('activeConversation');
        }
    }, [activeConversation]);

    const handleSelectConversation = async (conversation: Conversation) => {
        try {
            const history = await getConversationHistory(conversation.id);
            const formattedHistory = history.map(msg => ({
                content: msg.text,
                role: msg.role.toLowerCase() as 'user' | 'bot',
            }));
            setMessages(formattedHistory);
            setActiveConversation(conversation);
        } catch (error) {
            console.error('Failed to fetch conversation history:', error);
            setError('Failed to load conversation history.');
        }
    };

    const handleNewConversation = () => {
        setMessages([]);
        setActiveConversation(null);
        conversationId.current = crypto.randomUUID();
    };

    const onSubmit = async ({ question }: ChatFormData) => {
        setMessages(prev => [...prev, { content: question, role: 'user' }]);
        setIsBotActive(false);
        setError('');

        try {
            let currentConvo = activeConversation;

            if (!currentConvo) {
                const newConvo = await createConversation(
                    question.substring(0, 50)
                );
                setConversations(prev => [newConvo, ...prev]);
                setActiveConversation(newConvo);
                currentConvo = newConvo;
            }

            await addMessage(currentConvo.id, question, 'USER');

            const { data } = await axios.post<ChatResponse>('/api/chat', {
                question,
                conversationId: conversationId.current,
            });

            await addMessage(currentConvo.id, data.answer, 'BOT');

            setMessages(prev => [
                ...prev,
                { content: data.answer, role: 'bot' },
            ]);
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsBotActive(true);
        }
    };

    return (
        <section className="h-screen flex bg-gray-900">
            <SidebarProvider className="border-0">
                <AppSidebar
                    conversations={conversations}
                    activeConversation={activeConversation}
                    handleNewConversation={handleNewConversation}
                    handleSelectConversation={handleSelectConversation}
                    handleRenameConversation={handleRenameConversation}
                    handleDeleteConversation={handleDeleteConversation}
                />

                {/* Main Chat Area */}
                <SidebarTrigger className="hover:bg-gray-950 text-gray-500 hover:text-gray-300" />
                <div className="relative isolate flex flex-col h-full flex-1 overflow-hidden ">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                        />
                    </div>
                    <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto p-4">
                        <ChatMessages messages={messages} />
                        {!isBotActive && <TypingIndector />}
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <ChatInput onSubmit={onSubmit} isBotActive={isBotActive} />
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                        />
                    </div>
                </div>
            </SidebarProvider>
        </section>
    );
};

export default Chatbot;
