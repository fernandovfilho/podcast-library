import React, { Component } from "react";
import { StyleSheet, View, Text, Slider, ActivityIndicator, AsyncStorage } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Global from "../config/Global";
import { Audio } from 'expo-av';
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';


export default class Player extends Component {

    state = { 
    episode: {},
    podcast: {},
    audio_url: null,
    isPlaying: false,
    isLoading: false,
    isLoaded: false,
    durationMillis: 1,
    positionMillis: 0,
    isPositioning: false,
    database: null
    };
    soundObject = new Audio.Sound;


    componentDidMount(){

        
        this._startComponent();
        
    }

    async _startComponent() {

        await AsyncStorage.setItem('currentAudio', '');
        await AsyncStorage.setItem('currentEpisodeTitle', '');
        this._loadAudioUrl();

    }

    _loadAudioUrl(){
        setInterval(async () => {
            try {

                AsyncStorage.getItem('currentAudio',(err, audio_url) => {

                    if(audio_url){
                        if(audio_url != this.state.audio_url){
                            this._setupAudio({ audio_url, play: true });
                            this.setState({ audio_url });
                        }
                    }

                });

                AsyncStorage.getItem('currentEpisodeTitle', (err, title) => {

                    if(title != this.state.episode.title){
                        this.setState({ episode: { title } })
                    }

                })


            } catch (error) {
                
            }
        }, 1000);
    }

    async _setupAudio(episodeData){

        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            playsInSilentModeIOS: true
        });

        try {
            

            this.soundObject.setOnPlaybackStatusUpdate(status => {
                try {
                    if(!this.state.isPositioning){
                    this.setState({
                        isPlaying: status.isPlaying,
                        isLoading: status.isBuffering,
                        isLoaded: status.isLoaded,
                        durationMillis: status.durationMillis,
                        positionMillis: status.positionMillis
                    });
                }
                } catch (error) {
                    
                }
                
            });

            try { await this.soundObject.stopAsync(); } catch (error) {}

            try { await this.soundObject.unloadAsync(); } catch (error) {}
            
            await this.soundObject.loadAsync({ uri: episodeData.audio_url }, {}, false);
            if(episodeData.play) await this.soundObject.playAsync();

        } catch (error) {
            alert('load error');
            console.log(error);
        }
        

    }

    _playPauseSound(){

        try {
            if(this.state.isPlaying){
                this.soundObject.pauseAsync();
            }else{
                this.soundObject.playAsync();
            }
        } catch (error) {
            
        }
        
        
    }

    async _setNewPosition(position){

        
        try {
            await this.soundObject.setPositionAsync(position);
            this.setState({ isPositioning: false });
        } catch (error) { }
        

    }

    _positioning(currentValue){

        this.setState({ isPositioning: true, positionMillis: currentValue });

    }
    
    render(){
        return (
            <>
            
            <View style={styles.containerPlayer}>
            <View style={styles.episodeTitleContainer}>
            <Text style={styles.episodeTitle}>{ this.state.episode.title ? this.state.episode.title : 'Nenhum episódio escolhido' }</Text>
            </View>
            <View style={styles.controlsContainer}>
            <Text style={styles.timerLeft}>{ this.state.positionMillis ? moment(this.state.positionMillis, 'x').format('HH:mm:ss') : '00:00:00' }</Text>
            <Slider
            style={styles.playerSlider}
            minimumValue={0}
            maximumValue={this.state.durationMillis}
            value={this.state.positionMillis}
            minimumTrackTintColor="white"
            maximumTrackTintColor="black"
            thumbTintColor="white"
            onValueChange={(currentValue) => { this._positioning(currentValue) }}
            onSlidingComplete={(currentValue) => { this._setNewPosition(currentValue) }}
            />
            <Text style={styles.timerRight}>{ this.state.durationMillis ? moment(this.state.durationMillis, 'x').format('HH:mm:ss') : '00:00:00' }</Text>
            <View activeOpacity={0.7} style={styles.playerControl}>
                <TouchableOpacity onPress={() => { this._playPauseSound() }}>
                    {!this.state.isPlaying && !this.state.isLoading && <Icon name="play" style={styles.controlIcon} size={25} />}
                    {this.state.isPlaying && !this.state.isLoading && <Icon name="pause" style={styles.controlIcon} size={25} />}
                    {this.state.isLoading && <ActivityIndicator size="small" color="white" />}
                </TouchableOpacity>
            </View>
            </View>
            </View>
            </>
            )
        }
        
    }
    
    const styles = StyleSheet.create({
        containerPlayer: {
            position: 'absolute',
            width: '100%',
            bottom: 50,
            height: Global.playerHeight,
            backgroundColor: 'purple',
            elevation: 2,
        },
        episodeTitleContainer: {
            
        },  
        controlsContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        timerLeft: {
            color: 'white',
            fontSize: 10,
            marginLeft: 10,
        },
        timerRight: {
            color: 'white',
            fontSize: 10,
        },
        episodeTitle: {
            color: 'white',
            marginHorizontal: 10,
            marginTop: 10,
            fontWeight: 'bold',
        },
        playerSlider: {
            marginHorizontal: 10,
            width: 180,
            height: 40,
        },
        playerControl: {
            alignItems: 'center',
            flex: 1,
        },
        controlIcon: {
            color: 'white',
            marginBottom: 5
        },
    })