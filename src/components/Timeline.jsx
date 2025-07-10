import React, { useEffect } from "react";

import { Timeline, Card } from "antd";
import styled from "styled-components";
import { timelineData } from "../data/timelineData"; // yolu senin yapına göre ayarla
import Footer from "./Footer.jsx";

// Styled Card with hover & dark theme support
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

const StyledCard = styled(Card)`
  background-color: var(--bg-color);
  border: 1px solid var(--primary-color);
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    border-color: var(--primary-color);
  }

  .ant-card-head-title {
    color: var(--text-color);
    font-size: 1.rem;
  }

  .ant-card-body {
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.6;
  }
`;


const CustomTimelineWrapper = styled.div`
  .ant-timeline-item-tail {
    border-color: var(--primary-color) !important;
  }

  .ant-timeline-item-head {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    width: 20px !important;   /* Varsayılan genelde 14px civarıdır */
    height: 20px !important;
    margin-left: -10px !important; /* Ortalamak için genişliğin yarısının negatif margin'i */
    margin-top: -8px !important;   /* Dikey hizalama için */
    border-radius: 50%; /* Yuvarlak yap */
    box-shadow: 0 0 8px var(--primary-color); /* İstersen hafif glow efekti */
  }

  /* Sadece sol taraftaki item içeriklerine soldan margin */
  .ant-timeline-item:nth-child(odd) .ant-timeline-item-content {
    padding: 0 0 0 25px;

  }

  /* Sağdaki item içeriklerine sağdan margin */
  .ant-timeline-item:nth-child(even) .ant-timeline-item-content {
    padding: 0 30px 0 0;

  }
`;

const TimelineCom = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
    <ProjectsSection>
    <h1
    style={{
      color: "var(--text-color)",
      marginBottom: "4rem",
      fontSize: "4rem",
      textAlign: "center",
    }}
  >
    Öğrenim Çizelgesi
  </h1>
    <CustomTimelineWrapper>
      <Timeline
        mode="alternate"
        items={timelineData.map((item) => ({
          children: <StyledCard title={item.title + " ("+item.date+")"}>{item.description}</StyledCard>,
        }))}
      />
    </CustomTimelineWrapper>
    </ProjectsSection>
    <Footer />
    </>

  );
};

export default TimelineCom;
