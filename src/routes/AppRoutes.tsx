import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import {Home} from "../components/homepage/HomePage";
import {Education} from "../components/educaiton/Education";
import {Services} from "../components/services/Services";
import {Projects} from "../components/projects/Projects";
import {ContactForm} from "../components/contact/Contact";
import {CrudScreen} from "../components/crud/Crud";
import { FeedbackScreen } from "../components/feedback/Feedback";
import type { JSX } from "react";

import { navbar } from "../data/navbar";

/**
 * `MainSections` bileşeni, navbar öğelerine göre belirli bölümleri (Home, Education, Services, Contact) oluşturur.
 * 
 * - `useLocation` ile URL'deki hash'e göre sayfayı ilgili bölüme kaydırır.
 * - `navbar` verisindeki `type: 'scroll'` olan bölümleri render eder.
 * 
 * @returns {JSX.Element} Tüm scroll bölümlerini kapsayan React bileşeni
 */

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

/**
 * `AppRoutes` bileşeni uygulamanın tüm rotalarını tanımlar.
 *
 * - `/`: Ana sayfa scrollable bölümlerle (`MainSections`) gösterilir.
 * - `/projects`: Projeler sayfası (`Projects`) gösterilir.
 * - `/crud`: CRUD işlemleri için özel sayfa (`CrudScreen`) gösterilir.
 *
 * @returns {JSX.Element} React Router tarafından yönetilen rota bileşenleri
 */
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainSections />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/crud" element={<CrudScreen />} />
      <Route path="/feedback" element={<FeedbackScreen />} />
    </Routes>
  );
}
