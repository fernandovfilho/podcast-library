import React, { useEffect, useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import store from "../../store";
import appActions from "../../appActions";

function EpisodeDetails(props) {
  const [isLoading, setLoading] = useState(false);
  const [episode, setEpisode] = useState({});
  const [podcast, setPodcast] = useState({});

  useEffect(() => {
    const podcast = props.route.params.podcast;
    const episode = props.route.params.episode;

    setEpisode(episode);
    setPodcast(podcast);

    props.navigation.setOptions({ title: "Episódio" });
  }, []);

  function _playSound() {
    props.dispatch(appActions.setEpisode(episode));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="purple" barStyle="light-content" />
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
    marginHorizontal: 20,
    marginVertical: 20,
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
    backgroundColor: "#665EFF",
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

export default connect((store) => ({ episode: store.episode }))(EpisodeDetails);
