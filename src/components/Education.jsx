import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Card } from "antd";
import { motion } from "framer-motion";
import { timelineData } from "../data/timelineData";


const { Title, Paragraph, Text } = Typography;

// CSS-in-JS styled component for the timeline container
const EducationSection = styled.section`
  background-color: var(--second-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimelineDotTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: ${({ isLeft }) => (isLeft ? "row-reverse" : "")};
  gap: 20px;
`;

// Timeline vertical line center
const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--primary-color);
`;

const TimelineItemWrapper = styled.div`
  width: 50%;
  margin-bottom: 60px;
  margin-left: ${({ isLeft }) => (isLeft ? "-2.8%" : "53%")};
  margin-right: ${({ isLeft }) => (isLeft ? "0" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: ${({ isLeft }) => (isLeft ? "right" : "left")};
  padding-top: 20px;
`;

const TimelineDot = styled.div`
  margin-left: ${({ isLeft }) => (isLeft ? "20px" : "-7.5%")};
  margin-right: ${({ isLeft }) => (isLeft ? "-7.5%" : "20px")};
  height: 20px;
  width: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color),
    0 0 30px var(--primary-color);
  z-index: 2;
`;

// Styled Ant Design Card
const TimelineContent = styled(motion(Card))`
background: var(--bg-color);
`;

export default function Education() {
  return (
    <EducationSection id="education">
      <Title level={1} style={{ fontSize: "4rem", marginBottom: "4rem" ,color:"var(--text-color)"}}>
        Eğitim
      </Title>
      <div style={{ position: "relative", width: "100%", maxWidth: 1200 }}>
        <TimelineLine />

        {timelineData.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <TimelineItemWrapper key={i} isLeft={isLeft}>
              <TimelineDotTitle isLeft={isLeft}>
                <TimelineDot isLeft={isLeft} />
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

              <TimelineContent>
                <Text
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "var(--text-color)",
                  }}
                >
                  {item.title}
                </Text>
                <Paragraph
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    color: "var(--text-color)",
                  }}
                >
                  {item.description}
                </Paragraph>
              </TimelineContent>
            </TimelineItemWrapper>
          );
        })}
      </div>
    </EducationSection>
  );
}
