import React, {MouseEvent, useRef} from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { profileModalVariant } from '../../styles/variants';
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
    setModalVisibility: any;
}

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

const ProfileModal = ({ profilePicture, profileSettingsClick, logOutClick, userFullName, setModalVisibility }: modalProps) : JSX.Element => {

    const modalRef = useRef<HTMLDivElement>(null);

    const onModalBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.target !== modalRef.current && !modalRef.current.contains(e.target)) {
            setModalVisibility(false);
        }
    };

    return (
        <div className="ProfileModal-background" onClick={onModalBackgroundClick}>
            <motion.div ref={modalRef} className="ProfileModal"
                // key="profile-modal"
                variants={profileModalVariant}
                initial="initial"
                animate="active"
                exit={{
                    opacity: 0,
                    x: '100px'
                }}
            >
                <ModalUserEntry
                    name={userFullName}
                    profilePicture={profilePicture}
                />

                <div className="clickable-entry" onClick={profileSettingsClick}>Profile Settings</div>
                <div className="clickable-entry" onClick={logOutClick}>Log Out</div>
            </motion.div>
        </div>
    );
};

export default ProfileModal;