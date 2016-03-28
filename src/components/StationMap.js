'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import FetchStations from 'actions/FetchStations';
import 'drmonty-leaflet-awesome-markers';

require('styles/StationMap.scss');
require('../../node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css');

class StationMap extends React.Component {

  getMarkerForStation(nbBikes) {
    let marker = L.AwesomeMarkers.icon({
      icon: 'bicicle',
      markerColor: this.getMarkerColor(nbBikes)
    });

    return marker;
  }

  getMarkerColor(nbBikes) {
    if (nbBikes == 0) return 'red';
    if (nbBikes < 5) return 'orange';
    return 'blue';
  }

  render() {
    return (
      <div>
      <a onClick={this.props.refresh}>Refresh</a>
      <Map className="map" center={[51.2191556, 4.4076572]}
        zoom={13}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
        {this.props.stations.map(s => {
          return (
            <Marker
              position={[parseFloat(s.lat), parseFloat(s.lon)]}
              icon={this.getMarkerForStation(parseInt(s.bikes))}
              key={s.id}>
              <Popup>
                <div>
                  <div>Name: {s.name}</div>
                  <div>bikes: {s.bikes}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.StationReducer.stations
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: () => {
      dispatch(FetchStations())
    }
  }
};

StationMap.displayName = 'StationMap';

export default connect(mapStateToProps, mapDispatchToProps)(StationMap);
