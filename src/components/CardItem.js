import React from 'react';

export default class CardItem extends React.Component {

  handlePlayButtonClick = (e) => {
    console.log(this.props.isPlaying);
    if(this.props.isPlaying) {
      this.props.actions.pauseTrack();
    } else {
      this.props.actions.playTrack(this.props.item);
    }
  }

  render() {
    let title = '';
    let artist = '';
    let imageUrl = '';
    let playPauseIcon = this.props.isPlaying ? 'pause' : 'play';
    const item = this.props.item;

    if(item.title.lastIndexOf('-') > 0) {
      const titleArray = item.title.split('-');
      title = titleArray[1];
      artist = titleArray[0];
    } else {
      title = item.title;
      artist = item.user.username;
    }

    if(item.artwork_url) {
      imageUrl = item.artwork_url;
    } else {
      imageUrl = item.user.avatar_url;
    }

    if(imageUrl !== '') {
      imageUrl = imageUrl.replace('large', 't300x300');
    }

    const imageStyle = {
      minHeight: '120px',
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPositionY: '50%',
      backgroundPositionX: '50%'
    }

    return (
      <div className="ui card">
        <div className="image" style={imageStyle}>
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div 
                  className="ui violet circular icon button"
                  onClick={this.handlePlayButtonClick}
                >
                  <i className={`${playPauseIcon} icon`}></i>
                </div>
              </div>
            </div>
          </div>
          {/*<img src={imageUrl} alt=""/>*/}
        </div>
        <div className="content">
          <div className="ui sub header truncated">
            {title}
          </div>
          <div className="meta truncated">
            {artist}
          </div>
        </div>
      </div>
    );
  }
}
