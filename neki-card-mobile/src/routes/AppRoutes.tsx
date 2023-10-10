import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useTheme } from "styled-components";
import { View } from "react-native";

export function AppRoutes() {
  const theme = useTheme();

  const { user } = useContext(AuthContext);
  console.log("ROUTES", user);

  return (
    <View
      style={{ flex: 1, backgroundColor: theme["gray-800"], paddingTop: 10 }}
    >
      <NavigationContainer>
        {user.id ? <AdminRoutes /> : <PublicRoutes />}
      </NavigationContainer>
    </View>
  );
}
