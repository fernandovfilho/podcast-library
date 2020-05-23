import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EpisodeDetails from "./EpisodeDetails";
import Main from "./Main";
import PodcastDetails from "./PodcastDetails";

const Stack = createStackNavigator();

function PodcastStackRouter() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PodcastDetails"
        component={PodcastDetails}
        options={{
          headerBackTitle: "Voltar",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#665EFF" },
        }}
      />
      <Stack.Screen
        name="EpisodeDetails"
        component={EpisodeDetails}
        options={{
          headerBackTitle: "Voltar",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#665EFF" },
        }}
      />
    </Stack.Navigator>
  );
}

export default PodcastStackRouter;
