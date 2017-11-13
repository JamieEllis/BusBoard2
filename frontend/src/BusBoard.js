// @flow

import React, { Component } from 'react';
import BusList from './components/BusList';
import logo from './logo.svg';
import './BusBoard.css';

class BusBoard extends Component<{},{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BusBoard</h1>
        </header>


      </div>
    );
  }
}

export default BusBoard;
