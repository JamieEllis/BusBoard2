// @flow

import React from 'react';
import { Bus } from '../models/Bus';
import { Stop } from '../models/Stop';
import moment from 'moment';


type BusListProps = {
  stop: Stop,
  buses: Array<Bus>
}


class BusList extends React.Component<BusListProps, {}> {
  render() {
    return (
      <div className="BusList">
        <h3>{ this.props.stop.name }</h3>
        { this.props.buses.map(bus => <p key={bus.busId}> { `${bus.number} to ${bus.destination} ${moment(bus.expectedArrival).fromNow()}` }</p>)}
      </div>
    );
  }
}

export default BusList;