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

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spin } from "antd";
import axios from "axios";

import cocukImage from "../../assets/cocuk.webp";
import ilimsehriImage from "../../assets/ilimsehri.webp";
import munacatImage from "../../assets/munacat.webp";
import { ProjectsSection, GithubProjectsSection, ProjectCard, GithubCard } from "./Projects.styles";

const { Meta } = Card;

interface Project {
  title: string;
  description: string;
  image: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}


// Yardımcı fonksiyon
const formatRepoTitle = (name: string) =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const Projects: React.FC = () => {
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<GithubRepo[]>(
          "https://api.github.com/users/yesilkaya/repos"
        );
        setGithubRepos(response.data);
      } catch (error) {
        console.error("GitHub API hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const projectData: Project[] = [
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

  return (
    <>
      <ProjectsSection>
        <h1
          style={{
            color: "var(--text-color)",
            marginBottom: "4rem",
            fontSize: "4rem",
          }}
        >
          Mobil Uygulamalar
        </h1>
        <Row justify="center">
          {projectData.map((project, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <ProjectCard
                hoverable
                cover={<img alt={project.title} src={project.image} />}
                highlight={index === 1}
                initial={{ scale: index === 1 ? 1.2 : 1 }}
                whileHover={{ scale: index === 1 ? 1.3 : 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Meta title={project.title} description={project.description} />
              </ProjectCard>
            </Col>
          ))}
        </Row>
      </ProjectsSection>

      <GithubProjectsSection>
        <h1
          style={{
            color: "var(--text-color)",
            marginBottom: "4rem",
            fontSize: "4rem",
          }}
        >
          Github Projeleri
        </h1>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[24, 24]} justify="center" align="stretch">
            {githubRepos.map((repo) => (
              <Col xs={24} sm={12} md={12} key={repo.id}>
                <GithubCard
                  title={
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "var(--primary-color)",
                      }}
                    >
                      {formatRepoTitle(repo.name)}
                    </span>
                  }
                  bordered={false}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "var(--text-color)" }}>
                      {repo.description || "Açıklama yok"}
                    </p>
                  </div>
                  <Button
                    type="primary"
                    style={{
                      width: "fit-content",
                      alignSelf: "center",
                      backgroundColor: "var(--primary-color)",
                    }}
                    onClick={() =>
                      window.open(repo.html_url, "_blank", "noopener,noreferrer")
                    }
                  >
                    GitHub'da Gör
                  </Button>
                </GithubCard>
              </Col>
            ))}
          </Row>
        )}
      </GithubProjectsSection>
    </>
  );
};

export default Projects;
