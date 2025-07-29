import styled from "styled-components";
import { Card } from "antd";
import { motion } from "framer-motion";

interface ProjectCardProps {
  highlight?: boolean;
}

// Styled Components
export const ProjectsSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;


export const ProjectCard = styled(motion(Card))<ProjectCardProps>`
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

export const GithubProjectsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const GithubCard = styled(motion(Card))`
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
