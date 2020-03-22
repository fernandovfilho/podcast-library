import React, { useEffect, useCallback } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Platform, Image, Text, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import EpisodeListItem from '../../components/EpisodeListItem';

import api from '../../services/api';
import Global from '../../config/Global';



function PodcastDetails(props){

    const [podcast, setPodcast] = React.useState({});
    const [episodes, setEpisodes] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    async function loadEpisodes(podcastData){
        
        setRefreshing(true);
        
        try {
            const episodes = await api.get(`/episodes/${podcastData.id}`);
            setRefreshing(false);
            setEpisodes(episodes.data);
            
        } catch (error) {
            console.log(error)
            setRefreshing(false);
            setEpisodes([]);
        }
        
        
    }


    const onRefresh = useCallback(() => {
        loadEpisodes(podcast);
    }, [refreshing]);

    useEffect(() => {
        
        const podcast = props.route.params.podcast;
        setPodcast(podcast);
        props.navigation.setOptions({ title: podcast.name.substring(0, 25) });
        loadEpisodes(podcast);
        
    }, []);

    return (
    <SafeAreaView style={ styles.container }>
        <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <StatusBar backgroundColor="purple" barStyle="light-content" />
            <Image style={styles.podcastImage} source={{ uri: podcast.image }}/>
            <Text style={styles.podcastDescription}>{ podcast.description }</Text>
            <Text style={styles.podcastEpisodes}>Episódios</Text>

            {episodes.length > 0 && episodes.map(episode => <EpisodeListItem key={episode.id} episode={episode} podcast={podcast} navigation={props.navigation} />)}

        </ScrollView>
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: Global.playerHeight,
    },
    podcastImage: {
        height: 220,
    },
    podcastDescription: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    podcastEpisodes: {
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 20,
        color: 'purple',
        fontWeight: 'bold',
    },
})

export default PodcastDetails;