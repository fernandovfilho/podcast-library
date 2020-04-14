import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PodcastRoutes from "./pages/Podcasts/routes";
import FavoritesRoutes from "./pages/Favorites/routes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Podcasts":
                iconName = "ios-headset";
                break;
              case "Favoritos":
                iconName = "ios-heart";
                break;
              default:
                iconName = "ios-alert";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "gray",
          style: {
            backgroundColor: "#2A2E43",
            borderTopWidth: 0,
          },
          labelStyle: {
            marginTop: -7,
            marginBottom: 7,
          },
        }}
      >
        <Tab.Screen name="Podcasts" component={PodcastRoutes} />
        <Tab.Screen name="Favoritos" component={FavoritesRoutes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
