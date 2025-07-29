"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@ant-design/icons");
const react_router_dom_1 = require("react-router-dom");
const navbar_1 = require("../../data/navbar");
const Footer_styles_1 = require("./Footer.styles");
const Footer = () => {
    return ((0, jsx_runtime_1.jsxs)(Footer_styles_1.FooterContainer, { children: [(0, jsx_runtime_1.jsxs)(Footer_styles_1.SocialContainer, { children: [(0, jsx_runtime_1.jsx)("a", { href: "https://www.instagram.com/", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(icons_1.InstagramOutlined, {}) }), (0, jsx_runtime_1.jsx)("a", { href: "https://facebook.com/", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(icons_1.FacebookOutlined, {}) }), (0, jsx_runtime_1.jsx)("a", { href: "https://twitter.com/", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(icons_1.TwitterOutlined, {}) })] }), (0, jsx_runtime_1.jsx)(Footer_styles_1.LinkList, { children: navbar_1.navbar.slice(0, -1).map((section) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: section.type === "route"
                            ? section.route ?? "/"
                            : `/#${section.id}`, style: { color: "var(--text-color)", textDecoration: "none" }, children: section.label }) }, section.id))) }), (0, jsx_runtime_1.jsxs)(Footer_styles_1.Copyright, { children: ["\u00A9 Created by ", (0, jsx_runtime_1.jsx)("span", { children: "Seccad YE\u015E\u0130LKAYA" })] })] }));
};
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map