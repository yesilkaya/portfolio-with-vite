import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
const container = document.getElementById('root');
if (container) {
    createRoot(container).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
}
else {
    console.error('Root element not found');
}
//# sourceMappingURL=main.js.map