import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";

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

const services = [
  {
    title: "Frontend Development",
    description:
      "TypeScript ile modern ve kullanıcı dostu arayüzler tasarlayarak, performans ve erişilebilirlik odaklı web uygulamaları geliştiriyorum. React, Vue veya Angular gibi popüler teknolojilerle etkileyici kullanıcı deneyimleri sunuyorum.",
  },
  {
    title: "Backend Development",
    description:
      "Node.js ile güvenli, ölçeklenebilir ve yüksek performanslı backend çözümleri oluşturuyorum. Veri tabanı yönetimi ve API tasarımı konularında tecrübemle projelerin sağlam temeller üzerine kurulmasını sağlıyorum.",
  },
  {
    title: "Fullstack Development",
    description:
      "Frontend ve backend becerilerimi birleştirerek, uçtan uca çalışan tam entegre web ve mobil uygulamalar geliştiriyorum. Proje gereksinimlerine uygun çözümler üreterek, esnek ve sürdürülebilir mimariler kuruyorum.",
  },
  {
    title: "Mobile Development",
    description:
      "Flutter kullanarak iOS ve Android platformlarında çapraz platform, yüksek performanslı mobil uygulamalar geliştiriyorum. Kullanıcı deneyimini ön planda tutarak, modern ve ölçeklenebilir mobil çözümler sunuyorum.",
  },
];

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
