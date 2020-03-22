import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PodcastDetails from './PodcastDetails';
import EpisodeDetails from './EpisodeDetails';
import Main from './Main';

const Stack = createStackNavigator();

function PodcastStackRouter() {
    return (
        <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="PodcastDetails" component={PodcastDetails} options={{headerBackTitle: 'Voltar', headerTintColor: 'white', headerStyle: { backgroundColor: 'purple' } }} />
        <Stack.Screen name="EpisodeDetails" component={EpisodeDetails} options={{headerBackTitle: 'Voltar', headerTintColor: 'white', headerStyle: { backgroundColor: 'purple' } }} />
        </Stack.Navigator>
        );
    }
    
    export default PodcastStackRouter;