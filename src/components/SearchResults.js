/* global $ */
import React from 'react';
import CardItem from './CardItem';
import Waypoint from 'react-waypoint';

export default class SearchResults extends React.Component {
  static defaultProps = {
    isFetching: false,
    tracks: []
  }

  static propTypes = {
    tracks: React.PropTypes.object,
    currentTrack: React.PropTypes.object,
    actions: React.PropTypes.object
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.props.tracks.isFetching) {
      $('.ui.card .image')
        .dimmer({
          on: 'hover'
      });
    }
  }

  handleLoadMore = () => {
    console.log('Gimme mas!');
  }

  renderWaypoint = () => {
    let index = new Date() / 1000;

    if(!this.props.tracks.isFetching) {
      return(
        <Waypoint 
          key={index}
          onEnter={this.handleLoadMore} 
          threshold={0} 
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { tracks, currentTrack } = this.props;
    let classFetching = tracks.isFetching ? 'active' : '';

    return (
      <div className="ui container">
        <h3 className="ui header">Resultados</h3>
        <div className="ui six doubling cards">
          {tracks.items.map((item) => {
              let isCurrentTrack = false;
              let isPlaying = false;

              if(currentTrack.track && (currentTrack.track.id == item.id)) {
                isCurrentTrack = true;
                isPlaying = currentTrack.isPlaying;
              }

              return(
                <CardItem 
                  key={item.id}
                  item={item}
                  isCurrentTrack={isCurrentTrack}
                  isPlaying={isPlaying}
                  actions={this.props.actions}
                />
              );
            }
          )}
        </div>
        <div className={`ui ${classFetching} centered inline loader`}/>
        {/*this.renderWaypoint()*/}
      </div>
    );
  }
}
