// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import BusBoard from './BusBoard';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<BusBoard />, document.getElementById('root'));
registerServiceWorker();

