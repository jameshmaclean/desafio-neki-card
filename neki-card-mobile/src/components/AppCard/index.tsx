import { useContext, useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  Text,
  InfoItem,
  Avatar,
  Detail,
  IconContainer,
  SectorHeader,
  DetailContainer,
} from "./styles";

import Ionicons from "@expo/vector-icons/Ionicons";

import { AuthContext } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { userDTO } from "../../pages/Home";

type AppCardProps = {
  user: userDTO;
  handleDelete?: (id: string) => Promise<void>;
};

export function AppCard({ user, handleDelete }: AppCardProps) {
  const [avatarUrl, setAvatarUrl] = useState("null");
  const theme = useTheme();
  const authenticatedUser = useContext(AuthContext);
  const navigate = useNavigation();

  useEffect(() => {
    setAvatarUrl(`http://10.0.2.2:8080/api/collaborators/avatar/${user.photo}`);
  }, [user]);

  function handleEditCollaborator(collaboratorId: string) {
    navigate.navigate("edit", { collaboratorId });
  }

  async function handleDeleteCollaborator(id: string) {
    if (handleDelete) {
      await handleDelete(id);
    }
  }
  function handleNavigateUser(collaboratorId: string) {
    navigate.navigate("collaborator", { collaboratorId });
  }

  return (
    <>
      <Container>
        <Header>
          <Avatar source={{ uri: avatarUrl }} />
          {authenticatedUser.user.id && (
            <IconContainer>
              <Ionicons
                name="create"
                size={15}
                color={theme["white"]}
                onPress={() => handleEditCollaborator(user.id)}
              />
              <Ionicons
                name="trash"
                size={15}
                color={theme["red-500"]}
                onPress={() => handleDeleteCollaborator(user.id)}
              />
              <Ionicons
                name="eye"
                size={15}
                color={theme["white"]}
                onPress={() => handleNavigateUser(user.id)}
              />
            </IconContainer>
          )}
          <Text>{user.fullName}</Text>

          <Detail>Nome social: {user.socialName}</Detail>
        </Header>
        <InfoItem>
          <Title>
            <SectorHeader>Informações pessoais</SectorHeader>
            <DetailContainer>
              <Ionicons name="at" size={18} color={"white"} />
              <Detail>{user.id}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="mail" size={18} color={"white"} />
              <Detail>{user.email}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="add" size={18} color={"white"} />
              <Detail>{user.birthDate}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="call" size={18} color={"white"} />
              <Detail>{user.telephone}</Detail>
            </DetailContainer>
          </Title>
          <Title>
            <SectorHeader>Redes Sociais</SectorHeader>
            <DetailContainer>
              <Ionicons name="logo-linkedin" size={18} color={"white"} />
              <Detail>{user.linkedin}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="logo-github" size={18} color={"white"} />
              <Detail>{user.gitHub}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="logo-instagram" size={18} color={"white"} />
              <Detail>{user.instagram}</Detail>
            </DetailContainer>
            <DetailContainer>
              <Ionicons name="logo-facebook" size={18} color={"white"} />
              <Detail>{user.facebook}</Detail>
            </DetailContainer>
          </Title>
        </InfoItem>
      </Container>
    </>
  );
}
