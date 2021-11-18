import styled from "styled-components";
import { css } from "styled-components";

export const StyledButton = styled.button`
  border-radius: 8px;
  font-size: 16px;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.variant === "outlined"
      ? `${css} color: var(--gray1);
      border: solid 2px transparent;
      background-image: linear-gradient(var(--gray4), var(--gray4)), radial-gradient(circle at top left, #FF55BB, #FF4343);
      background-origin: border-box;
      background-clip: content-box, border-box;`
      : { background: "var(--gradient-1)", color: "#fff", border: "none" }}

  ${(props) =>
    props.size === "sm" && { width: "100%", maxWidth: "150px", height: "40px" }}
    ${(props) =>
    props.size === "md" && { width: "100%", maxWidth: "250px", height: "50px" }}
    ${(props) =>
    props.size === "lg" && { width: "100%", maxWidth: "650px", height: "60px" }}
    ${(props) => props.size === "us" && { width: "80px", height: "40px" }}


  :hover {
    ${(props) =>
      props.variant === "outlined"
        ? { background: "var(--gradient-1)", padding: "2px", border: "none" }
        : `${css} color: var(--gray1);
      border: solid 2px transparent;
      background-image: linear-gradient(var(--gray4), var(--gray4)), radial-gradient(circle at top left, #FF55BB, #FF4343);
      background-origin: border-box;
      background-clip: content-box, border-box;`}
  }

  ${(props) =>
    props.disabled && {
      pointerEvents: "none",
      background: "var(--gray2)",
    }}

  ${(props) =>
    props.loading && {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      fontSize: "0",
      background: "transparent",
      border: "3px solid #ff4554",
      borderStyle: "solid solid dotted dotted",
      animation: "rotate 1s infinite linear running",
      borderColor: "#ff4554 #ff4554 transparent #ff4554",
    }}
`;
