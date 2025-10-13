import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
    content: string;
    role: 'user' | 'bot';
};

type Props = {
    messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [messages]);

    const onCopyMessage = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData('text/plain', selection);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
                <div
                    key={index}
                    onCopy={onCopyMessage}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`px-2.5 py-0.5 ${
                        message.role === 'user'
                            ? 'bg-indigo-950/40 backdrop-blur-2xl text-white self-end rounded-md max-w-1/2'
                            : 'bg-transparent backdrop-blur-xl text-gray-200 max-w-11/12 rounded-md'
                    }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
