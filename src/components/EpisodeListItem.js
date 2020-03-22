import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

export default function EpisodeListItem(props) {

        return(
        <TouchableOpacity
        onPress={() => { props.navigation.navigate('EpisodeDetails', { podcast: props.podcast, episode: props.episode }) }}
        style={styles.container}
        activeOpacity={0.7}>
        <View style={styles.podcastInfo}>
            <Text style={styles.podcastDate}>{ moment(props.episode.pub_date).format('DD/MM/YYYY HH:mm') }</Text>
            <Text style={styles.podcastName}>{ props.episode.title }</Text>
            <Text style={styles.podcastDescription}>{ props.episode.description }</Text>
        </View>
        </TouchableOpacity>
        );

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
        shadowOffset:{  width: 3,  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        flexDirection: 'row'
    },
    podcastImage: {
        width: 130 ,
        height: 130,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    podcastInfo: {
        margin: 10,
        flex: 1,
    },
    podcastName: {
        flexWrap: "wrap",
        fontSize: 14,
        fontWeight: 'bold',
        color: 'purple'
    },
    podcastDescription: {
        flexWrap: "wrap",
        flexShrink: 1,
        fontSize: 12,
        marginTop: 5
    },
    podcastDate: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    podcastAuthor: {
        marginTop: 5
    },
    controls: {
        marginTop: 10
    },
})
