import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PodcastListItem(props) {

        return(
        <TouchableOpacity
        onPress={ () => { props.navigation.navigate('PodcastDetails', { podcast: props.podcast }) } }
        style={styles.container}>
        <Image style={styles.podcastImage} resizeMode="cover" source={{ uri: props.podcast.image }} />
        <View style={styles.podcastInfo}>
            <Text style={styles.podcastName}>{ props.podcast.name }</Text>
            <Text style={styles.podcastAuthor}>{ props.podcast.author }</Text>
            <Text style={styles.podcastDescription}>{ props.podcast.description }</Text>
        </View>
        </TouchableOpacity>
        );

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 7,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
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
        height: 110
    },
    podcastName: {
        flexWrap: "wrap",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A87F7'
    },
    podcastDescription: {
        flexWrap: "wrap",
        flexShrink: 1,
        fontSize: 12,
        marginTop: 5
    },
    podcastAuthor: {
        marginTop: 5
    }
})
