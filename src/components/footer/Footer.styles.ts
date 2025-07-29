
import styled from 'styled-components';
import {Layout} from 'antd';
const { Footer: AntFooter } = Layout;

export const FooterContainer = styled(AntFooter)`
  background-color: var(--bg-color);
  text-align: center;
  padding: 20px 0;
`;

export const SocialContainer = styled.div`
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

export const LinkList = styled.ul`
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

export const Copyright = styled.p`
  color: var(--text-color);
  font-size: 13px;
  margin-top: 10px;
`;