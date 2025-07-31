"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineContent = exports.TimelineDot = exports.TimelineDotTitle = exports.TimelineItemWrapper = exports.ItemDescription = exports.TimelineLine = exports.TimelineWrapper = exports.EducationSection = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const antd_1 = require("antd");
const { Paragraph } = antd_1.Typography;
const framer_motion_1 = require("framer-motion");
exports.EducationSection = styled_components_1.default.section `

  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
exports.TimelineWrapper = styled_components_1.default.div `
  position: relative;
  width: 100%;
  max-width: 1200px;
`;
exports.TimelineLine = styled_components_1.default.div `
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--primary-color);
`;
exports.ItemDescription = (0, styled_components_1.default)(Paragraph) `
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
`;
exports.TimelineItemWrapper = styled_components_1.default.div `
  width: 50%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  text-align: ${({ $isLeft }) => ($isLeft ? "right" : "left")};
  margin-left: ${({ $isLeft }) => ($isLeft ? "-30px" : "auto")};
  margin-right: ${({ $isLeft }) => ($isLeft ? "auto" : "-30px")};
  align-items: ${({ $isLeft }) => ($isLeft ? "flex-end" : "flex-start")};

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    margin-left: 0;
    align-items: flex-start;
  }
`;
exports.TimelineDotTitle = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-left: ${({ $isLeft }) => ($isLeft ? "0" : "-40px")};
  margin-right: ${({ $isLeft }) => ($isLeft ? "-40px" : "0")};
  gap: 20px;
  flex-direction: ${({ $isLeft }) => ($isLeft ? "row-reverse" : "row")};

  @media (max-width: 768px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;
exports.TimelineDot = styled_components_1.default.div `
  height: 20px;
  width: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color),
    0 0 30px var(--primary-color);
  z-index: 2;
`;
exports.TimelineContent = (0, styled_components_1.default)(framer_motion_1.motion.create(antd_1.Card)) `
  background: var(--bg-color);
  width: 100%;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;
//# sourceMappingURL=Education.styles.js.map