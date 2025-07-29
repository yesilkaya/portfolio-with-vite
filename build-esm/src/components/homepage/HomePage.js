import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { useEffect, useState } from "react";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, } from "@ant-design/icons";
import profileImage from "../../assets/seccad.png";
import { HomeSection, HomeContent, ProfileImageWrapper, SocialIcons, StyledButton, } from "./Homepage.styles";
export const Home = () => {
    const texts = [
        "bir fullstack geliştiriciyim",
        "bir mobil geliştiriciyim",
    ];
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
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
        { icon: _jsx(InstagramOutlined, {}), url: "https://instagram.com" },
        { icon: _jsx(FacebookOutlined, {}), url: "https://facebook.com" },
        { icon: _jsx(TwitterOutlined, {}), url: "https://twitter.com" },
    ];
    return (_jsxs(HomeSection, { id: "home", children: [_jsxs(HomeContent, { children: [_jsx("h1", { children: "Merhaba, ben Seccad" }), _jsxs("h3", { children: ["Ben,", " ", _jsx("span", { "aria-live": "polite", className: "animated-text", children: displayedText })] }), _jsx("p", { children: "Flutter ile mobil uygulama geli\u015Ftirmenin yan\u0131 s\u0131ra son d\u00F6nemde Node.js ve TypeScript ile backend geli\u015Ftirmeye odaklanarak full-stack alanda kendimi geli\u015Ftiriyorum. Kullan\u0131c\u0131 odakl\u0131, h\u0131zl\u0131 ve modern uygulamalar \u00FCretmeyi seviyorum. Hem mobilde hem sunucu taraf\u0131nda daha iyi \u00E7\u00F6z\u00FCmler sunabilmek i\u00E7in \u00F6\u011Frenmeye ve \u00FCretmeye devam ediyorum." }), _jsx(SocialIcons, { children: socialLinks.map(({ icon, url }, i) => (_jsx("a", { href: url, target: "_blank", rel: "noreferrer", "aria-label": url, children: icon }, i))) }), _jsx("a", { href: "/files/seccadCv.pdf", download: "SeccadYesilkayaCV.pdf", children: _jsx(StyledButton, { children: "CV \u0130ndir" }) })] }), _jsx(ProfileImageWrapper, { children: _jsx("img", { src: profileImage, alt: "Seccad" }) })] }));
};
export default Home;
//# sourceMappingURL=HomePage.js.map