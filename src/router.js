import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import FavoritesRoutes from "./pages/Favorites/routes";
import PodcastRoutes from "./pages/Podcasts/routes";

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
