import * as SQLite from "expo-sqlite";
import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Global from "../../config/Global";
import api from "../../services/api";

const db = SQLite.openDatabase("podcastDb.db");

function Main({ navigation, props }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [podcasts, setPodcasts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  async function loadPodcasts() {
    setRefreshing(true);

    try {
      const podcasts = await api.get("/podcasts");
      setRefreshing(false);
      let categories = [];
      const podcastData = podcasts.data;
      podcastData.map((podcast) => {
        let findIndex = false;

        categories.map((category, index) => {
          if (category.name === podcast.category) findIndex = index;
        });

        if (findIndex === false) {
          categories.push({
            name: podcast.category,
            podcasts: [podcast],
          });
        } else {
          categories[findIndex].podcasts.push(podcast);
        }
      });

      setCategories(categories);
      setPodcasts(podcasts.data);
    } catch (error) {
      setRefreshing(false);
      setPodcasts([]);
    }
  }

  function createDatabaseTable() {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists favorites_podcasts (
                    id integer not null,
                    feed_url text,
                    name text,
                    description text,
                    author text,
                    image text
                    );`
      );
    });
  }

  useEffect(() => {
    loadPodcasts();
    createDatabaseTable();
  }, []);

  const onRefresh = useCallback(() => {
    loadPodcasts();
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.gridView}
      >
        {categories.map((category, key) => {
          return (
            <View style={styles.categoryContainer} key={key.toString()}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.podcastsContainer}
                horizontal={true}
                data={category.podcasts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        navigation.navigate("PodcastDetails", {
                          podcast: item,
                        });
                      }}
                      style={styles.podcastContainer}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.podcastImage}
                      />
                      <Text style={styles.podcastTitle}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#fff",
  },
  gridView: {
    flex: 1,
    marginBottom: Global.playerHeight,
  },
  notFoundContent: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 50,
  },
  notFoundText: {
    fontSize: 20,
    marginHorizontal: 30,
    textAlign: "center",
    color: "#FFF",
  },
  categoryContainer: {
    width: "100%",
    marginTop: 20,
  },
  categoryTitle: {
    marginHorizontal: 10,
    color: Global.primaryColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  podcastsContainer: {
    flex: 1,
  },
  podcastContainer: {
    width: 130,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  podcastImage: {
    borderRadius: 5,
    width: "100%",
    height: 120,
  },
  podcastTitle: {
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Main;
