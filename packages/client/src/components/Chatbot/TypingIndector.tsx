const TypingIndector = () => {
    return (
        <div className="flex gap-1 px-3 py-3 bg-transparent backdrop-blur rounded-md max-w-1/2 self-start">
            <Dot />
            <Dot className="[animation-delay-0.2s]" />
            <Dot className="[animation-delay-0.2s]" />
        </div>
    );
};

type DotProps = {
    className?: string;
};

const Dot = ({ className }: DotProps) => (
    <div
        className={`bg-gray-200 w-2 h-2 rounded-full animate-pulse ${className}`}
    ></div>
);

export default TypingIndector;
