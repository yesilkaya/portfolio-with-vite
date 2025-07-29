/**
 * @component
 * @description
 * Uygulamanın üst kısmında yer alan header bar bileşeni.
 * 
 * - Logo ve isim içerir.
 * - `navbar` dizisinden gelen menü öğelerini yatay bir menü olarak gösterir.
 * - Menü öğeleri ya sayfa içi (scroll) bağlantısı ya da route yönlendirmesi sağlar.
 * 
 * @returns {JSX.Element} Header bar bileşeni
 * 
 */
import React from "react";
import { navbar } from "../../data/navbar";
import {
  HeaderContainer,
  LogoLink,
  CustomMenu,
} from "./Header.styles";

import { Link } from "react-router-dom";

export const HeaderBar: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoLink to="/#home">
        Seccad <span>YEŞİLKAYA</span>
      </LogoLink>

      <CustomMenu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "flex-end", display: "flex", backgroundColor: "transparent", borderBottom: "none" }}
        items={navbar.map((section) => ({
          key: section.key,
          label: (
            <Link
              to={
                section.type === "route"
                  ? section.route ?? "/"
                  : `/#${section.id}`
              }
            >
                <span style={{ color: 'var(--text-color)' }}>{section.label}</span>
            </Link>
          ),
        }))}
      />
    </HeaderContainer>
  );
};


