import { Controller, useForm } from "react-hook-form";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { Container, InputContainer, Title } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { format, parse } from "date-fns";
import Toast from "react-native-toast-message";
import { api } from "../../services/api";
import { Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

type FormDataProps = {
  email: string;
  name: string;
  socialName?: string | "Não informado";
  telephone?: string | "Não informado";
  birthDate: string;
  linkedin?: string | "Não informado";
  facebook?: string | "Não informado";
  github?: string | "Não informado";
  instagram?: string | "Não informado";
};

const signUpSchema = yup.object({
  name: yup.string().required("O Nome completo é obrigatório"),
  socialName: yup.string(),
  email: yup
    .string()
    .email("Email inválido")
    .required("O Email é obrigatório")
    .matches(
      /.*@(neki(-it)?\.com\.br)$/i,
      "O Email deve ser do domínio @neki.com.br ou @neki-it.com.br"
    ),

  telephone: yup.string(),

  birthDate: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "A Data de Nascimento deve estar no formato dd/mm/yyyy"
    )
    .required("A Data de Nascimento é obrigatória"),

  linkedin: yup.string(),

  facebook: yup.string(),

  github: yup.string(),

  instagram: yup.string(),
});

export function Register() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      birthDate: "",
      name: "",
    },
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return Toast.show({
            type: "success",
            text1: "top",
            text2: "green.500",
          });
        }
        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoPhile = {
          name: fileExtension,
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setSelectedFile(photoPhile);
        Toast.show({
          type: "success",
          text1: "Imagem selecionada",
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSubmitData(data: FormDataProps) {
    try {
      setIsLoading(true);
      const parsedDate = parse(data.birthDate, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      const collaborator = {
        email: data.email,
        birthDate: formattedDate,
        facebook: data.facebook || "Não informado",
        gitHub: data.github || "Não informado",
        fullName: data.name,
        instagram: data.instagram || "Não informado",
        linkedin: data.linkedin || "Não informado",
        socialName: data.socialName || "Não informado",
        telephone: data.telephone || "Não informado",
      };
      const encodedEmail = encodeURIComponent(data.email);

      const response = await api.post("/collaborators/register", collaborator);
      const formData = new FormData();
      if (selectedFile && response.status == 201) {
        formData.append("photo", selectedFile);
        console.log(selectedFile);
        await api.post(
          `/collaborators/registerAvatar/${encodedEmail}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      reset();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response.data,
      });
    } finally {
      setIsLoading(false);
    }
  }
  const navigation = useNavigation();
  return (
    <Container>
      <Title>Cadastrar novo colaborador</Title>
      <InputContainer>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Informe o e-mail" }}
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="@neki.com.br ou @neki-it.com.br"
              name="E-mail"
              errorMessage={errors.email?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="João Silva"
              name="Nome"
              errorMessage={errors.name?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="socialName"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="Nome social"
              name="Nome social"
              errorMessage={errors.socialName?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="telephone"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="21998558754"
              name="Telefone"
              errorMessage={errors.telephone?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="dd/mm/yyyy"
              name="Data de Nascimento"
              errorMessage={errors.birthDate?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <AppButton
          title={selectedFile ? "Alterar foto" : "Escolher foto"}
          style={{ marginBottom: 20 }}
          onPress={handleUserPhotoSelect}
        />

        <Controller
          control={control}
          name="linkedin"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="linkedin.com/in/"
              name="Linkedin"
              errorMessage={errors.linkedin?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="facebook"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="facebook.com/"
              name="Facebook"
              errorMessage={errors.facebook?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="github"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="github.com/"
              name="Github"
              errorMessage={errors.github?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="instagram"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="instagram.com/"
              name="Instagram"
              errorMessage={errors.instagram?.message}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <AppButton
          appVariant="primary"
          title="Cadastrar"
          type="submit"
          disabled={isLoading}
          onPress={handleSubmit(handleSubmitData)}
        />
        <AppButton
          appVariant="secondary"
          title="Voltar para a tela inicial"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </InputContainer>
    </Container>
  );
}
