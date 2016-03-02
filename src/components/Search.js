import React from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import VelocityHelpers from 'velocity-react/velocity-helpers';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import SearchResults from './SearchResults';

const Animations = {
  In: VelocityHelpers.registerEffect({
    calls: [
      [{
        opacity: 1,
        scale: 1
      }, 1, {
        easing: [ 150, 15 ]
      }]
    ],
  }),
  Out: VelocityHelpers.registerEffect({
    calls: [
      [{
        opacity: 0,
        scale: 0.75
      }, 1, {
        easing: 'ease-out'
      }]
    ],
  })
}

// ES7 Decorator
@connect(state => ({
  tracks: state.tracks,
  currentTrack: state.currentTrack
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))
export default class Search extends React.Component {
  state = {
    searchTerm: '',
    searchTriggered: false
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleKeyDown = (e) => {
    const ENTER = 13;
    if ((e.keyCode == ENTER) && (this.state.searchTerm != '')) {
      this.setState({
        searchTriggered: true 
      });
      this.props.actions.fetchTracks(this.state.searchTerm);
    }
  }

  renderSearchEngine = () => {
    if (this.state.searchTriggered) {
      return(
        <div className="ui padded center aligned grid" key="search-top">
          <div className="four wide column">
          </div>
          <div className="eight wide column">
            <div className="ui large fluid icon input" id="search-item">
              <input type="text" placeholder="Busca una canción..." value={this.state.searchTerm} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
              <i className="search icon"></i>
            </div>
          </div>
          <div className="four wide column"></div>
        </div>
      );
    } else {
      return (
          <div id="search-container">
            <div className="ui big fluid icon input">
              <input type="text" placeholder="Busca una canción..." onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
              <i className="search icon"></i>
            </div>
          </div>
      );
    }
  }

  renderSearchResults = () => {
    if (this.state.searchTriggered) {
      return (
        <SearchResults 
          tracks={this.props.tracks} 
          currentTrack={this.props.currentTrack}
          actions={this.props.actions}
        />
      );
    }
  }

  render() {
    const enterAnimation = {
      animation: Animations.In,
      duration: 800,
    };

    const leaveAnimation = {
      animation: Animations.Out,
      duration: 200,
    }

    return (
      <div>
        <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation}>
          {this.renderSearchEngine()}
        </VelocityTransitionGroup>
        {this.renderSearchResults()}
      </div>
    );
  }
}
