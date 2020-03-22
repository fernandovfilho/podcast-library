import React, { Component } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Platform, Image, Text, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';


export default class EpisodeDetails extends Component {
    
    state = { episode: {}, podcast: {} };


    componentDidMount(){
        
        const podcast = this.props.route.params.podcast;
        const episode = this.props.route.params.episode;

        this.setState({ episode, podcast })
        
        this.props.navigation.setOptions({ title: 'Episódio' });
        
    }


    _playSound = () => {

        AsyncStorage.setItem('currentAudio', this.state.episode.audio_url);
        AsyncStorage.setItem('currentEpisodeTitle', this.state.episode.title);
        
    }
    
    render(){
        return (
            <SafeAreaView style={ styles.container }>
            <ScrollView>
            <StatusBar backgroundColor="purple" barStyle="light-content" />
            <Image style={styles.podcastImage} source={{ uri: this.state.episode.image ? this.state.episode.image : this.state.podcast.image }}/>
            <TouchableOpacity style={styles.controlForm} activeOpacity={0.6} onPress={() => { this._playSound() }}>
            <Icon style={styles.controlIcon} name="play" size={20} />
            </TouchableOpacity>
            <Text style={styles.podcastDescription}>{ this.state.episode.description }</Text>
            
            </ScrollView>
            
            </SafeAreaView>
            );
        }
        
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
            marginTop: -30,
            backgroundColor: 'purple',
            width: 60,
            height: 60,
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
            marginLeft: 5
        },
        controlIconPause: {
            color: 'white'
        }
    })
