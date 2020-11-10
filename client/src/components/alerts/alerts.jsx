import React from 'react';

export default function Alert(props) {
    const { type, show, text } = props;
    return (
        <div className={`alert fade  ${type ? ' alert-' + type : ''} ${show ? ' show d-block' : 'd-none'}`}>
            {text ? text : ""}
        </div>
    );
}