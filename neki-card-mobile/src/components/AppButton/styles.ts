import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

type ButtonProps = TouchableOpacityProps & {
  appVariant: "primary" | "secondary" | "danger",
  disabled?: boolean,
}

export const Container = styled.View`
  width: 100%;

`

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border: ${(props) => {
    switch (props.appVariant) {
      case "primary":
        return `none`;
      case "secondary":
        return `2px solid ${props.theme["green-500"]}`;
      case "danger":
        return "none"
    }
  }};

  
${(props) =>
    props.appVariant === "primary" &&
    props.disabled &&
    css`
      background-color: ${(props) => props.theme["gray-400"]};
      color: ${(props) => props.theme["gray-200"]};
      cursor: not-allowed;
    `};
  
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `};

  background-color: ${(props) => {
    switch (props.appVariant) {
      case "primary":
        return props.theme["green-500"];
      case "secondary":
        return "transparent";
      case "danger":
        return props.theme["red-500"];
      default:
        return props.theme["green-500"];
    }
  }};


`;

export const ButtonTitle = styled.Text<ButtonProps>`
  color: ${(props) => {
    switch (props.appVariant) {
      case "primary":
        return props.theme["white"];
      case "secondary":
        return props.theme["green-500"];
      case "danger":
        return props.theme["white"];
      default:
        return props.theme["white"];
    }
  }};
`

