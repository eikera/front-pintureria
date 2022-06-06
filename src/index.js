import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/primereact/resources/themes/lara-light-indigo/theme.css";
import "../node_modules/primereact/resources/primereact.min.css"; 
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "./index.css"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);