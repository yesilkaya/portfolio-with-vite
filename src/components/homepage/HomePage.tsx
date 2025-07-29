/**
 * @module HomePage
 * @description
 * Ana sayfanın "Home" bölümü için React fonksiyonel bileşen.
 * 
 * - Kişisel tanıtım metni içerir.
 * - Yazı animasyonu (yazma ve silme efektli) ile farklı tanımlamalar gösterir.
 * - Sosyal medya ikonları ve ilgili bağlantılar bulunur.
 * - Profil fotoğrafı ve CV indirme butonu içerir.
 * 
 * @returns {JSX.Element} Ana sayfa "Home" bölümü bileşeni
 */

import React, { useEffect, useState } from "react";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import profileImage from "../../assets/seccad.png";
import {
  HomeSection,
  HomeContent,
  ProfileImageWrapper,
  SocialIcons,
  StyledButton,
} from "./Homepage.styles";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

export const Home: React.FC = () => {
  const texts: string[] = [
    "bir fullstack geliştiriciyim",
    "bir mobil geliştiriciyim",
  ];

  const [displayedText, setDisplayedText] = useState<string>("");
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex === currentText.length) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex === 0) {
      const pause = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 100);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayedText(
            currentText.substring(0, Math.max(charIndex - 1, 0))
          );
          setCharIndex((prev) => Math.max(prev - 1, 0));
        } else {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => Math.min(prev + 1, currentText.length));
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const socialLinks: SocialLink[] = [
    { icon: <InstagramOutlined />, url: "https://instagram.com" },
    { icon: <FacebookOutlined />, url: "https://facebook.com" },
    { icon: <TwitterOutlined />, url: "https://twitter.com" },
  ];

  return (
    <HomeSection id="home">
      <HomeContent>
        <h1>Merhaba, ben Seccad</h1>
        <h3>
          Ben,{" "}
          <span aria-live="polite" className="animated-text">
            {displayedText}
          </span>
        </h3>

        <p>
          Flutter ile mobil uygulama geliştirmenin yanı sıra son dönemde Node.js
          ve TypeScript ile backend geliştirmeye odaklanarak full-stack alanda
          kendimi geliştiriyorum. Kullanıcı odaklı, hızlı ve modern uygulamalar
          üretmeyi seviyorum. Hem mobilde hem sunucu tarafında daha iyi çözümler
          sunabilmek için öğrenmeye ve üretmeye devam ediyorum.
        </p>

        <SocialIcons>
          {socialLinks.map(({ icon, url }, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={url}
            >
              {icon}
            </a>
          ))}
        </SocialIcons>

        <a href="/files/seccadCv.pdf" download="SeccadYesilkayaCV.pdf">
          <StyledButton>CV İndir</StyledButton>
        </a>
      </HomeContent>

      <ProfileImageWrapper>
        <img src={profileImage} alt="Seccad" />
      </ProfileImageWrapper>
    </HomeSection>
  );
};

export default Home;
