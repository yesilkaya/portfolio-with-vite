import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { navbar } from "../../data/navbar";
import { FooterContainer, SocialContainer, LinkList, Copyright, } from "./Footer.styles";
export const Footer = () => {
    return (_jsxs(FooterContainer, { children: [_jsxs(SocialContainer, { children: [_jsx("a", { href: "https://www.instagram.com/", target: "_blank", rel: "noopener noreferrer", children: _jsx(InstagramOutlined, {}) }), _jsx("a", { href: "https://facebook.com/", target: "_blank", rel: "noopener noreferrer", children: _jsx(FacebookOutlined, {}) }), _jsx("a", { href: "https://twitter.com/", target: "_blank", rel: "noopener noreferrer", children: _jsx(TwitterOutlined, {}) })] }), _jsx(LinkList, { children: navbar.slice(0, -1).map((section) => (_jsx("li", { children: _jsx(Link, { to: section.type === "route"
                            ? section.route ?? "/"
                            : `/#${section.id}`, style: { color: "var(--text-color)", textDecoration: "none" }, children: section.label }) }, section.id))) }), _jsxs(Copyright, { children: ["\u00A9 Created by ", _jsx("span", { children: "Seccad YE\u015E\u0130LKAYA" })] })] }));
};
//# sourceMappingURL=Footer.js.map