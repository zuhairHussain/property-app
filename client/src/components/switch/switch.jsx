import React from 'react';

import './switch.scss';

export default function Switch(props) {
    const { checked, onClick } = props;
    return (
        <div className="switch" onClick={() => onClick ? onClick() : ""} >
            <input type="checkbox" className={checked} />
            <span className="slider round"></span>
        </div>
    );
}