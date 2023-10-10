import { useEffect, useState } from "react";
import { AppCard } from "../../components/AppCard";
import { api } from "../../services/api";
import { userDTO } from "../Home";
import { Container } from "./styles";
import { Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppButton } from "../../components/AppButton";
type RouteParamProps = {
  collaboratorId: string;
};

export function Collaborator() {
  const [user, setUser] = useState<userDTO>({} as userDTO);
  const route = useRoute();
  const navigation = useNavigation();
  const { collaboratorId } = route.params as RouteParamProps;

  async function fetchUserDetails() {
    const data = await api.get("/collaborators/collaborator/" + collaboratorId);
    setUser(data.data);
  }

  useEffect(() => {
    fetchUserDetails();
    console.log(user);
  }, []);

  return (
    <Container>
      {user.id ? <AppCard user={user} /> : <Text>Não encontrado</Text>}
      <AppButton
        appVariant="secondary"
        title="Voltar para a tela inicial"
        onPress={() => {
          navigation.navigate("home");
        }}
      />
    </Container>
  );
}
