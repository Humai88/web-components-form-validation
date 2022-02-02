import React from 'react';
import { useEffect, useRef } from 'react';

export const Textarea = props => {
    const textareaRef = useRef();

    const { children, onChange, ...rest } = props;

    function invokeCallback(e) {
        if (onChange) {
            onChange(e, textareaRef.current);
        }
    }

    useEffect(() => {
        const { current } = textareaRef;
        current.addEventListener('sl-change', invokeCallback);
        return () => {
            current.removeEventListener('sl-change', invokeCallback);
        };
    });

    return (
        <sl-textarea ref={textareaRef} {...rest}>
            {children}
        </sl-textarea>
    );
};
