import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import FavoriteListItem from "../../components/FavoriteListItem";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("podcastDb.db");

function Favorites({ navigation }) {
  const [podcasts, setPodcasts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    _searchTable();
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgray" barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.gridView}
      >
        {podcasts.length > 0 &&
          podcasts.map((item, index) => (
            <FavoriteListItem
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
    paddingTop: Platform.OS === "android" ? 35 : 10,
    backgroundColor: "#2A2E43",
  },
});

export default Favorites;
