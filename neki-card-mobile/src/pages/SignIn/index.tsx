import { Container } from "./styles";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Image, ImageBackground, Text } from "react-native";
import Logo from "../../assets/logo.png";
import Toast from "react-native-toast-message";

type FormDataProps = {
  username: string;
  password: string;
};
const signUpSchema = yup.object({
  username: yup
    .string()
    .email("Email inválido")
    .required("Informe o email")
    .matches(
      /.*@(neki(-it)?\.com\.br)$/i,
      "O Email deve ser do domínio @neki.com.br ou @neki-it.com.br"
    ),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export function SignIn() {
  const { signIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSignIn(data: FormDataProps) {
    try {
      const response = await signIn(data.username, data.password);
      reset();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      console.log(error);
    }
  }
  return (
    <>
      <Container>
        <Image
          source={Logo}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
        <Text>Login</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Informe o e-mail" }}
          render={({ field: { onChange, value } }) => (
            <AppInput
              name="Email"
              placeholder="@neki.com.br ou @neki-it.com.br"
              errorMessage={errors.username?.message}
              onChangeText={onChange}
              keyboardType="email-address"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="Mínimo de 6 dígitos"
              name="Senha"
              secureTextEntry
              errorMessage={errors.password?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <AppButton
          appVariant="primary"
          title="Entrar"
          onPress={handleSubmit(handleSignIn)}
        />
      </Container>
    </>
  );
}
