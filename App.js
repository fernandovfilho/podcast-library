import React from "react";
import "react-native-gesture-handler";
import Router from "./src/router";
import Player from "./src/components/Player";
import { Provider } from "react-redux";
import store from "./src/store";

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Player />
    </Provider>
  );
}

export default App;
