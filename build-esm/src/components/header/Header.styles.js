import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu } from "antd";
export const HeaderContainer = styled.header `
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
export const LogoLink = styled(Link) `
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;

  span {
    color: var(--primary-color);
  }
`;
export const CustomMenu = styled(Menu) `
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