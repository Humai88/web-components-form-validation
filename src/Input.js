import React from 'react';
import { useEffect, useRef } from 'react';

export const Input = props => {
    const inputRef = useRef();

    const { children, onChange, ...rest } = props;

    function invokeCallback(e) {
        if (onChange) {
            onChange(e, inputRef.current);
        }
    }

    useEffect(() => {
        const { current } = inputRef;
        current.addEventListener('sl-change', invokeCallback);
        return () => {
            current.removeEventListener('sl-change', invokeCallback);
        };
    });

    return (
        <sl-input ref={inputRef} {...rest}>
            {children}
        </sl-input>
    );
};
