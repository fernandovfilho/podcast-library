import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PodcastDetails from './PodcastDetails';
import Main from './Main';

const Stack = createStackNavigator();

function PodcastStackRouter() {
    return (
        <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="PodcastDetails" component={PodcastDetails} />
        </Stack.Navigator>
        );
    }
    
    export default PodcastStackRouter;