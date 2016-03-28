require('normalize.css');
require('styles/App.css');
require('../../node_modules/leaflet/dist/leaflet.css')

import React from 'react';
import Greeter from 'components/Greeter';
import StationMap from 'components/StationMap';

import FetchStations from 'actions/FetchStations';


// let yeomanImage = require('../images/yeoman.png');


class AppComponent extends React.Component {
  render() {
    FetchStations();
    return (
      <div className="index">
        <Greeter />
        <StationMap />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
