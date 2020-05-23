import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FavoriteListItem from "../../components/FavoriteListItem";

const db = SQLite.openDatabase("podcastDb.db");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#fff",
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  img: {
    width: 50,
  },
});

function Favorites({ navigation }) {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      _searchTable();
    });
  }, [navigation]);

  function _searchTable() {
    db.transaction((tx) => {
      tx.executeSql("select * from favorites_podcasts", [], (_, { rows }) => {
        setPodcasts(rows._array);
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={podcasts}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <FavoriteListItem podcast={item} navigation={navigation} />;
        }}
      />
    </SafeAreaView>
  );
}

export default Favorites;
