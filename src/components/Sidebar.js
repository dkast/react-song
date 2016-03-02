import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import MediaPlayer from './MediaPlayer';

// ES7 Decorator
@connect(state => ({
  currentTrack: state.currentTrack
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))
export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <MediaPlayer currentTrack={this.props.currentTrack} actions={this.props.actions} />
      </div>
    );
  }
}
