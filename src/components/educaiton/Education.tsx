/**
 * @file Education.tsx
 * @description Eğitim geçmişini gösteren bileşen. Ant Design kullanılarak oluşturulmuş bir zaman çizelgesi içerir.
 * Her eğitim öğesi tarih, başlık ve açıklama içerir. Eğitim verileri ayrı bir dosyadan alınır.
 * 
 */
import { Typography } from "antd";
import { educationData } from "../../data/educationData";
import {
  EducationSection,
  TimelineWrapper,
  TimelineLine,
  ItemDescription,
  TimelineItemWrapper,
  TimelineDotTitle,
  TimelineDot,
  TimelineContent,
} from "./Education.styles";

const { Title, Text } = Typography;

const iconMap = ["🎓", "📚", "👨‍💻", "🏢"];

interface EducationItem {
  date: string;
  title: string;
  description: string;
}

export function Education() {
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
