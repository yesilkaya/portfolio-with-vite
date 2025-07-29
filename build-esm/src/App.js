import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HeaderBar } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import AppRoutes from "./routes/AppRoutes";
const { Content } = Layout;
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Layout, { style: { minHeight: "100vh", width: "100vw" }, children: [_jsx(HeaderBar, {}), _jsx(Content, { style: { backgroundColor: "var(--second-bg-color)" }, children: _jsx(AppRoutes, {}) }), _jsx(Footer, {})] }) }));
}
export default App;
//# sourceMappingURL=App.js.map