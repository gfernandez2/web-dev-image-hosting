import React, { useRef, useEffect, MouseEvent } from 'react';
import { Iimage } from '../../services/imageServices'; 
import UploadButton from '../UploadButton';

type detailProps = {
    src : string;
    alt : string;
    images : Iimage[];
    setIsFocused: any;
}

const ImageDetails = ({ src, alt, images, setIsFocused }: detailProps): JSX.Element => { 

    const divRef = useRef<HTMLDivElement>(null);
    const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.target !== divRef.current && !divRef.current.contains(e.target)) {
            setIsFocused(false);
        }

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
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;