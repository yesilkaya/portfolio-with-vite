import React from "react";
import { services } from "../../data/servicesData";
import {
  ServicesSection,
  SectionTitle,
  ServicesContainer,
  ServiceCard,
  ServiceTitle,
  ServiceDescription,
} from "./Services.styles";

// Tip tanımı
interface Service {
  title: string;
  description: string;
}

export const Services: React.FC = () => {
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
