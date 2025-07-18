import React from "react";
import { Layout } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { navbar } from "../data/navbar";

const { Footer: AntFooter } = Layout;

const FooterContainer = styled(AntFooter)`
  background-color: var(--bg-color);
  text-align: center;
  padding: 20px 0;
`;

const SocialContainer = styled.div`
  margin-bottom: 10px;

  a {
    font-size: 24px;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    width: 40px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0 10px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: var(--primary-color);
      color: var(--bg-color);
      transform: scale(1.2) translateY(-5px);
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1.6;

  li {
    display: inline-block;
    padding: 0 20px;

    a {
      color: var(--text-color);
      border-bottom: 3px solid transparent;
      transition: 0.3s ease-in-out;

      &:hover {
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
      }
    }
  }
`;

const Copyright = styled.p`
  color: var(--text-color);
  font-size: 13px;
  margin-top: 10px;
`;

// NavbarItem tipini kullanmak istersen:
// interface NavbarItem {
//   key: string;
//   id: string;
//   label: string;
//   content: string;
//   type: "scroll" | "route";
//   route?: string;
// }

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialContainer>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined />
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined />
        </a>
      </SocialContainer>

      <LinkList>
        {navbar.slice(0, -1).map((section) => (
          <li key={section.id}>
            <Link
              to={section.type === "route" ? section.route ?? "/" : `/#${section.id}`}
              style={{ color: "var(--text-color)", textDecoration: "none" }}
            >
              {section.label}
            </Link>
          </li>
        ))}
      </LinkList>

      <Copyright>
        &copy; Created by <span>Seccad YEŞİLKAYA</span>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
