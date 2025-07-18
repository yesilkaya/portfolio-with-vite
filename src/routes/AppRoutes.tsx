import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import React from "react"; // Bu satır JSX türleri için gerekli

import Home from "../components/HomePage";
import Education from "../components/Education";
import Services from "../components/Services";
import Projects from "../components/Projects";
import ContactForm from "../components/Contact";
import TimelineCom from "../components/Timeline";
import CrudScreen from "../components/Crud";
import type { JSX } from "react";


import { navbar } from "../data/navbar";

function MainSections(): JSX.Element {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
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

  const sectionComponents: Record<string, JSX.Element | null> = {
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
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
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

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainSections />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/fullstack" element={<TimelineCom />} />
      <Route path="/crud" element={<CrudScreen />} />
    </Routes>
  );
}
