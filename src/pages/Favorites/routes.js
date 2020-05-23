import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EpisodeDetails from "../Podcasts/EpisodeDetails";
import PodcastDetails from "../Podcasts/PodcastDetails";
import FavoritesList from "./FavoritesList";

const Stack = createStackNavigator();

function PodcastStackRouter() {
  return (
    <Stack.Navigator initialRouteName="FavoritesList">
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesList}
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
