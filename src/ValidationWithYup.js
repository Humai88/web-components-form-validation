import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';

const Label = props => {
    return <div className="label">{props.children}</div>;
};
const Error = props => {
    return <div className="error">{props.children}</div>;
};

function ValidationWithYup() {
    // Local state for successful submission message
    const [isSent, setIsSent] = useState(false);

    const textareaRef = useRef(null);
    const selectRef = useRef(null);
    const textRef = useRef(null);
    const numberRef = useRef(null);
    const passwordRef = useRef(null);

    const validate = Yup.object({
        textarea: Yup.string()
            .min(10, 'You should type at least 10 characters in your message!')
            .max(350, 'Too Long!')
            .required('Required!'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long!')
            .max(21, 'Too Long!')
            .required('Required!'),
    });
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            select: '',
            textarea: '',
            number: 0,
            password: '',
        },
        validationSchema: validate,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            resetForm();
            setIsSent(true);
            setSubmitting(false);
            console.log(values);
        },
    });

    // Make successful submission message dissapear after 2.5sec
    useEffect(() => {
        const timeId = setTimeout(() => {
            setIsSent(false);
        }, 2500);
        return () => {
            clearTimeout(timeId);
        };
    }, [isSent]);

    useLayoutEffect(() => {
        textRef.current.addEventListener('sl-change', handleChange);
        textareaRef.current.addEventListener('sl-change', handleChange);
        selectRef.current.addEventListener('sl-change', handleChange);
        numberRef.current.addEventListener('sl-change', handleChange);
        passwordRef.current.addEventListener('sl-change', handleChange);
    }, [textareaRef, selectRef, textRef, numberRef, passwordRef, handleChange]);

    return (
        <div className="App">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label>Email</Label>
                        <sl-input
                            ref={textRef}
                            type="text"
                            name="email"
                            value={values.email}
                        ></sl-input>
                        <Error> {errors.email ? errors.email : null}</Error>
                    </div>
                    <div>
                        <Label>Textarea</Label>
                        <sl-textarea
                            ref={textareaRef}
                            name="textarea"
                            value={values.textarea}
                        ></sl-textarea>
                        <Error>
                            {errors.textarea ? errors.textarea : null}
                        </Error>
                    </div>
                    <div>
                        <Label>Select</Label>
                        <sl-select ref={selectRef} name="select">
                            <sl-menu-item value="option-1">
                                Option 1
                            </sl-menu-item>
                            <sl-menu-item value="option-2">
                                Option 2
                            </sl-menu-item>
                            <sl-menu-item value="option-3">
                                Option 3
                            </sl-menu-item>
                            <sl-divider></sl-divider>
                            <sl-menu-item value="option-4">
                                Option 4
                            </sl-menu-item>
                            <sl-menu-item value="option-5">
                                Option 5
                            </sl-menu-item>
                            <sl-menu-item value="option-6">
                                Option 6
                            </sl-menu-item>
                        </sl-select>
                    </div>
                    <div>
                        <Label>Number</Label>
                        <sl-input
                            ref={numberRef}
                            type="number"
                            name="number"
                            value={values.number}
                        ></sl-input>
                    </div>
                    <div>
                        <Label>Password</Label>
                        <sl-input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            value={values.password}
                        ></sl-input>
                        <Error>
                            {errors.password ? errors.password : null}
                        </Error>
                    </div>
                    {isSent ? (
                        <div className="successMessage">
                            Submission was suceessful
                        </div>
                    ) : null}
                    <sl-button variant="primary" type="submit">
                        Submit
                    </sl-button>
                </form>
            </div>
        </div>
    );
}

export default ValidationWithYup;
