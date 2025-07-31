import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @file Education.tsx
 * @description Eğitim geçmişini gösteren bileşen. Ant Design kullanılarak oluşturulmuş bir zaman çizelgesi içerir.
 * Her eğitim öğesi tarih, başlık ve açıklama içerir. Eğitim verileri ayrı bir dosyadan alınır.
 *
 */
import { Typography } from "antd";
import { educationData } from "../../data/educationData";
import { EducationSection, TimelineWrapper, TimelineLine, ItemDescription, TimelineItemWrapper, TimelineDotTitle, TimelineDot, TimelineContent, } from "./Education.styles";
const { Title, Text } = Typography;
const iconMap = ["🎓", "📚", "👨‍💻", "🏢"];
export function Education() {
    return (_jsxs(EducationSection, { id: "education", children: [_jsx(Title, { level: 1, style: {
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    marginBottom: "4rem",
                    color: "var(--text-color)",
                }, children: "E\u011Fitim" }), _jsxs(TimelineWrapper, { children: [_jsx(TimelineLine, {}), educationData.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        return (_jsxs(TimelineItemWrapper, { "$isLeft": isLeft, children: [_jsxs(TimelineDotTitle, { "$isLeft": isLeft, children: [_jsx(TimelineDot, {}), _jsx(Text, { style: {
                                                fontSize: "1.3rem",
                                                fontWeight: 700,
                                                color: "var(--text-color)",
                                            }, children: item.date })] }), _jsxs(TimelineContent, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: i * 0.1 }, children: [_jsxs(Text, { style: {
                                                fontSize: "1.6rem",
                                                fontWeight: 700,
                                                color: "var(--text-color)",
                                            }, children: [iconMap[i] || "📌", " ", item.title] }), _jsx(ItemDescription, { children: item.description })] })] }, i));
                    })] })] }));
}
//# sourceMappingURL=Education.js.map