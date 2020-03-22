import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PodcastRoutes from './pages/Podcast/routes';

import Main from './pages/Podcast/Main';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

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
                    iconName = 'ios-headset'
                    break;
                    case "Busca":
                    iconName = 'ios-search'
                    break;
                    case "Favoritos":
                    iconName = 'ios-heart'
                    break;
                    default:
                    iconName = 'ios-alert'
                    break;
                }
                
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'purple',
            inactiveTintColor: 'gray',
            labelStyle: {
                marginTop: -7,
                marginBottom: 7
            }
        }}
        >
        <Tab.Screen name="Podcasts" component={PodcastRoutes} />
        <Tab.Screen name="Busca" component={Search} />
        <Tab.Screen name="Favoritos" component={Favorites} />
        </Tab.Navigator>
        </NavigationContainer>
        );
    }