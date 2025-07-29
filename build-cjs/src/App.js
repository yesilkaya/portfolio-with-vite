"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
require("antd/dist/reset.css");
require("./index.css");
const react_router_dom_1 = require("react-router-dom");
const Header_1 = require("./components/header/Header");
const Footer_1 = require("./components/footer/Footer");
const AppRoutes_1 = __importDefault(require("./routes/AppRoutes"));
const { Content } = antd_1.Layout;
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(antd_1.Layout, { style: { minHeight: "100vh", width: "100vw" }, children: [(0, jsx_runtime_1.jsx)(Header_1.HeaderBar, {}), (0, jsx_runtime_1.jsx)(Content, { style: { backgroundColor: "var(--second-bg-color)" }, children: (0, jsx_runtime_1.jsx)(AppRoutes_1.default, {}) }), (0, jsx_runtime_1.jsx)(Footer_1.Footer, {})] }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map