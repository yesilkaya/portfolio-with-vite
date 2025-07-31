"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Education = Education;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @file Education.tsx
 * @description Eğitim geçmişini gösteren bileşen. Ant Design kullanılarak oluşturulmuş bir zaman çizelgesi içerir.
 * Her eğitim öğesi tarih, başlık ve açıklama içerir. Eğitim verileri ayrı bir dosyadan alınır.
 *
 */
const antd_1 = require("antd");
const educationData_1 = require("../../data/educationData");
const Education_styles_1 = require("./Education.styles");
const { Title, Text } = antd_1.Typography;
const iconMap = ["🎓", "📚", "👨‍💻", "🏢"];
function Education() {
    return ((0, jsx_runtime_1.jsxs)(Education_styles_1.EducationSection, { id: "education", children: [(0, jsx_runtime_1.jsx)(Title, { level: 1, style: {
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    marginBottom: "4rem",
                    color: "var(--text-color)",
                }, children: "E\u011Fitim" }), (0, jsx_runtime_1.jsxs)(Education_styles_1.TimelineWrapper, { children: [(0, jsx_runtime_1.jsx)(Education_styles_1.TimelineLine, {}), educationData_1.educationData.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        return ((0, jsx_runtime_1.jsxs)(Education_styles_1.TimelineItemWrapper, { "$isLeft": isLeft, children: [(0, jsx_runtime_1.jsxs)(Education_styles_1.TimelineDotTitle, { "$isLeft": isLeft, children: [(0, jsx_runtime_1.jsx)(Education_styles_1.TimelineDot, {}), (0, jsx_runtime_1.jsx)(Text, { style: {
                                                fontSize: "1.3rem",
                                                fontWeight: 700,
                                                color: "var(--text-color)",
                                            }, children: item.date })] }), (0, jsx_runtime_1.jsxs)(Education_styles_1.TimelineContent, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: i * 0.1 }, children: [(0, jsx_runtime_1.jsxs)(Text, { style: {
                                                fontSize: "1.6rem",
                                                fontWeight: 700,
                                                color: "var(--text-color)",
                                            }, children: [iconMap[i] || "📌", " ", item.title] }), (0, jsx_runtime_1.jsx)(Education_styles_1.ItemDescription, { children: item.description })] })] }, i));
                    })] })] }));
}
//# sourceMappingURL=Education.js.map