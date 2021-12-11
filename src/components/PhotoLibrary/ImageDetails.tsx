import React, { useRef, MouseEvent } from 'react';
import { X } from 'react-feather';
import { Iimage } from '../../services/imageServices'; 
import { motion } from 'framer-motion';

import { deleteImageByUser } from '../../services/imageServices';

type detailProps = {
    src : string;
    alt : string;
    images : Iimage[];
    setIsFocused: any;
    showAlert: (text: string) => void;
}

const ImageDetails = ({ src, alt, images, setIsFocused, showAlert }: detailProps): JSX.Element => {


    const clipboardClick = () => {

        showAlert('Copied to clipboard!');
        navigator.clipboard.writeText(src);
    };

    const divRef = useRef<HTMLDivElement>(null);
    const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.target !== divRef.current && !divRef.current.contains(e.target)) {
            setIsFocused(false);
        }

    };

    const deleteButtonClick = async () => {
        const choice = confirm('Are you sure you want to delete the image? This \
action cannot be reversed!');

        if (!choice) return;

        showAlert('Deleting image!');
        const imgDeletedState = deleteImageByUser(src); 
        console.log('was image deleted?', await imgDeletedState);
    };


    return (
        <motion.div 
            className="ImageDetails" 
            onClick={clickHandler}
            animate={{ opacity: 1}}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 1 }}
        >
            <div className="container" ref={divRef}>
                <X onClick={() =>  setIsFocused(false)} className="close-icon" />
                <img src={src} alt={alt} />
                <div className="image-info">
                    <div className="image-content">
                        <div>
                            <h3>File Name</h3>
                            <p>{images.find((image) => image.src == src)?.name}</p>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <p>{alt ? alt : 'No description provided.'}</p>
                        </div>
                        <button onClick={deleteButtonClick}>Delete</button>
                        <button onClick={clipboardClick}>Copy to Clipboard</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ImageDetails;