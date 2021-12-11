import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type alertProps = {
    text: string;
    onClick: () => void;
}

const Alert = ({ text, onClick}: alertProps): JSX.Element => {
    
    return (
        <AnimatePresence>
            <motion.div 
                className="Alert"
                onClick={onClick}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%'}}
            >
                <p>{text}</p>
            </motion.div>
        </AnimatePresence>
    );
};

export default Alert;
