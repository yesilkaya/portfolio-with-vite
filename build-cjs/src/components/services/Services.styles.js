"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesContainer = exports.SectionTitle = exports.ServiceTitle = exports.ServiceDescription = exports.ServicesSection = exports.ServiceCard = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const antd_1 = require("antd");
const { Title, Paragraph } = antd_1.Typography;
const framer_motion_1 = require("framer-motion");
exports.ServiceCard = (0, styled_components_1.default)(framer_motion_1.motion.create(antd_1.Card)) `
  background: var(--bg-color);
`;
// Styled Components
exports.ServicesSection = styled_components_1.default.section `
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
exports.ServiceDescription = (0, styled_components_1.default)(Paragraph) `
  && {
    color: var(--text-color);
    font-size: 1rem;
  }
`;
exports.ServiceTitle = (0, styled_components_1.default)(Title) `
  && {
    color: var(--text-color);
    font-size: 1.6rem;
  }
`;
exports.SectionTitle = (0, styled_components_1.default)(Title) `
  && {
    color: var(--text-color);
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;
exports.ServicesContainer = styled_components_1.default.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
//# sourceMappingURL=Services.styles.js.map