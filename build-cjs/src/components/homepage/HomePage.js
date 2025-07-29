"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @module HomePage
 * @description
 * Ana sayfanın "Home" bölümü için React fonksiyonel bileşen.
 *
 * - Kişisel tanıtım metni içerir.
 * - Yazı animasyonu (yazma ve silme efektli) ile farklı tanımlamalar gösterir.
 * - Sosyal medya ikonları ve ilgili bağlantılar bulunur.
 * - Profil fotoğrafı ve CV indirme butonu içerir.
 *
 * @returns {JSX.Element} Ana sayfa "Home" bölümü bileşeni
 */
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const seccad_png_1 = __importDefault(require("../../assets/seccad.png"));
const Homepage_styles_1 = require("./Homepage.styles");
const Home = () => {
    const texts = [
        "bir fullstack geliştiriciyim",
        "bir mobil geliştiriciyim",
    ];
    const [displayedText, setDisplayedText] = (0, react_1.useState)("");
    const [textIndex, setTextIndex] = (0, react_1.useState)(0);
    const [charIndex, setCharIndex] = (0, react_1.useState)(0);
    const [isDeleting, setIsDeleting] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const currentText = texts[textIndex];
        if (!isDeleting && charIndex === currentText.length) {
            const pause = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(pause);
        }
        if (isDeleting && charIndex === 0) {
            const pause = setTimeout(() => {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }, 100);
            return () => clearTimeout(pause);
        }
        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayedText(currentText.substring(0, Math.max(charIndex - 1, 0)));
                setCharIndex((prev) => Math.max(prev - 1, 0));
            }
            else {
                setDisplayedText(currentText.substring(0, charIndex + 1));
                setCharIndex((prev) => Math.min(prev + 1, currentText.length));
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, texts]);
    const socialLinks = [
        { icon: (0, jsx_runtime_1.jsx)(icons_1.InstagramOutlined, {}), url: "https://instagram.com" },
        { icon: (0, jsx_runtime_1.jsx)(icons_1.FacebookOutlined, {}), url: "https://facebook.com" },
        { icon: (0, jsx_runtime_1.jsx)(icons_1.TwitterOutlined, {}), url: "https://twitter.com" },
    ];
    return ((0, jsx_runtime_1.jsxs)(Homepage_styles_1.HomeSection, { id: "home", children: [(0, jsx_runtime_1.jsxs)(Homepage_styles_1.HomeContent, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Merhaba, ben Seccad" }), (0, jsx_runtime_1.jsxs)("h3", { children: ["Ben,", " ", (0, jsx_runtime_1.jsx)("span", { "aria-live": "polite", className: "animated-text", children: displayedText })] }), (0, jsx_runtime_1.jsx)("p", { children: "Flutter ile mobil uygulama geli\u015Ftirmenin yan\u0131 s\u0131ra son d\u00F6nemde Node.js ve TypeScript ile backend geli\u015Ftirmeye odaklanarak full-stack alanda kendimi geli\u015Ftiriyorum. Kullan\u0131c\u0131 odakl\u0131, h\u0131zl\u0131 ve modern uygulamalar \u00FCretmeyi seviyorum. Hem mobilde hem sunucu taraf\u0131nda daha iyi \u00E7\u00F6z\u00FCmler sunabilmek i\u00E7in \u00F6\u011Frenmeye ve \u00FCretmeye devam ediyorum." }), (0, jsx_runtime_1.jsx)(Homepage_styles_1.SocialIcons, { children: socialLinks.map(({ icon, url }, i) => ((0, jsx_runtime_1.jsx)("a", { href: url, target: "_blank", rel: "noreferrer", "aria-label": url, children: icon }, i))) }), (0, jsx_runtime_1.jsx)("a", { href: "/files/seccadCv.pdf", download: "SeccadYesilkayaCV.pdf", children: (0, jsx_runtime_1.jsx)(Homepage_styles_1.StyledButton, { children: "CV \u0130ndir" }) })] }), (0, jsx_runtime_1.jsx)(Homepage_styles_1.ProfileImageWrapper, { children: (0, jsx_runtime_1.jsx)("img", { src: seccad_png_1.default, alt: "Seccad" }) })] }));
};
exports.Home = Home;
exports.default = exports.Home;
//# sourceMappingURL=HomePage.js.map