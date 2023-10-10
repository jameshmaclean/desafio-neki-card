import { Controller, useForm } from "react-hook-form";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { Container, InputContainer } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { format, parse } from "date-fns";
import Toast from "react-native-toast-message";
import { api } from "../../services/api";

import { useNavigation, useRoute } from "@react-navigation/native";
import { userDTO } from "../Home";

type FormDataProps = {
  email: string;
  fullName: string;
  socialName?: string | "Não informado";
  telephone?: string | "Não informado";
  birthDate: string;
  linkedin?: string | "Não informado";
  facebook?: string | "Não informado";
  github?: string | "Não informado";
  instagram?: string | "Não informado";
};

const signUpSchema = yup.object({
  fullName: yup.string().required("O Nome completo é obrigatório"),
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

type RouteParamProps = {
  collaboratorId: string;
};

export function Edit() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { collaboratorId } = route.params as RouteParamProps;

  const [user, setUser] = useState<userDTO>({} as userDTO);

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
      fullName: "",
    },
  });
  useEffect(() => {
    async function fetchUserDetails() {
      const response = await api.get(
        "/collaborators/collaborator/" + collaboratorId
      );
      const user = response.data;
      console.log("USER", user);
      setUser(user);
      reset({
        email: user.email,
        birthDate: user.birthDate,
        facebook: user.facebook,
        github: user.gitHub,
        instagram: user.instagram,
        linkedin: user.linkedin,
        fullName: user.fullName,
        socialName: user.socialName,
        telephone: user.telephone,
      });
    }

    fetchUserDetails();
  }, [collaboratorId, reset]);

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
          text1: "top",
          text2: "green.500",
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  async function handleEditUserDetails(data: FormDataProps) {
    try {
      setIsLoading(true);
      const parsedDate = parse(data.birthDate, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      const collaborator = {
        email: data.email,
        birthDate: formattedDate,
        facebook: data.facebook || "Não informado",
        gitHub: data.github || "Não informado",
        fullName: data.fullName,
        instagram: data.instagram || "Não informado",
        linkedin: data.linkedin || "Não informado",
        socialName: data.socialName || "Não informado",
        telephone: data.telephone || "Não informado",
      };
      console.log("COLLABORATOR", collaborator);

      api.put(`/collaborators/collaborator/${user.id}`, collaborator);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("photo", selectedFile);
        api.put(`/collaborators/updateAvatar/${user.email}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      reset();
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setIsLoading(false);
    }
  }
  const navigation = useNavigation();
  return (
    <Container>
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
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="João Silva"
              name="Nome"
              errorMessage={errors.fullName?.message}
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
          title="Cadastrar"
          type="submit"
          disabled={isLoading}
          onPress={handleSubmit(handleEditUserDetails)}
        />
        <AppButton
          appVariant="secondary"
          title="Voltar para a tela inicial"
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </InputContainer>
    </Container>
  );
}
