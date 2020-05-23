import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Global from "../../config/Global";
import CurrentEpisodeContext from "../../contexts/CurrentEpisodeContext";

function EpisodeDetails(props) {
  const [isLoading, setLoading] = useState(false);
  const [episode, setEpisode] = useState({});
  const [podcast, setPodcast] = useState({});

  const { loadEpisode } = useContext(CurrentEpisodeContext);

  useEffect(() => {
    const podcast = props.route.params.podcast;
    const episode = props.route.params.episode;

    setEpisode(episode);
    setPodcast(podcast);

    props.navigation.setOptions({ title: "Episódio" });
  }, []);

  function _playSound() {
    setLoading(true);

    loadEpisode(episode);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar
          backgroundColor={Global.primaryColor}
          barStyle="light-content"
        />
        <Image
          style={styles.podcastImage}
          source={{ uri: episode.image ? episode.image : podcast.image }}
        />
        <TouchableOpacity
          style={styles.controlForm}
          activeOpacity={0.6}
          onPress={() => {
            _playSound();
          }}
        >
          {!isLoading && (
            <Icon style={styles.controlIcon} name="play" size={20} />
          )}
          {isLoading && <ActivityIndicator size="small" color="white" />}
        </TouchableOpacity>
        <Text style={styles.podcastDescription}>{episode.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  podcastImage: {
    height: 250,
    margin: 10,
    borderRadius: 12,
  },
  podcastDescription: {
    marginHorizontal: 15,
    marginVertical: 20,
    textAlign: "justify",
  },
  podcastEpisodes: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "purple",
    fontWeight: "bold",
  },
  controlForm: {
    marginTop: -40,
    backgroundColor: Global.primaryColor,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    borderRadius: 12,
    marginLeft: 20,
  },
  controlIcon: {
    color: "white",
    marginLeft: 5,
  },
  controlIconPause: {
    color: "white",
  },
});

export default EpisodeDetails;
