// src/screens/FeedbackScreen/FeedbackScreen.styles.ts
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";
export const ScreenWrapper = styled.div `
  padding: 2rem;
  margin: 4rem;
  font-family: Arial, sans-serif;
  display: "flex",
  justifyContent: "center",
`;
export const Title = styled.h2 `
  text-align: center;
  color: white;
`;
export const LoginCard = styled(Card) `
  text-align: center;
  border-radius: 8px;
`;
export const LoginButton = styled.button `
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  
`;
export const LoadingText = styled.p `
  text-align: center;
  color: white;
`;
export const ContactList = styled.ul `
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: auto;
`;
export const ContactItem = styled.li `
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;
export const EditForm = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
  }

  button {
    margin-top: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
  }
`;
export const ActionButtons = styled.div `
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  gap: 0.5rem;
`;
export const MessageBox = styled.p `
  margin-bottom: 0.5rem;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.95rem;

  span {
    font-size: 0.75rem;
    color: #888;
  }
`;
export const NoMessage = styled.p `
  color: #888;
`;
export const NewMessageLink = styled(Link) `
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem; 
  border-radius: 4px;
  text-align: center;
  display: block;
  margin: 0 auto;
  width: fit-content;
  text-decoration: none;

  &:hover {
    background-color: var(--menu-selected-bg);
    color: white;
  }
`;
export const LogoutButton = styled.button `
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  margin: 0 auto;
  display: block;

`;
//# sourceMappingURL=Feedback.styles.js.map