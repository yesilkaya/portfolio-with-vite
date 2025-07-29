"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const servicesData_1 = require("../../data/servicesData");
const Services_styles_1 = require("./Services.styles");
const Services = () => {
    return ((0, jsx_runtime_1.jsxs)(Services_styles_1.ServicesSection, { id: "services", children: [(0, jsx_runtime_1.jsx)(Services_styles_1.SectionTitle, { level: 1, children: "Hizmetler" }), (0, jsx_runtime_1.jsx)(Services_styles_1.ServicesContainer, { children: servicesData_1.services.map((service, index) => ((0, jsx_runtime_1.jsxs)(Services_styles_1.ServiceCard, { whileHover: { scale: 1.05 }, initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [(0, jsx_runtime_1.jsx)(Services_styles_1.ServiceTitle, { children: service.title }), (0, jsx_runtime_1.jsx)(Services_styles_1.ServiceDescription, { children: service.description })] }, index))) })] }));
};
exports.Services = Services;
exports.default = exports.Services;
//# sourceMappingURL=Services.js.map