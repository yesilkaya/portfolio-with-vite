// src/App.jsx
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import HeaderBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh", width: "100vw" }}>
        <HeaderBar />
        <Content style={{ backgroundColor: "var(--second-bg-color)" }}>
          <AppRoutes />
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
