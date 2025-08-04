import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Home } from "../components/homepage/HomePage";
import { Education } from "../components/educaiton/Education";
import { Services } from "../components/services/Services";
import { Projects } from "../components/projects/Projects";
import { ContactForm } from "../components/contact/Contact";
import { CrudScreen } from "../components/crud/Crud";
import { FeedbackScreen } from "../components/feedback/Feedback";
import { navbar } from "../data/navbar";
/**
 * `MainSections` bileşeni, navbar öğelerine göre belirli bölümleri (Home, Education, Services, Contact) oluşturur.
 *
 * - `useLocation` ile URL'deki hash'e göre sayfayı ilgili bölüme kaydırır.
 * - `navbar` verisindeki `type: 'scroll'` olan bölümleri render eder.
 *
 * @returns {JSX.Element} Tüm scroll bölümlerini kapsayan React bileşeni
 */
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
        [navbar[0].id]: _jsx(Home, {}),
        [navbar[1].id]: _jsx(Education, {}),
        [navbar[2].id]: _jsx(Services, {}),
        [navbar[3].id]: _jsx(ContactForm, {}),
    };
    return (_jsx(_Fragment, { children: navbar
            .filter((section) => section.type === "scroll")
            .map((section) => (_jsx("section", { id: section.id, ref: (el) => {
                sectionRefs.current[section.id] = el;
            }, style: {
                minHeight: "100vh",
                scrollMarginTop: "64px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }, children: sectionComponents[section.id] || null }, section.key))) }));
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
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainSections, {}) }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "/crud", element: _jsx(CrudScreen, {}) }), _jsx(Route, { path: "/feedback", element: _jsx(FeedbackScreen, {}) })] }));
}
//# sourceMappingURL=AppRoutes.js.map