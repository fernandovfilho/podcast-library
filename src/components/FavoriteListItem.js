import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FavoriteListItem(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        props.navigation.navigate("PodcastDetails", { podcast: props.podcast });
      }}
      style={styles.container}
    >
      <Image
        style={styles.podcastImage}
        resizeMode="cover"
        source={{ uri: props.podcast.image }}
      />
      <View style={styles.podcastInfo}>
        <Text style={styles.podcastName}>{props.podcast.name}</Text>
        <Text style={styles.podcastAuthor}>{props.podcast.author}</Text>
        <Text style={styles.podcastDescription}>
          {props.podcast.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    flexDirection: "row",
    marginLeft: Platform.OS === "ios" ? 50 : 10,
  },
  podcastImage: {
    width: Platform.OS === "ios" ? 110 : 130,
    height: Platform.OS === "ios" ? 110 : 130,
    borderRadius: 12,
    marginLeft: Platform.OS === "ios" ? -40 : 0,
    backgroundColor: "white",
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  podcastInfo: {
    margin: 10,
    flex: 1,
    height: 110,
  },
  podcastName: {
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  podcastDescription: {
    flexWrap: "wrap",
    color: "#666",
    flexShrink: 1,
    fontSize: 12,
    marginTop: 5,
  },
  podcastAuthor: {
    marginTop: 5,
    color: "#333",
    fontWeight: "bold",
  },
});
