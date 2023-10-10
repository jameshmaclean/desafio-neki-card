import { defaultTheme } from "./src/styles/themes/default";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "react-native";
import { AuthContextProvider } from "./src/contexts/authContext";
import Toast from "react-native-toast-message";
import React from "react";
import { AppRoutes } from "./src/routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContextProvider>
        <AppRoutes />
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Toast />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
