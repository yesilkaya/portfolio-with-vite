// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Home from "../components/HomePage.jsx";
import Education from "../components/Education.jsx";
import Services from "../components/Services.jsx";
import Projects from "../components/Projects.jsx";
import ContactForm from "../components/Contact.jsx";
import TimelineCom from "../components/Timeline.jsx";
import { navbar } from "../data/navbar";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CrudScreen from "../components/Crud.jsx";

function MainSections() {
  const sectionRefs = useRef({});
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView(), 100);
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
        .map((section) => (
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
            }}
          >
            {sectionComponents[section.id] || null}
          </section>
        ))}
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainSections />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/fullstack" element={<TimelineCom />} />
      <Route path="/crud" element={<CrudScreen />} />
    </Routes>
  );
}
