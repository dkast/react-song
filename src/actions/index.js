import fetch from 'isomorphic-fetch';
import * as Keys from '../constants/Keys';

export function fetchTracks(searchTerm) {
  const scKey = Keys.SOUNDCLOUD_KEY;
  return {
    type: 'FETCH_TRACKS',
    promise: fetch(`https://api.soundcloud.com/tracks?client_id=${scKey}&q=${searchTerm}&limit=24&linked_partitioning=1`)
    .then(response => response.json())
  }
}

export function playTrack(track) {
  return (dispatch, getState) => {
    const { currentTrack } = getState();
    let shouldLoadTrack = true;

    if ((currentTrack.track && track) && (currentTrack.track.id === track.id)) {
      shouldLoadTrack = false;
    }
    
    dispatch(setTrackAndPlay(track, shouldLoadTrack));
  }
}

export function setTrackAndPlay(track, shouldLoadTrack) {
  return {
    type: 'PLAY_TRACK',
    track,
    shouldLoadTrack
  }
}

export function pauseTrack() {
  return {
    type: 'PAUSE_TRACK'
  }
}