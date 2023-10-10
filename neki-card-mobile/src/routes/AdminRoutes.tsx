import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Edit } from "../pages/Edit";
import { Collaborator } from "../pages/Collaborator";
import { createStackNavigator } from "@react-navigation/stack";

type AppRoutes = {
  home: undefined;
  edit: { collaboratorId: string };
  collaborator: { collaboratorId: string };
  newCollaborator: undefined;
};

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

export function AdminRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="edit" component={Edit} />
      <Screen name="collaborator" component={Collaborator} />
      <Screen name="newCollaborator" component={Register} />
    </Navigator>
  );
}
