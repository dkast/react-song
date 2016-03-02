import React from 'react';
import * as Keys from '../constants/Keys';
import { formatSeconds } from '../lib/utils';

export default class MediaPlayer extends React.Component {
  state = {
    currentTime: 0,
    duration: 0
  }
  
  componentDidMount() {
    console.log('Nuevo audio');
    this.audio = new Audio();
    this.audio.addEventListener('ended', this.handleEnded, false);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    this.audio.addEventListener('loadstart', this.handleLoadStart, false);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate, false);
    this.audio.addEventListener('play', this.handleTimeUpdate, false);
    this.audio.addEventListener('pause', this.handleTimeUpdate, false);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.handleEnded, false);
    this.audio.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    this.audio.removeEventListener('loadstart', this.handleLoadStart, false);
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    this.audio.removeEventListener('play', this.handleTimeUpdate, false);
    this.audio.removeEventListener('pause', this.handleTimeUpdate, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPlaying, shouldLoadTrack, track } = this.props.currentTrack;
    if(prevProps.currentTrack.track && prevProps.currentTrack.track.id === track.id) {
      if(isPlaying) {
        //this should be handled better :sadface:
        if(prevProps.currentTrack.isPlaying) {
          return;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      const stream = track.stream_url + '?client_id=' + Keys.SOUNDCLOUD_KEY;
      this.audio.src = stream;
      this.audio.load();
      this.audio.play();
    }
  }

  handleTimeUpdate = (e) => {
    const audio = e.path[0];
    const currentTime = Math.floor(audio.currentTime);
    this.setState({
      currentTime: currentTime
    });
  }

  handleLoadedMetadata = (e) => {
    const audio = e.path[0];
    const duration = Math.floor(audio.duration);
    this.setState({
      duration: duration
    });
  }

  handlePlayButtonClick = (e) => {
    console.log(this.props.currentTrack.isPlaying);
    if(this.props.currentTrack.isPlaying) {
      this.props.actions.pauseTrack();
    } else {
      this.props.actions.playTrack(this.props.currentTrack.track);
    }
  }
  render() {
    const { isPlaying, track } = this.props.currentTrack;
    let artworkURL = '';
    let title = '';
    let artist = '';

    if(track) {
      artworkURL = track.artwork_url;
      if(track.title.lastIndexOf('-') > 0) {
        const titleArray = track.title.split('-');
        title = titleArray[1];
        artist = titleArray[0];
      } else {
        title = track.title;
        artist = track.user.username;
      }
    }

    const { currentTime, duration } = this.state;

    const artworkBig = artworkURL.replace('large', 't300x300');

    return (
      <div id="media-player">
        <CoverArtBackground artworkURL={artworkBig} />
        {/*<CoverArt artworkURL={artworkURL}/>*/}
        <div className="ui grid">
          <div className="four wide column">
            <MediaPlayerControls
              isPlaying={isPlaying}
              onPlayButtonClick={this.handlePlayButtonClick}
            />
          </div>
          <div className="eight wide column">
            <div className="ui grid">
              <div className="row">
                <div className="column">
                  <div className="ui basic center aligned segment title">
                    <span>{artist}</span>
                    &emsp;&mdash;&emsp;
                    <span>{title}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <Duration 
                    currentTime={this.state.currentTime} 
                    duration={this.state.duration}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <CoverArt artworkURL={artworkURL}/>
          </div>
        </div>
      </div>
    );
  }
}

const MediaPlayerControls = ({
  isPlaying, 
  onPlayButtonClick
}) => {
  let playPauseIcon = isPlaying ? 'pause' : 'play';
  return(
    <div className="ui center aligned equal width grid" id="controls">
      <div className="column">
        <i className="backward inverted link icon"></i>
      </div>
      <div className="column">
        <i className={`${playPauseIcon} inverted link icon`} 
           onClick={onPlayButtonClick}
        ></i>
      </div>
      <div className="column">
        <i className="forward inverted link icon"></i>
      </div>
    </div>
  );
}

const CoverArtBackground = ({artworkURL}) => {
  return (
    <img className="ui fluid image" src={artworkURL} alt="" id="cover-background"/>
  );
};

const CoverArt = ({artworkURL}) => {
  return (
    <div style={{padding: '1em'}}>
      <img className="ui centered tiny image" src={artworkURL} alt=""/>
    </div>
  );
};

const Duration = ({ currentTime, duration }) => {
  let width;
  if(duration !== 0) {
      width = currentTime/duration * 100;
    }
  return (
    <div className="ui grid" style={{padding: '0 1em'}}>
      <div className="two wide column">{formatSeconds(currentTime)}</div>
      <div className="twelve wide column">
        <div className="ui tiny grey inverted progress">
          <div className="bar" style={{width: `${width}%`, minWidth: 0}}></div>
        </div>
      </div>
      <div className="right aligned two wide column">{formatSeconds(duration)}</div>
    </div>
  );
}