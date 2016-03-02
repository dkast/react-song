import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import union from 'lodash/array/union';

const tracks = (state = {
  isFetching: false,
  items: [],
  next: ''
}, action) => {
  switch (action.type) {
    case 'FETCH_TRACKS': 
      return merge({}, state, {
        isFetching: false,
        items: union(state, action.payload.collection),
        next: action.payload.next_href
      });

    case 'FETCH_TRACKS_REQUEST':
      return merge({}, state, {
        isFetching: true
      });
      
    default:
      return state
  } 
}

const currentTrack = (state = {
  isPlaying: false,
  shouldLoadTrack: false,
  track: null
}, action) => {
  switch (action.type) {
    case 'PLAY_TRACK':
      //playTrack(action.track, action.shouldLoadTrack);
      return merge({}, state, {
        isPlaying: true,
        shouldLoadTrack: action.shouldLoadTrack,
        track: action.track
      });

    case 'PAUSE_TRACK':
      //pauseTrack();
      return merge({}, state, {
        isPlaying: false,
        shouldLoadTrack: false
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tracks,
  currentTrack
})

export default rootReducer;