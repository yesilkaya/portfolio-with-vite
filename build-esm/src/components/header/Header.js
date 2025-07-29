import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { navbar } from "../../data/navbar";
import { HeaderContainer, LogoLink, CustomMenu, } from "./Header.styles";
import { Link } from "react-router-dom";
export const HeaderBar = () => {
    return (_jsxs(HeaderContainer, { children: [_jsxs(LogoLink, { to: "/#home", children: ["Seccad ", _jsx("span", { children: "YE\u015E\u0130LKAYA" })] }), _jsx(CustomMenu, { mode: "horizontal", style: { flex: 1, justifyContent: "flex-end", display: "flex", backgroundColor: "transparent", borderBottom: "none" }, items: navbar.map((section) => ({
                    key: section.key,
                    label: (_jsx(Link, { to: section.type === "route"
                            ? section.route ?? "/"
                            : `/#${section.id}`, children: _jsx("span", { style: { color: 'var(--text-color)' }, children: section.label }) })),
                })) })] }));
};
//# sourceMappingURL=Header.js.map