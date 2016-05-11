require('normalize.css');
require('styles/App.css');
require('../../node_modules/leaflet/dist/leaflet.css')

import React from 'react';
import Greeter from 'components/Greeter';
import FilteredStationsContainer from 'containers/FilteredStationsContainer';

import FetchStations from 'actions/FetchStations';

class AppComponent extends React.Component {
  render() {
    FetchStations();
    return (
      <div className="index">
        {/*<Greeter />*/}
        <FilteredStationsContainer />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
