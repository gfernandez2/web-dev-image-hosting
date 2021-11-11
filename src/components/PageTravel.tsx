import React, { MouseEventHandler } from 'react';

import '../styles/PageTravel.scss';

type travelProps = {
    onClick : MouseEventHandler<HTMLDivElement>;
    id: string;
    children: any;
}

const PageTravel = ({ onClick, id, children } : travelProps): JSX.Element => {
    return (
        <div id={id} className="PageTravel" onClick={onClick}>
            {children}
        </div>
    );
};

export default PageTravel;