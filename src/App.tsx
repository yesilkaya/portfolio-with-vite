/**
 * @file App.tsx
 *
 * Main application component that sets up the layout and routing for the application.
 * It includes a header, content area, and footer, and uses React Router for navigation.
 *
 * @author Seccad Yeşilkaya
 * @returns {JSX.Element}
 * @see {@link https://yesilkaya.vercel.app}
 */

import React from "react";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import {HeaderBar} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import AppRoutes from "./routes/AppRoutes";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh", width: "100vw" }}>
        <HeaderBar />
        <Content style={{ backgroundColor: "var(--second-bg-color)" }}>
          <AppRoutes />
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
