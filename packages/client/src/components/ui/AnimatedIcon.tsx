import { useState } from 'react';
import { Link } from 'react-router-dom';
import UseAnimations from 'react-useanimations';

const AnimatedIcon = ({ animation, link }) => {
    const [play, setPlay] = useState(false);

    return (
        <Link to={link} target="_blank">
            <div
                onMouseEnter={() => setPlay(true)}
                onMouseLeave={() => setPlay(false)}
                className="cursor-pointer"
            >
                <UseAnimations
                    animation={animation}
                    strokeColor="#E0E0E0"
                    autoplay={play}
                    loop={true}
                />
            </div>
        </Link>
    );
};

export default AnimatedIcon;
