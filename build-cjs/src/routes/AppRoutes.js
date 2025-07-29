"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRoutes;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const HomePage_1 = require("../components/homepage/HomePage");
const Education_1 = require("../components/educaiton/Education");
const Services_1 = require("../components/services/Services");
const Projects_1 = require("../components/projects/Projects");
const Contact_1 = require("../components/contact/Contact");
const Crud_1 = require("../components/crud/Crud");
const navbar_1 = require("../data/navbar");
/**
 * `MainSections` bileşeni, navbar öğelerine göre belirli bölümleri (Home, Education, Services, Contact) oluşturur.
 *
 * - `useLocation` ile URL'deki hash'e göre sayfayı ilgili bölüme kaydırır.
 * - `navbar` verisindeki `type: 'scroll'` olan bölümleri render eder.
 *
 * @returns {JSX.Element} Tüm scroll bölümlerini kapsayan React bileşeni
 */
function MainSections() {
    const sectionRefs = (0, react_1.useRef)({});
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => el.scrollIntoView(), 100);
            }
        }
    }, [location]);
    const sectionComponents = {
        [navbar_1.navbar[0].id]: (0, jsx_runtime_1.jsx)(HomePage_1.Home, {}),
        [navbar_1.navbar[1].id]: (0, jsx_runtime_1.jsx)(Education_1.Education, {}),
        [navbar_1.navbar[2].id]: (0, jsx_runtime_1.jsx)(Services_1.Services, {}),
        [navbar_1.navbar[3].id]: (0, jsx_runtime_1.jsx)(Contact_1.ContactForm, {}),
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: navbar_1.navbar
            .filter((section) => section.type === "scroll")
            .map((section) => ((0, jsx_runtime_1.jsx)("section", { id: section.id, ref: (el) => {
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
function AppRoutes() {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(MainSections, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/projects", element: (0, jsx_runtime_1.jsx)(Projects_1.Projects, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/crud", element: (0, jsx_runtime_1.jsx)(Crud_1.CrudScreen, {}) })] }));
}
//# sourceMappingURL=AppRoutes.js.map