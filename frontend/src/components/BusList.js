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
        <div className="bus-list-title">{ this.props.stop.name }</div>
        {
          this.props.buses.map(bus =>
            <div className="bus-list-info-snippet" key={bus.busId}>
              { `${bus.number} to ${bus.destination} ${moment(bus.expectedArrival).fromNow()}` }
            </div>
          )
        }
      </div>
    );
  }
}

export default BusList;