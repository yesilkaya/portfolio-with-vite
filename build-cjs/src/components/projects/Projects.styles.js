"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubCard = exports.GithubProjectsSection = exports.ProjectCard = exports.ProjectsSection = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const antd_1 = require("antd");
const framer_motion_1 = require("framer-motion");
// Styled Components
exports.ProjectsSection = styled_components_1.default.section `
  background-color: var(--second-bg-color);
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
exports.ProjectCard = (0, styled_components_1.default)(framer_motion_1.motion.create(antd_1.Card)) `
  background-color: var(--second-bg-color);
  color: var(--text-color);
  margin: 2rem 10%;
  height: 100%;

  ${(props) => props.highlight &&
    `
      transform: scale(1.1);
      z-index: 1;
    `}

  .ant-card-cover {
    padding: 20%;
  }

  &:hover {
    border: 2px solid var(--primary-color);
  }

  .ant-card-cover img {
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 30px var(--primary-color);
  }

  .ant-card-meta-title,
  .ant-card-meta-description {
    color: white;
  }
`;
exports.GithubProjectsSection = styled_components_1.default.section `
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
exports.GithubCard = (0, styled_components_1.default)(framer_motion_1.motion.create(antd_1.Card)) `
  background: var(--bg-color);
  color: var(--text-color);
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
`;
//# sourceMappingURL=Projects.styles.js.map