import React, { useEffect } from "react";

import { Timeline, Card } from "antd";
import styled from "styled-components";
import { timelineData } from "../data/timelineData"; // yolu senin yapına göre ayarla
import Footer from "./Footer.jsx";

// Styled Card with hover & dark theme support
const ProjectsSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 0;
  max-width: 1200px;
  margin: 4rem auto;

  h1 {
    color: var(--text-color);
    text-align: center;
    margin-bottom: 4rem;
    font-size: 3rem;
  }
`;

const StyledCard = styled(Card)`
  background-color: var(--bg-color);
  border: 1px solid var(--primary-color);
  color: var(--text-color);

  .ant-card-head-title {
    color: var(--text-color);
  }

  .ant-card-body {
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
    width: 20px !important; /* Varsayılan genelde 14px civarıdır */
    height: 20px !important;
    margin-left: -10px !important; /* Ortalamak için genişliğin yarısının negatif margin'i */
    margin-top: -8px !important; /* Dikey hizalama için */
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
        <h1>Öğrenim Çizelgesi</h1>
        <CustomTimelineWrapper>
          <Timeline
            mode="alternate"
            items={timelineData.map((item) => ({
              children: (
                <StyledCard title={item.title + " (" + item.date + ")"}>
                  {item.description}
                </StyledCard>
              ),
            }))}
          />
        </CustomTimelineWrapper>
      </ProjectsSection>
    </>
  );
};

export default TimelineCom;
