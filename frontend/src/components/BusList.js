// @flow

import React from 'react';
import { Bus } from '../models/Bus';
import { Stop } from '../models/Stop';


type BusListProps = {
  stop: Stop,
  buses: Array<Bus>
}


class BusList extends React.Component<BusListProps, {}> {
  constructor(props: BusListProps) {
    super(props);
  }

  render() {
    return (
      <div className="BusList">
        <h3>{ this.props.stop.name }</h3>
        { this.props.buses.map(bus => <p> { `${bus.number} to ${bus.destination} ${bus.expectedArrival.fromNow()}` }</p>)}
      </div>
    );
  }
}

export default BusList;