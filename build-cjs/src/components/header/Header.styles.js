"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMenu = exports.LogoLink = exports.HeaderContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const antd_1 = require("antd");
exports.HeaderContainer = styled_components_1.default.header `
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
`;
exports.LogoLink = (0, styled_components_1.default)(react_router_dom_1.Link) `
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;

  span {
    color: var(--primary-color);
  }
`;
exports.CustomMenu = (0, styled_components_1.default)(antd_1.Menu) `
  flex: 1;
  justify-content: flex-end;
  display: flex;
  background-color: transparent;
  border-bottom: none;

  .ant-menu-title-content a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .ant-menu-item-selected a {
    color: var(--primary-color);
  }
`;
//# sourceMappingURL=Header.styles.js.map