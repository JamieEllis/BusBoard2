// @flow

import React, { Component } from 'react';
import BusList from './components/BusList';
import logo from './logo.svg';
import 'whatwg-fetch';
import { Bus } from './models/Bus';
import { Stop } from './models/Stop';

type BusBoardState = {
  postcode: string,
  stopInfo: Array<{stop: Stop, buses: Array<Bus>}>
}

class BusBoard extends Component<{}, BusBoardState> {
  constructor(props: {}) {
    super(props);
    this.state = { postcode: '', stopInfo: [] };
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({ postcode: event.currentTarget.value });
  }

  async findStopInfo() {
    let response = await fetch(`http://localhost:3001/postcode/${this.state.postcode}`);
    this.setState({ stopInfo: await response.json() });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BusBoard</h1>
        </header>

        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.postcode}/>
        <button onClick={this.findStopInfo.bind(this)}>Search by postcode</button>

        {this.state.stopInfo.map(info => <BusList stop={info.stop} buses={info.buses}/>)}
      </div>
    );
  }
}

export default BusBoard;
