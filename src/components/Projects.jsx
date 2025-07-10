import React, { useEffect, useState } from "react";

import { Row, Col, Card, Button } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import cocukImage from "../assets/cocuk.webp";
import ilimsehriImage from "../assets/ilimsehri.webp";
import munacatImage from "../assets/munacat.webp";
import Footer from "./Footer.jsx";
import { Spin } from "antd";
import axios from "axios"; // axios eklendi


const { Meta } = Card;

// Styled component for the Projects section
const ProjectsSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;  
  transition: transform 0.3s ease;
  text-align: center;
`;

const MotionCard = motion.create(Card);
const ProjectCard = styled(motion.create(Card)).withConfig({
  shouldForwardProp: (prop) => prop !== "highlight",
})`  
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
    border-radius: 50%; /* Tam yuvarlak */
    object-fit: cover; /* Taşmayı engelle */
    box-shadow: 0 0 30px var(--primary-color);
  }

  .ant-card-meta-title,
  .ant-card-meta-description {
    color: white; /* Metin rengini beyaz yapar */
  }
`;

const GithubProjectsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  text-align: center;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-height: auto;

  }

  .ant-card-head-title {
    color: var(--text-color);
    font-size: 1.5rem;
  }
`;

const formatRepoTitle = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Styled Ant Design Card
const GithubCard = styled(motion.create(Card))`
  background: var(--bg-color);
  color: var(--text-color);
  height: 100%; // ✔️ Yükseklik tamamen kullanılacak

  display: flex;
  flex-direction: column;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1; // ✔️ İçerik alanı büyüyebilir
  }
`;

const Projects = () => {
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
      } catch (error) {
        console.error("GitHub API hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const projectData = [
    {
      title: "Project 1",
      description: "Description of project 1",
      image: munacatImage,
    },
    {
      title: "Project 2",
      description: "Description of project 2",
      image: ilimsehriImage,
    },
    {
      title: "Project 3",
      description: "Description of project 3",
      image: cocukImage, // Yerel resim yolu
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
              <Col
                xs={24}
                sm={12}
                md={12}
                key={repo.id}
                style={{ display: "block" }}
              >
                <GithubCard title={<span style={{ 
      fontSize: "1.5rem", 
      fontWeight: "bold", 
      color: "var(--primary-color)" 
    }}>
      {formatRepoTitle(repo.name)}
    </span>} bordered={false} >
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "var(--text-color)" }}>
                      {repo.description || "Açıklama yok"}
                    </p>
                  </div>
                  <Button
                    type="primary"
                    style={{ width: "fit-content", alignSelf: "center" ,backgroundColor: "var(--primary-color)"}}
                    onClick={() =>
                      window.open(
                        repo.html_url,
                        "_blank",
                        "noopener,noreferrer"
                      )
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

      <Footer />
    </>
  );
};

export default Projects;
