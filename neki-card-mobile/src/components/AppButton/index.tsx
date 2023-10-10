import { TouchableOpacityProps, Text } from "react-native";
import { Button, ButtonTitle, Container } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  appVariant?: "primary" | "secondary" | "danger";
  title: string;
  type?: "submit" | "button" | "reset" | undefined;
};

export function AppButton({ title, type = "submit", ...rest }: ButtonProps) {
  return (
    <Container>
      <Button {...rest}>
        <ButtonTitle {...rest}>{title}</ButtonTitle>
      </Button>
    </Container>
  );
}
