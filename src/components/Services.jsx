import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";
import { services } from "../data/servicesData"; 
const { Title, Paragraph } = Typography;

const ServicesSection = styled.section`
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceDescription = styled(Paragraph)`
  && {
    color: var(--text-color);
    font-size: 1rem;
  }
`;

const ServiceTitle = styled(Title)`
  && {
    color: var(--text-color);
    font-size: 1.6rem;
  }
`;

// Services title
const SectionTitle = styled(Title)`
  && {
    color: var(--text-color);
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;

// Container for service cards
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

// Styled Ant Design Card
const ServiceCard = styled(motion.create(Card))`
  background: var(--bg-color);
`;


export default function Services() {
  return (
    <ServicesSection id="services">
      <SectionTitle level={1}>Hizmetler</SectionTitle>
      <ServicesContainer>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ServiceTitle>{service.title} </ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesContainer>
    </ServicesSection>
  );
}
