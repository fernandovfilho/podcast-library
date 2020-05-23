import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Slider,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Global from "../config/Global";
import CurrentEpisodeContext from "../contexts/CurrentEpisodeContext";
import Utils from "../utils";

function Player(props) {
  const [lockPosition, setLockPosition] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [sound, setSound] = useState(new Audio.Sound());
  const { episode } = useContext(CurrentEpisodeContext);

  useEffect(() => {
    const setupAudio = () => {
      Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        playsInSilentModeIOS: true,
      });
    };

    setupAudio();
    setOnPlayback();
  }, []);

  function setOnPlayback() {
    sound.setOnPlaybackStatusUpdate((status) => {
      handleUpdatePlayback(status, lockPosition);
    });
  }

  function handleUpdatePlayback(status, positioning) {
    if (!positioning) {
      setIsPlaying(status.isPlaying);
      setIsLoading(status.isBuffering);
      setDurationMillis(status.durationMillis);
      setPositionMillis(status.positionMillis);
    }
  }

  useEffect(() => {
    async function loadAudio() {
      if (episode.audio_url) {
        try {
          await sound.stopAsync();
        } catch (error) {}

        try {
          await sound.unloadAsync();
        } catch (error) {}

        await sound.loadAsync({ uri: episode.audio_url }, {}, false);
        await sound.playAsync();
      }
    }

    loadAudio();
  }, [episode]);

  async function _setNewPosition(position) {
    try {
      await sound.setPositionAsync(position);
      setLockPosition(false);
    } catch (error) {}
  }

  function _setPositioning(position) {
    setLockPosition(true);
    setPositionMillis(position);
  }

  function _playPauseSound() {
    try {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
    } catch (error) {}
  }

  return (
    <>
      <View style={styles.containerPlayer}>
        <View style={styles.episodeTitleContainer}>
          <Text style={styles.episodeTitle}>
            {episode.title ? episode.title : "Nenhum episódio escolhido"}
          </Text>
        </View>
        <View style={styles.controlsContainer}>
          <Text style={styles.timerLeft}>
            {positionMillis ? Utils.msConversion(positionMillis) : "00:00"}
          </Text>
          <Slider
            style={styles.playerSlider}
            minimumValue={0}
            maximumValue={durationMillis}
            value={positionMillis}
            minimumTrackTintColor="white"
            maximumTrackTintColor="black"
            thumbTintColor="white"
            onValueChange={(currentValue) => {
              _setPositioning(currentValue);
            }}
            onSlidingComplete={(currentValue) => {
              _setNewPosition(currentValue);
            }}
          />
          <Text style={styles.timerRight}>
            {durationMillis ? Utils.msConversion(durationMillis) : "00:00"}
          </Text>
          <View activeOpacity={0.7} style={styles.playerControl}>
            <TouchableOpacity
              onPress={() => {
                _playPauseSound();
              }}
            >
              {!isPlaying && !isLoading && (
                <Icon name="play" style={styles.controlIcon} size={25} />
              )}
              {isPlaying && !isLoading && (
                <Icon name="pause" style={styles.controlIcon} size={25} />
              )}
              {isLoading && <ActivityIndicator size="small" color="white" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerPlayer: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    height: Global.playerHeight,
    backgroundColor: Global.primaryColor,
    elevation: 2,
  },
  episodeTitleContainer: {},
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerLeft: {
    color: "white",
    fontSize: 10,
    marginLeft: 10,
    width: 50,
    textAlign: "right",
  },
  timerRight: {
    color: "white",
    fontSize: 10,
    width: 50,
  },
  episodeTitle: {
    color: "white",
    marginHorizontal: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  playerSlider: {
    marginHorizontal: 10,
    width: 180,
    height: 40,
  },
  playerControl: {
    alignItems: "center",
    flex: 1,
  },
  controlIcon: {
    color: "white",
    marginBottom: 5,
  },
});

export default Player;
