import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { services } from "../../data/servicesData";
import { ServicesSection, SectionTitle, ServicesContainer, ServiceCard, ServiceTitle, ServiceDescription, } from "./Services.styles";
export const Services = () => {
    return (_jsxs(ServicesSection, { id: "services", children: [_jsx(SectionTitle, { level: 1, children: "Hizmetler" }), _jsx(ServicesContainer, { children: services.map((service, index) => (_jsxs(ServiceCard, { whileHover: { scale: 1.05 }, initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [_jsx(ServiceTitle, { children: service.title }), _jsx(ServiceDescription, { children: service.description })] }, index))) })] }));
};
export default Services;
//# sourceMappingURL=Services.js.map