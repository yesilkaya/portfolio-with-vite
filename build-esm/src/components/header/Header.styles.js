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
  text-decoration: none !important;
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

  /* Link stilleri */
  .ant-menu-title-content a {
    color: var(--text-color);
    text-decoration: none !important;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  /* Hover ve selected underline kaldırma */
  .ant-menu-horizontal > .ant-menu-item::after,
  .ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
  }

  /* Yeni API ile gelen underline bar'ı sıfırla */
  .ant-menu-item::after,
  .ant-menu-submenu::after {
    border-bottom: none !important;
  }

  /* Active durumdaki mavi çizgiyi kaldırma */
  .ant-menu-horizontal .ant-menu-item-selected::after {
    border-bottom: none !important;
  }
`;
//# sourceMappingURL=Header.styles.js.map