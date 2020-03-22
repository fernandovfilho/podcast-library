import React from 'react';
import 'react-native-gesture-handler';
import Router from './src/router';
import { View, Text, StyleSheet } from 'react-native';
import Player from './src/components/Player';

export default function App() {
  return (
    <>
    <Router/>
    <Player />
    </>
    );
  }
  
