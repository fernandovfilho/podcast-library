import React from 'react';
import { Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PodcastDetails(props){

    console.log('props', props.route.params.podcast)
    return (
    <SafeAreaView style={ styles.container }>
        <Text>{ 'kjfkd' }</Text>
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 27 : 0,
    }
})

export default PodcastDetails;