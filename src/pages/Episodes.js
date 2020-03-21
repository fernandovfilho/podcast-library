import React from 'react';
import { Text, SafeAreaView, StyleSheet, Platform } from 'react-native';

function Episodes({ navigation }){

    return (
    <SafeAreaView style={ styles.container }>
        <Text>Episodes page</Text>
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 27 : 0,
    }
})

export default Episodes;