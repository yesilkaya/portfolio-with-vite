/**
 * @module Footer
 * 
 * @description
 * Bu bileşen, web sitesinin alt kısmında (footer) yer alan sosyal medya ikonları gösterir.
 * 
 * - Instagram, Facebook ve Twitter için ikonlu bağlantılar içerir.
 * - Sayfa içi veya rota tabanlı linkler, `navbar` verisinden dinamik olarak oluşturulur.
 * 
 * @returns {JSX.Element} Web uygulaması için stilize edilmiş bir footer bileşeni döner.
 * 
 */

import React from "react";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { navbar } from "../../data/navbar";
import {
  FooterContainer,
  SocialContainer,
  LinkList,
  Copyright,
} from "./Footer.styles";

export const Footer: React.FC = () => {
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
              to={
                section.type === "route"
                  ? section.route ?? "/"
                  : `/#${section.id}`
              }
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
