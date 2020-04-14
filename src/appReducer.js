const initialState = {
  episode: { title: null, audio_url: null },
  isPositioning: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_EPISODE":
      return { ...state, episode: action.payload };
    default:
      return state;
  }
};
