import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Container, ContentContainer, NavBar, NavText } from "./styles";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { AppCard } from "../../components/AppCard";

export type userDTO = {
  birthDate: string;
  facebook: string;
  fullName: string;
  id: string;
  email: string;
  gitHub: string;
  instagram: string;
  linkedin: string;
  photo: string;
  socialName: string;
  telephone: string;
};

export function Home() {
  const [users, setUsers] = useState<Array<userDTO>>([]);
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigation();

  function handleCollaboratorRegister() {
    navigate.navigate("newCollaborator");
  }
  async function fetchUsers() {
    const userData = await AsyncStorage.getItem("@NekiCard-USERDATA");
    if (userData) {
      const data = JSON.parse(userData);
      api.defaults.headers.common.Authorization = data.accessToken
        ? `Bearer ${data.accessToken}`
        : "";
      const response = await api.get("/collaborators");
      setUsers(response.data);
      console.log(response.data);
    }
  }
  async function handleDelete(id: string) {
    const newList = users.filter((user) => user.id != id);
    await api.delete("/collaborators/collaborator/" + id);
    setUsers(newList);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  return (
    <>
      <Container>
        <NavBar>
          <NavText onPress={handleCollaboratorRegister}>
            Cadastrar colaborador
          </NavText>
          <NavText onPress={signOut}>Logout</NavText>
        </NavBar>
      </Container>
      <ContentContainer>
        {users.map((user) => {
          return (
            <AppCard user={user} key={user.id} handleDelete={handleDelete} />
          );
        })}
      </ContentContainer>
    </>
  );
}
