import styled from "styled-components";
import { Typography, Card } from "antd";
const { Paragraph } = Typography;
import { motion } from "framer-motion";
export const EducationSection = styled.section `

  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TimelineWrapper = styled.div `
  position: relative;
  width: 100%;
  max-width: 1200px;
`;
export const TimelineLine = styled.div `
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--primary-color);
`;
export const ItemDescription = styled(Paragraph) `
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
`;
export const TimelineItemWrapper = styled.div `
  width: 50%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  text-align: ${({ isLeft }) => (isLeft ? "right" : "left")};
  margin-left: ${({ isLeft }) => (isLeft ? "-30px" : "auto")};
  margin-right: ${({ isLeft }) => (isLeft ? "auto" : "-30px")};
  align-items: ${({ isLeft }) => (isLeft ? "flex-end" : "flex-start")};

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    margin-left: 0;
    align-items: flex-start;
  }
`;
export const TimelineDotTitle = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-left: ${({ isLeft }) => (isLeft ? "0" : "-40px")};
  margin-right: ${({ isLeft }) => (isLeft ? "-40px" : "0")};
  gap: 20px;
  flex-direction: ${({ isLeft }) => (isLeft ? "row-reverse" : "row")};

  @media (max-width: 768px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;
export const TimelineDot = styled.div `
  height: 20px;
  width: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color),
    0 0 30px var(--primary-color);
  z-index: 2;
`;
export const TimelineContent = styled(motion(Card)) `
  background: var(--bg-color);
  width: 100%;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;
//# sourceMappingURL=Education.styles.js.map