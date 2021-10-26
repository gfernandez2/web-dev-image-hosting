import React from 'react';

type travelProps = {
    onClick : (e : any) => void;
}

const PageTravel = ({ onClick } : travelProps) => {
    return (
        <div className="PageTravel" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </div>
    );
};

export default PageTravel;