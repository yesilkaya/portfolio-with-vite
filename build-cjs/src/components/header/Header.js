"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const navbar_1 = require("../../data/navbar");
const Header_styles_1 = require("./Header.styles");
const react_router_dom_1 = require("react-router-dom");
const HeaderBar = () => {
    return ((0, jsx_runtime_1.jsxs)(Header_styles_1.HeaderContainer, { children: [(0, jsx_runtime_1.jsxs)(Header_styles_1.LogoLink, { to: "/#home", children: ["Seccad ", (0, jsx_runtime_1.jsx)("span", { children: "YE\u015E\u0130LKAYA" })] }), (0, jsx_runtime_1.jsx)(Header_styles_1.CustomMenu, { mode: "horizontal", style: { flex: 1, justifyContent: "flex-end", display: "flex", backgroundColor: "transparent", borderBottom: "none" }, items: navbar_1.navbar.map((section) => ({
                    key: section.key,
                    label: ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: section.type === "route"
                            ? section.route ?? "/"
                            : `/#${section.id}`, children: (0, jsx_runtime_1.jsx)("span", { style: { color: 'var(--text-color)' }, children: section.label }) })),
                })) })] }));
};
exports.HeaderBar = HeaderBar;
//# sourceMappingURL=Header.js.map