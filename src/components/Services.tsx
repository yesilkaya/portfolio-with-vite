import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";
import { services } from "../data/servicesData";

const { Title, Paragraph } = Typography;

// Tip tanımı
interface Service {
  title: string;
  description: string;
}

// Styled Components
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

const SectionTitle = styled(Title)`
  && {
    color: var(--text-color);
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Ant Design + Framer Motion birleşimi için Card bileşenine motion türü uygulanıyor
const ServiceCard = styled(motion(Card))`
  background: var(--bg-color);
`;

const Services: React.FC = () => {
  return (
    <ServicesSection id="services">
      <SectionTitle level={1}>Hizmetler</SectionTitle>
      <ServicesContainer>
        {services.map((service: Service, index: number) => (
          <ServiceCard
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;
