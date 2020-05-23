import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PodcastListItem(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  podcastImage: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  podcastAuthor: {
    marginTop: 5,
    color: "#FFF",
  },
});
