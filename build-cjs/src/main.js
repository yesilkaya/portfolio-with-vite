"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const App_1 = __importDefault(require("./App"));
const container = document.getElementById('root');
if (container) {
    (0, client_1.createRoot)(container).render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }));
}
else {
    console.error('Root element not found');
}
//# sourceMappingURL=main.js.map