import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ValidationWithYup from './ValidationWithYup';
import ValidationWithWrapperComponent from './ValidationWithWrapperComponent';

ReactDOM.render(
    <React.StrictMode>
        {/* <App /> */}
        {/* <ValidationWithYup /> */}
        <ValidationWithWrapperComponent />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
