import stripTags from "@ramumb/strip-tags";
import * as SQLite from "expo-sqlite";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as rssParser from "react-native-rss-parser";
import Icon from "react-native-vector-icons/FontAwesome";
import EpisodeListItem from "../../components/EpisodeListItem";
import Global from "../../config/Global";

const db = SQLite.openDatabase("podcastDb.db");

function PodcastDetails(props) {
  const [podcast, setPodcast] = React.useState({});
  const [episodes, setEpisodes] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  function saveToFavorites(podcastData) {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into favorites_podcasts (id, feed_url, name, description, author, image)
            values
            (${podcastData.id}, '${podcastData.feed_url}', '${podcastData.name}', '${podcastData.description}', '${podcastData.author}', '${podcastData.image}')
            `,
        [],
        (result) => {
          setFavorite(true);
        },
        (error) => {}
      );
    });
  }

  function removeToFavorites(podcastData) {
    db.transaction((tx) => {
      tx.executeSql(`delete from favorites_podcasts where id = ?;`, [
        podcastData.id,
      ]);
    });

    setFavorite(false);
  }

  function verifyFavorite(podcastData) {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from favorites_podcasts where id = ?",
        [podcastData.id],
        (_, { rows }) => {
          setFavorite(rows._array.length > 0);
        }
      );
    });
  }

  async function loadEpisodes(podcastData) {
    setRefreshing(true);

    const response = await fetch(podcastData.feed_url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData));

    try {
      let items = response.items.map((item) => {
        let audio_url = "";
        item.enclosures.forEach((enclosure) => {
          audio_url = enclosure.url;
        });

        return {
          id: item.id,
          title: item.title,
          pub_date: item.published,
          image: item.itunes.image,
          description: stripTags(item.description),
          audio_url,
        };
      });

      setEpisodes(items);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
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
    verifyFavorite(podcast);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar backgroundColor="#665EFF" barStyle="light-content" />
        <Image style={styles.podcastImage} source={{ uri: podcast.image }} />
        {!favorite && (
          <TouchableOpacity
            style={styles.controlForm}
            activeOpacity={0.6}
            onPress={() => {
              saveToFavorites(podcast);
            }}
          >
            <Icon style={styles.controlIcon} name="heart" size={25} />
          </TouchableOpacity>
        )}
        {favorite && (
          <TouchableOpacity
            style={styles.controlFormActive}
            activeOpacity={0.6}
            onPress={() => {
              removeToFavorites(podcast);
            }}
          >
            <Icon style={styles.controlIconActive} name="heart" size={25} />
          </TouchableOpacity>
        )}
        <Text style={styles.podcastDescription}>{podcast.description}</Text>
        <Text style={styles.podcastEpisodes}>Episódios</Text>

        {episodes.length > 0 &&
          episodes.map((episode) => (
            <EpisodeListItem
              key={episode.id}
              episode={episode}
              podcast={podcast}
              navigation={props.navigation}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Global.playerHeight,
  },
  podcastImage: {
    height: 220,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
  },
  podcastDescription: {
    marginHorizontal: 10,
    marginVertical: 20,
    color: "#454F63",
  },
  podcastEpisodes: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "#665EFF",
    fontWeight: "bold",
  },
  controlForm: {
    marginTop: -40,
    backgroundColor: "#FFFFFF",
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
  controlFormActive: {
    marginTop: -40,
    backgroundColor: "#FFFFFF",
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
    color: "gray",
  },
  controlIconActive: {
    color: "red",
  },
  controlIconPause: {
    color: "white",
  },
});

export default PodcastDetails;
