import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Platform, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';

function EpisodeDetails(props){
    
    
    const [podcast, setPodcast] = React.useState({});
    const [episode, setEpisode] = React.useState([]);
    const [playing, setPlaying] = React.useState(false);
    const [buffering, setBuffering] = React.useState(false);
    const [playbackInstance, setPlaybackInstance] = React.useState({});
    
    const soundObject = new Audio.Sound();
    
    
    const _configPlayer = async (episodeData) => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })
        setPlaybackInstance(new Audio.Sound());
        _startSoundBuffer(episodeData);
        
    }
    
    useEffect(() => {
        
        const podcast = props.route.params.podcast;
        const episode = props.route.params.episode;
        setPodcast(podcast);
        setEpisode(episode);
        props.navigation.setOptions({ title: 'Episódio' });
        
        _configPlayer(episode);
        
        
    }, []);
    
    const _startSoundBuffer = async (episodeData) => {
        try {
            
            await soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
            await soundObject.loadAsync({ uri: episodeData.audio_url });
            // Your sound is playing!
            alert('sound loaded')
        } catch (error) {
            console.log('error', error)
            alert('Erro ao carregar o episódio')
            // An error occurred!
        }
    }
    
    const _onPlaybackStatusUpdate = (status) => {
        setBuffering(status.isBuffering);
    }
    
    const _playPauseSound = async () => {
        
        try {
            
            if(playing){
                await soundObject.pauseAsync();
            }else{
                await soundObject.playAsync();
            }
            
            setPlaying(!playing);
            
        } catch (error) {
            console.log(error)
            alert('Erro ao executar')
        }
    }
    
    return (
        <SafeAreaView style={ styles.container }>
        <ScrollView>
        <StatusBar backgroundColor="purple" barStyle="light-content" />
        <Image style={styles.podcastImage} source={{ uri: episode.image ? episode.image : podcast.image }}/>
        <TouchableOpacity style={styles.controlForm} activeOpacity={0.6} onPress={_playPauseSound}>
        {buffering && <Icon style={styles.controlIcon} name="stop" size={30} />}
        {!playing && !buffering && <Icon style={styles.controlIcon} name="play" size={30} />}
        {playing && !buffering && <Icon style={styles.controlIcon} name="pause" size={30} />}
        </TouchableOpacity>
        <Text style={styles.podcastDescription}>{ episode.description }</Text>
        
        </ScrollView>
        
        </SafeAreaView>
        );
        
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        podcastImage: {
            height: 250,
        },
        podcastDescription: {
            marginHorizontal: 20,
            marginVertical: 20,
        },
        podcastEpisodes: {
            marginHorizontal: 10,
            marginBottom: 10,
            fontSize: 20,
            color: 'purple',
            fontWeight: 'bold',
        },
        controlForm: {
            marginTop: -40,
            backgroundColor: 'purple',
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8,
            shadowOffset:{  width: 3,  height: 3,  },
            shadowColor: 'black',
            shadowOpacity: 0.4,
            borderRadius: 40,
            marginLeft: 20,
        },
        controlIcon: {
            color: 'white',
            marginLeft: 7
        },
    })
    
    export default EpisodeDetails;