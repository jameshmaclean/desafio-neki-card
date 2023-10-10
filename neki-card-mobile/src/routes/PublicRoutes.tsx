import { createStackNavigator } from "@react-navigation/stack";
import { Register } from "../pages/Register";
import { SignIn } from "../pages/SignIn";

type AuthRoutes = {
  signIn: undefined;
  collaborator: { collaboratorId: string };
};
const { Navigator, Screen } = createStackNavigator<AuthRoutes>();

export function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      {/* <Screen name="collaborator" component={Collaborator} /> */}
    </Navigator>
  );
}
