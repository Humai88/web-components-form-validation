import logo from './logo.svg';
import './App.css';
import { useFormik, useCallback } from 'formik';

import { useRef, useLayoutEffect, useState } from 'react';

const Label = (props) => {
  return (
    <div className="label">
      {props.children}
    </div>
  )
}
const Error = (props) => {
  return (
    <div className="error">
      {props.children}
    </div>
  )
}

function App() {

  const [emailError, setEmailError] = useState(null);

  const textareaRef = useRef(null);
  const selectRef = useRef(null);
  const textRef = useRef(null);
  const numberRef = useRef(null);
  const passwordRef = useRef(null);

  
  const formik = useFormik({
     initialValues: {
      textarea: '',
      select: '',
      email: '',
      number: 0,
      password: ''
    },
    validate: values => {

      // To use something like YUP here
      const errors = {};
      console.log('values', values);
      setEmailError(null);
      if (!values.email) {
        errors.email = 'Required';
        setEmailError('Required')
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
        setEmailError('Invalid email address')
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }
  });
  
  const handleChange = (e) => {
    console.log('value', e.target.value);
    formik.handleChange(e);
  };

  useLayoutEffect(() => {

    textareaRef.current.addEventListener('sl-change', handleChange);
    selectRef.current.addEventListener('sl-change', handleChange);
    textRef.current.addEventListener('sl-change', handleChange);
    numberRef.current.addEventListener('sl-change', handleChange);
    passwordRef.current.addEventListener('sl-change', handleChange);

  }, [textareaRef, selectRef, textRef, numberRef, passwordRef, handleChange]);

  return (
    <div className="App">
      <div className="form-wrapper">
        <form onSubmit={formik.onSubmit}>
          <div>
            <Label>Email</Label>
            <sl-input ref={textRef} type="text" name="email"  value={formik.values.email}></sl-input>
            {emailError && <Error>{emailError}</Error>}
          </div>
          <div>
            <Label>Textarea</Label>
            <sl-textarea ref={textareaRef} name="textarea" value={formik.values.textarea}></sl-textarea>
          </div>
          <div>
            <Label>Select</Label>
            <sl-select ref={selectRef} name="select">
              <sl-menu-item value="option-1">Option 1</sl-menu-item>
              <sl-menu-item value="option-2">Option 2</sl-menu-item>
              <sl-menu-item value="option-3">Option 3</sl-menu-item>
              <sl-divider></sl-divider>
              <sl-menu-item value="option-4">Option 4</sl-menu-item>
              <sl-menu-item value="option-5">Option 5</sl-menu-item>
              <sl-menu-item value="option-6">Option 6</sl-menu-item>
            </sl-select>
          </div>
          <div>
            <Label>Number</Label>
            <sl-input ref={numberRef} type="number" name="number"></sl-input>
          </div>
          <div>
            <Label>Password</Label>
            <sl-input ref={passwordRef} type="password" name="password"></sl-input>
          </div>
          <sl-button type="submit">Submit</sl-button>
        </form>
      </div>
    </div>
  );
}

export default App;
