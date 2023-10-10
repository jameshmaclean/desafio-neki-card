import { TextInputProps } from "react-native";
import {
  Container,
  ErrorMessage,
  InputContainer,
  Label,
  NativeInput,
} from "./styles";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  errorMessage?: string | null;
  name: string;
};

export function AppInput({ errorMessage, name, placeholder, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <InputContainer>
        <NativeInput
          placeholder={placeholder}
          placeholderTextColor={theme["gray-500"]}
          {...rest}
        />
        <Label>{name}</Label>
      </InputContainer>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}
