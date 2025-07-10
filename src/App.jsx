import { Layout, Timeline } from "antd";
import "antd/dist/reset.css";
import { useEffect, useRef } from "react";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

// Components
import HeaderBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/HomePage.jsx";
import Education from "./components/Education.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import ContactForm from "./components/Contact.jsx";

// Navbar verileri
import { navbar } from "./data/navbar";
import TimelineCom from "./components/Timeline.jsx";

const { Content } = Layout;

function MainSections() {
  const sectionRefs = useRef([]);
  const location = useLocation(); // 👈 URL'den hash'i okuyabilmek için

  // 🔁 Scroll ile aktif section tespiti
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === visibleEntry.target
          );
          // scroll-based active menu logic burada kalabilir
        }
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // ✅ URL'deki hash varsa otomatik scroll
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // layout otursun diye geciktirme
      }
    }
  }, [location]);

  // Section render mantığı
  const renderSectionContent = (section) => {
    switch (section.id) {
      case navbar[0].id:
        return <Home />;
      case navbar[1].id:
        return <Education />;
      case navbar[2].id:
        return <Services />;
      case navbar[3].id:
        return <ContactForm />;
        default:
          return null;

    }
  };
  

  return (
    <>
      {navbar
  .filter((section) => section.id !== navbar[4].id && section.id !== navbar[5].id)
  .map((section, index) => (
        <section
          id={section.id}
          key={section.key}
          ref={(el) => (sectionRefs.current[index] = el)}
          style={{
            minHeight: "100vh",
            paddingTop: index === 0 ? "0px" : "128px",
            marginTop: index === 0 ? "0px" : "-64px",
            scrollMarginTop: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderSectionContent(section)}
        </section>
      ))}
      <Footer />
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
      </Layout>
    </Router>
  );
}

export default App;
