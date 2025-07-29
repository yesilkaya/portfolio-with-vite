import styled from "styled-components";
import { Typography, Button } from "antd";
export const Container = styled.div ``;
export const Title = styled(Typography.Title) `
  margin-bottom: 0 !important;
  padding: 20px 30px 0 30px !important;
  color: var(--text-color) !important;
  font-size: 4rem !important;
  text-align: center !important;

  span {
    color: var(--primary-color);
  }
`;
export const StyledForm = styled.form `
  margin-top: 30px;
  padding: 0 30px 30px 30px;
`;
export const StyledButton = styled(Button) `
  background-color: var(--primary-color);
  color: var(--text-color);
  border-color: var(--primary-color);

  &:hover,
  &:focus {
    background-color: var(--primary-color);
    color: var(--text-color);
    border-color: var(--primary-color);
  }
`;
export const LabelSpan = styled.span `
  font-size: 1.2rem;
  color: var(--text-color);
`;
//# sourceMappingURL=Contact.styles.js.map