import React from 'react';

function Input({ label = {}, attributes, reference }) {

    const userTyping = function detectUserTyping (event) {
        event.currentTarget.classList.remove('error');
    }

    return (
        <>
            <label htmlFor={label.for} className={label.className}>
                {label.text}
                <input {...attributes} ref={reference} onChange={userTyping} />
            </label>
        </>
    )
}

export default Input;
