import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import '../../styles/ProfileModal.scss';

type modalUserEntryProps = {
    name: string;
    profilePicture: string; //url
}

type modalProps = {
    profilePicture: string;
    profileSettingsClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    logOutClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    userFullName: string;
    modalVisibility: boolean
}

/* https://fireship.io/lessons/framer-motion-modal/ */
const modalVariants = {
    hidden: {
        x: '100%',
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
    }
};

const ModalUserEntry = ({ name, profilePicture }: modalUserEntryProps): JSX.Element => {

    return (
        <div className="ModalUserEntry"> 
            <img 
                src={profilePicture} 
                alt={`Profile picture of ${name}`}>
            </img>
            <p>{name}</p>
        </div>
    );
}; 

const ProfileModal = ({ profilePicture, profileSettingsClick, logOutClick, userFullName, modalVisibility }: modalProps) : JSX.Element => {

    return (
        <AnimatePresence
            initial={true}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
            {modalVisibility && <motion.div 
                className="ProfileModal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.1
                }}
            >
                <ModalUserEntry
                    name={userFullName}
                    profilePicture={profilePicture}
                />

                <div className="clickable-entry" onClick={profileSettingsClick}>Profile Settings</div>
                <div className="clickable-entry" onClick={logOutClick}>Log Out</div>
            </motion.div>}
        </AnimatePresence>
    );
};

export default ProfileModal;