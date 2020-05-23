import React from "react";
import "react-native-gesture-handler";
import Player from "./src/components/Player";
import { CurrentEpisodeProvider } from "./src/contexts/CurrentEpisodeContext";
import Router from "./src/router";

function App() {
  return (
    <CurrentEpisodeProvider>
      <Router />
      <Player />
    </CurrentEpisodeProvider>
  );
}

export default App;
