import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * @module Projects
 * @description
 * Projeler sayfası bileşeni.
 *
 * - Statik olarak tanımlanmış mobil uygulama projelerini görsel ve açıklamalarıyla listeler.
 * - GitHub API üzerinden kullanıcının repo bilgilerini çekerek GitHub projelerini dinamik olarak gösterir.
 *
 * @returns {JSX.Element} Projeler sayfası bileşeni
 *
 */
import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spin } from "antd";
import axios from "axios";
import cocukImage from "../../assets/cocuk.webp";
import ilimsehriImage from "../../assets/ilimsehri.webp";
import munacatImage from "../../assets/munacat.webp";
import { ProjectsSection, GithubProjectsSection, ProjectCard, GithubCard } from "./Projects.styles";
const { Meta } = Card;
// Yardımcı fonksiyon
const formatRepoTitle = (name) => name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
export const Projects = () => {
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get("https://api.github.com/users/yesilkaya/repos");
                setGithubRepos(response.data);
            }
            catch (error) {
                console.error("GitHub API hatası:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);
    const projectData = [
        {
            title: "Dualar",
            description: "Dualar uygulaması, günlük duaları ve ibadetleri takip etmenizi sağlar.",
            image: munacatImage,
        },
        {
            title: "İlim Şehri",
            description: "İlim Şehri uygulaması, çeşitli dini içerikler ve bilgiler sunar.",
            image: ilimsehriImage,
        },
        {
            title: "Çocuk Kitapları",
            description: "Çocuklar için eğitici ve eğlenceli kitaplar sunar.",
            image: cocukImage,
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(ProjectsSection, { children: [_jsx("h1", { style: {
                            color: "var(--text-color)",
                            marginBottom: "4rem",
                            fontSize: "4rem",
                        }, children: "Mobil Uygulamalar" }), _jsx(Row, { justify: "center", children: projectData.map((project, index) => (_jsx(Col, { xs: 24, sm: 12, md: 8, children: _jsx(ProjectCard, { hoverable: true, cover: _jsx("img", { alt: project.title, src: project.image }), highlight: index === 1, initial: { scale: index === 1 ? 1.2 : 1 }, whileHover: { scale: index === 1 ? 1.3 : 1.1 }, transition: { type: "spring", stiffness: 200 }, children: _jsx(Meta, { title: project.title, description: project.description }) }) }, index))) })] }), _jsxs(GithubProjectsSection, { children: [_jsx("h1", { style: {
                            color: "var(--text-color)",
                            marginBottom: "4rem",
                            fontSize: "4rem",
                        }, children: "Github Projeleri" }), loading ? (_jsx(Spin, { size: "large" })) : (_jsx(Row, { gutter: [24, 24], justify: "center", align: "stretch", children: githubRepos.map((repo) => (_jsx(Col, { xs: 24, sm: 12, md: 12, children: _jsxs(GithubCard, { title: _jsx("span", { style: {
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: "var(--primary-color)",
                                    }, children: formatRepoTitle(repo.name) }), bordered: false, children: [_jsx("div", { style: { flex: 1 }, children: _jsx("p", { style: { color: "var(--text-color)" }, children: repo.description || "Açıklama yok" }) }), _jsx(Button, { type: "primary", style: {
                                            width: "fit-content",
                                            alignSelf: "center",
                                            backgroundColor: "var(--primary-color)",
                                        }, onClick: () => window.open(repo.html_url, "_blank", "noopener,noreferrer"), children: "GitHub'da G\u00F6r" })] }) }, repo.id))) }))] })] }));
};
export default Projects;
//# sourceMappingURL=Projects.js.map