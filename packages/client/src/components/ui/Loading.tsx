import React from 'react';
import UseAnimations from 'react-useanimations';
import spinner from 'react-useanimations/lib/loading';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <UseAnimations
                animation={spinner}
                autoPlay={true}
                strokeColor="#E0E0E0"
                loop={true}
                size={50}
            />
        </div>
    );
};

export default Loading;
