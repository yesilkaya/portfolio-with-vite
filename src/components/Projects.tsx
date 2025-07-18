import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spin } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

import cocukImage from "../assets/cocuk.webp";
import ilimsehriImage from "../assets/ilimsehri.webp";
import munacatImage from "../assets/munacat.webp";

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

// Styled Components
const ProjectsSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProjectCard = styled(motion(Card)).withConfig({
  shouldForwardProp: (prop) => prop !== "highlight",
})<{ highlight?: boolean }>`
  background-color: var(--second-bg-color);
  color: var(--text-color);
  margin: 2rem 10%;
  height: 100%;

  ${(props) =>
    props.highlight &&
    `
      transform: scale(1.1);
      z-index: 1;
    `}

  .ant-card-cover {
    padding: 20%;
  }

  &:hover {
    border: 2px solid var(--primary-color);
  }

  .ant-card-cover img {
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 30px var(--primary-color);
  }

  .ant-card-meta-title,
  .ant-card-meta-description {
    color: white;
  }
`;

const GithubProjectsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const GithubCard = styled(motion(Card))`
  background: var(--bg-color);
  color: var(--text-color);
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
`;

// Yardımcı fonksiyon
const formatRepoTitle = (name: string) =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Projects: React.FC = () => {
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
