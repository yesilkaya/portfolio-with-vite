"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelSpan = exports.StyledButton = exports.StyledForm = exports.Title = exports.Container = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const antd_1 = require("antd");
exports.Container = styled_components_1.default.div ``;
exports.Title = (0, styled_components_1.default)(antd_1.Typography.Title) `
  margin-bottom: 0 !important;
  padding: 20px 30px 0 30px !important;
  color: var(--text-color) !important;
  font-size: 4rem !important;
  text-align: center !important;

  span {
    color: var(--primary-color);
  }
`;
exports.StyledForm = styled_components_1.default.form `
  margin-top: 30px;
  padding: 0 30px 30px 30px;
`;
exports.StyledButton = (0, styled_components_1.default)(antd_1.Button) `
  background-color: var(--primary-color);
  color: var(--text-color);
  border-color: var(--primary-color);

  &:hover,
  &:focus {
    background-color: var(--primary-color);
    color: var(--text-color);
    border-color: var(--primary-color);
  }
`;
exports.LabelSpan = styled_components_1.default.span `
  font-size: 1.2rem;
  color: var(--text-color);
`;
//# sourceMappingURL=Contact.styles.js.map