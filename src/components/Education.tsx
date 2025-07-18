import React from "react";
import { Typography, Card } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import { educationData } from "../data/educationData";

const { Title, Paragraph, Text } = Typography;

const EducationSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--primary-color);
`;

const ItemDescription = styled(Paragraph)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
`;

const TimelineItemWrapper = styled.div<{ isLeft: boolean }>`
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

const TimelineDotTitle = styled.div<{ isLeft: boolean }>`
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

const TimelineDot = styled.div`
  height: 20px;
  width: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color),
    0 0 30px var(--primary-color);
  z-index: 2;
`;

const TimelineContent = styled(motion(Card))`
  background: var(--bg-color);
  width: 100%;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const iconMap = ["🎓", "📚", "👨‍💻", "🏢"];

// Eğitim verisi tipi
interface EducationItem {
  date: string;
  title: string;
  description: string;
}

export default function Education() {
  return (
    <EducationSection id="education">
      <Title
        level={1}
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          marginBottom: "4rem",
          color: "var(--text-color)",
        }}
      >
        Eğitim
      </Title>
      <TimelineWrapper>
        <TimelineLine />
        {educationData.map((item: EducationItem, i: number) => {
          const isLeft = i % 2 === 0;
          return (
            <TimelineItemWrapper key={i} isLeft={isLeft}>
              <TimelineDotTitle isLeft={isLeft}>
                <TimelineDot />
                <Text
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text-color)",
                  }}
                >
                  {item.date}
                </Text>
              </TimelineDotTitle>

              <TimelineContent
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Text
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "var(--text-color)",
                  }}
                >
                  {iconMap[i] || "📌"} {item.title}
                </Text>
                <ItemDescription>{item.description}</ItemDescription>
              </TimelineContent>
            </TimelineItemWrapper>
          );
        })}
      </TimelineWrapper>
    </EducationSection>
  );
}
