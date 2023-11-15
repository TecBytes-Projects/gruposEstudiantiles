import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginView from './views/LoginView';

const root = document.getElementById('root');

// Utiliza createRoot en lugar de ReactDOM.render
const reactRoot = createRoot(root);

reactRoot.render(
    <React.StrictMode>
        <LoginView />
    </React.StrictMode>
);