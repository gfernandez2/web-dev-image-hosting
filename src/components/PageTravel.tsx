import React from 'react';

import '../styles/PageTravel.scss';

type travelProps = {
    onClick : (e : any) => void;
    id: string;
    children: any;
}

const PageTravel = ({ onClick, id, children } : travelProps) => {
    return (
        <div id={id} className="PageTravel" onClick={onClick}>
            {children}
        </div>
    );
};

export default PageTravel;