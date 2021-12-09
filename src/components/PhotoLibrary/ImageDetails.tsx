import React, { useRef } from 'react';

import '../../styles/ImageDetails.scss';

type detailProps = {
    src : string;
    alt : string;
    outOfBounds : boolean;
}

const ImageDetails = ({ src, alt, outOfBounds }: detailProps): JSX.Element => {

    const imgDetailsRef = useRef<HTMLDivElement>(null);

    return (
        <div className="ImageDetails" ref={imgDetailsRef}>
            <img src={src} />
            <h3>{alt}</h3>
        </div>
    );
};

export default ImageDetails;