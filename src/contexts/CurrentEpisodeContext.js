import React, { createContext, useState } from "react";

const CurrentEpisodeContext = createContext({});

export const CurrentEpisodeProvider = ({ children }) => {
  const [episode, setEpisode] = useState({});

  function loadEpisode(episode) {
    setEpisode(episode);
  }

  return (
    <CurrentEpisodeContext.Provider value={{ episode, loadEpisode }}>
      {children}
    </CurrentEpisodeContext.Provider>
  );
};

export default CurrentEpisodeContext;
