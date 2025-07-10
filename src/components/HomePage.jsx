import { Button } from "antd";
import styled, { keyframes } from "styled-components";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import profileImage from "../assets/seccad.png";
import React, { useEffect, useState } from "react";

const blink = keyframes`
  50% { border-color: transparent; }
`;

const HomeSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10rem;
  padding: 10rem 5%;
  flex-wrap: nowrap;
  background: var(--bg-color);
`;

const HomeContent = styled.div`
  h1 {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 1.5rem;
    color: var(--text-color);
  }
  h3 {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    display: -webkit-box; /* Flexbox benzeri bir kutu modeli */
    -webkit-box-orient: vertical; /* Dikey eksende hizalama */
    text-overflow: ellipsis; /* Taşan metni "..." ile göster */

    span {
      border-right: 2px solid var(--primary-color);
      animation: ${blink} 0.7s step-end infinite;
      display: inline-block;
      white-space: nowrap;
      font-family: "Courier New", Courier, monospace;
      color: var(--primary-color);
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.8;
    max-width: 1000px;
    color: var(--text-color);
  }
`;

const ProfileImageWrapper = styled.div`
  width: 30%; /* sabit genişlik */
  max-width: 30%;
  border-radius: 50%;

  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 25px var(--primary-color);
    transition: 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 0 25px var(--primary-color), 0 0 50px var(--primary-color),
        0 0 100px var(--primary-color);
      transform: scale(1.01);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;

  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    border: 2px solid var(--primary-color);
    border-radius: 30%;
    color: var(--primary-color);
    transition: 300ms ease-in-out;

    &:hover {
      background-color: var(--primary-color);
      color: var(--bg-color);
      transform: scale(1.2) translateY(-5px);
    }
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1.2rem 2rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: var(--primary-color);
    color: var(--text-color);
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 0 10px var(--primary-color);
  }
`;

const Home = () => {
  const texts = ["Full-Stack Geliştiriciyim", "Mobil Uygulama Geliştiriciyim"];

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      }, 200);
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
          setDisplayedText(
            currentText.substring(
              0,
              Math.min(charIndex + 1, currentText.length)
            )
          );
          setCharIndex((prev) => Math.min(prev + 1, currentText.length));
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const socialLinks = [
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
            <a key={i} href={url} target="_blank" rel="noreferrer">
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
