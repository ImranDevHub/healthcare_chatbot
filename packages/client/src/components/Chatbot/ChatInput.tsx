import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { FaRegSquare } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export type ChatFormData = {
    question: string;
};

type Props = {
    isBotActive: boolean;
    onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit, isBotActive }: Props) => {
    const { register, handleSubmit, reset, formState } =
        useForm<ChatFormData>();

    const handleFormSubmit = handleSubmit(data => {
        reset({ question: '' });
        onSubmit(data);
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit();
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            onKeyDown={isBotActive ? handleKeyDown : undefined}
            className="p-2 flex flex-col gap-2 items-end border-1 border-zinc-500 rounded-2xl bg-neutral-800/10 backdrop-blur max-w-10/12 "
        >
            <Textarea
                {...register('question', {
                    required: true,
                    validate: value => value.trim().length > 0,
                })}
                autoFocus
                placeholder="Ask anything..."
                maxLength={1000}
                className="w-full border-0 focus-visible:ring-0 bg-transparent text-gray-200"
            />

            <Button
                disabled={!formState.isValid || !isBotActive}
                className="rounded-full w-9 h-9 bg-gray-200 text-black "
            >
                {isBotActive ? <FaArrowUp /> : <FaRegSquare />}
            </Button>
        </form>
    );
};

export default ChatInput;
