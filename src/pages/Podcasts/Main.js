import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from "react-native";
import PodcastListItem from "../../components/PodcastListItem";
import api from "../../services/api";

import NotFoundIMage from "../../assets/audience.svg";
import Global from "../../config/Global";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("podcastDb.db");

function Main({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [podcasts, setPodcasts] = React.useState([]);

  async function loadPodcasts() {
    setRefreshing(true);

    try {
      const podcasts = await api.get("/podcasts");
      setRefreshing(false);
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
      <StatusBar backgroundColor="#2A2E43" barStyle="light-content" />
      <Text>Music</Text>
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.gridView}
      >
        {podcasts.length < 1 && (
          <View style={styles.notFoundContent}>
            <Text style={styles.notFoundText}>Nenhum podcast por aqui</Text>
          </View>
        )}
        {podcasts.length > 0 &&
          podcasts.map((item, index) => (
            <PodcastListItem
              key={index + 1}
              podcast={item}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 32 : 0,
    backgroundColor: "#2A2E43",
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
});

export default Main;
