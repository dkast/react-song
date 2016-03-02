import React from 'react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import Sidebar from '../components/Sidebar';

export default class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <div id="content">
          {this.props.children}
        </div>        
        <Sidebar />
      </div>
    );
  }
}
