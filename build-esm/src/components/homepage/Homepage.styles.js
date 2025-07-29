// Home.styles.ts
import styled, { keyframes } from "styled-components";
import { Button } from "antd";
const blink = keyframes `
  50% { border-color: transparent; }
`;
export const HomeSection = styled.section `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  padding: 10rem 5%;
  flex-wrap: nowrap;
  background: var(--bg-color);
  min-height: 100vh;
`;
export const HomeContent = styled.div `
  h1 {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 1.5rem;
    color: var(--text-color);
  }
  h3 {
    font-size: 2rem;
    margin: 1rem 0 1.5rem 0;
    color: var(--text-color);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

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
export const ProfileImageWrapper = styled.div `
  width: 30%;
  max-width: 30%;
  border-radius: 50%;

  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 25px var(--primary-color);
    transition: 0.3s ease-in-out;

    &:hover {
      box-shadow:
        0 0 25px var(--primary-color),
        0 0 50px var(--primary-color),
        0 0 100px var(--primary-color);
      transform: scale(1.01);
    }
  }
`;
export const SocialIcons = styled.div `
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
export const StyledButton = styled(Button) `
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
//# sourceMappingURL=Homepage.styles.js.map