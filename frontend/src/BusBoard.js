// @flow

import React, { Component } from 'react';
import BusList from './components/BusList';
import logo from './android-bus.svg';
import softbus from './softbus.png';
import sadbus from './sadbus.png';
import sadgareth from './sadgareth.png';
import 'whatwg-fetch';
import { Bus } from './models/Bus';
import { Stop } from './models/Stop';
import Konami from 'react-konami';


const busBoardStatus =  {
  noData: 0,
  loading: 1,
  data: 2,
  error: 3
};

type AppStatus = $Keys<typeof busBoardStatus>;

type BusBoardState = {
  postcode: string,
  stopInfo: Array<{stop: Stop, buses: Array<Bus>}>,
  time: number,
  status: AppStatus,
  konami: boolean
}

class BusBoard extends Component<{}, BusBoardState> {
  constructor(props: {}) {
    super(props);
    this.state = { postcode: '', stopInfo: [], time: 0, status: 'noData', konami: false };
  }

  componentDidMount() {
    setInterval(() =>  this.setState({time : (this.state.time+1)%2}), 30000)
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({ postcode: event.currentTarget.value });
  }

  async findStopInfo(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({status: 'loading'});

    let response = await Promise.all([
      fetch(`http://localhost:3001/postcode/${this.state.postcode}`),
      new Promise((resolve, reject) => setTimeout(resolve, 1500))
    ]);

    let data = await response[0].json();

    if (data.length === 0 && this.state.postcode) {
      this.setState({ stopInfo: data, status: 'error' })
    }
    else if (data.length === 0) {
      this.setState({ stopInfo: data, status: 'noData' });
    }
    else {
      this.setState({ stopInfo: data, status: 'data' });
    }
  }

  renderLoadingSpinner() {
    return (
      <div>
        <img src={logo} className="App-loading-spinner" alt="Loading..."/>
        <img src={logo} className="App-loading-spinner-back"/>
        <img src={logo} className="App-loading-spinner-back-back"/>
      </div>
    );
  }


  renderBusList() {
    switch(this.state.status) {
      case 'noData':
        return <img src={softbus} alt="Bus"/>;
      case 'loading':
        return this.renderLoadingSpinner();
      case 'data':
        return this.state.stopInfo.map(info => <BusList stop={info.stop} buses={info.buses} key={info.stop.id}/>);
      case 'error':
        return <img src={sadbus} alt="Bus"/>;
      default:
        break;
    }
  }

  sadGareth(){
    this.setState({konami: true});
    setTimeout(() => this.setState({konami: false}), 5000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BusBoard</h1>
        </header>
        <div>
          <form onSubmit={this.findStopInfo.bind(this)}>
            <input type="text" onChange={this.handleChange.bind(this)} value={this.state.postcode}/>
            <button type="submit">Search by postcode</button>
          </form>
        </div>
        { this.renderBusList() }
        <Konami easterEgg={this.sadGareth.bind(this)}/>

        <img src={sadgareth} style={!this.state.konami ? {display: 'none'} : {} } className="scrolling-bus" />
      </div>
    );
  }
}

export default BusBoard;
