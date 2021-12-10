import React, { useRef, MouseEvent } from 'react';
import { Iimage } from '../../services/imageServices'; 

import { deleteImageByUser } from '../../services/imageServices';

type detailProps = {
    src : string;
    alt : string;
    images : Iimage[];
    setIsFocused: any;
}

const ImageDetails = ({ src, alt, images, setIsFocused }: detailProps): JSX.Element => {


    const clipboardClick = (e: MouseEvent<HTMLButtonElement>) => {

        alert('Copied to clipboard!');
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

        alert('deleting image!');
        const imgDeletedState = deleteImageByUser(src);
        console.log('was image deleted?', await imgDeletedState);
    };


    return (
        <div className="ImageDetails" onClick={clickHandler}>
            <div className="container" ref={divRef}>
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
        </div>
    );
};

export default ImageDetails;