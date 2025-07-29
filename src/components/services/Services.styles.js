import styled from "styled-components";
import { Typography, Card } from "antd";
const { Title, Paragraph } = Typography;
import { motion } from "framer-motion";
export const ServiceCard = styled(motion(Card)) `
  background: var(--bg-color);
`;
// Styled Components
export const ServicesSection = styled.section `
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ServiceDescription = styled(Paragraph) `
  && {
    color: var(--text-color);
    font-size: 1rem;
  }
`;
export const ServiceTitle = styled(Title) `
  && {
    color: var(--text-color);
    font-size: 1.6rem;
  }
`;
export const SectionTitle = styled(Title) `
  && {
    color: var(--text-color);
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;
export const ServicesContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
//# sourceMappingURL=Services.styles.js.map