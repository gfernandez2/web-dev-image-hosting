import React, { MouseEventHandler } from 'react';

import '../styles/PageTravel.scss';

type travelProps = {
    onClick : MouseEventHandler<HTMLDivElement>;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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