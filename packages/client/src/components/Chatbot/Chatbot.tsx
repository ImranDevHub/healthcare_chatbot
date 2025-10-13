import axios from 'axios';
import { useRef, useState } from 'react';
import Orb from '../ogl/Orb';
import ChatInput, { type ChatFormData } from './ChatInput';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import TypingIndector from './TypingIndector';

type ChatResponse = {
    answer: string;
};

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');
    const [isBotActive, setIsBotActive] = useState(true);
    const conversationId = useRef(crypto.randomUUID());

    const onSubmit = async ({ question }: ChatFormData) => {
        try {
            setMessages(prev => [...prev, { content: question, role: 'user' }]);
            setIsBotActive(false);
            setError('');
            const { data } = await axios.post<ChatResponse>('/api/chat', {
                question,
                conversationId: conversationId.current,
            });
            // console.log(data);
            setMessages(prev => [
                ...prev,
                { content: data.answer, role: 'bot' },
            ]);
            setIsBotActive(true);
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsBotActive(true);
        }
    };

    return (
        <div className="relative flex flex-col h-full">
            <div className="absolute inset-0 -z-10 bg-neutral-800">
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
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
        </div>
    );
};

export default Chatbot;
