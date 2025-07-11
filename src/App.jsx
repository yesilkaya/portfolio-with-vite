import { Layout } from "antd";
import "antd/dist/reset.css";
import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import HeaderBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/HomePage.jsx";
import Education from "./components/Education.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import ContactForm from "./components/Contact.jsx";
import TimelineCom from "./components/Timeline.jsx";

import { navbar } from "./data/navbar";

const { Content } = Layout;

function MainSections() {
  const sectionRefs = useRef({});
  const location = useLocation();


  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  const sectionComponents = {
    [navbar[0].id]: <Home />,
    [navbar[1].id]: <Education />,
    [navbar[2].id]: <Services />,
    [navbar[3].id]: <ContactForm />,
  };

  return (
    <>
      {navbar
        .filter((section) => section.type === "scroll")
        .map((section, idx) => (
          <section
            id={section.id}
            key={section.key}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            style={{
              minHeight: "100vh",
              scrollMarginTop: "64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: idx === 0 ? 0 : 128,
              marginTop: idx === 0 ? 0 : -64,
            }}
          >
            {sectionComponents[section.id] || null}
          </section>
        ))}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh", width: "100vw" }}>
        <HeaderBar />
        <Content style={{ backgroundColor: "var(--second-bg-color)" }}>
          <Routes>
            <Route path="/" element={<MainSections />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/fullstack" element={<TimelineCom />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
