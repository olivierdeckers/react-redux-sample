'use strict';

import React from 'react';
import { connect } from 'react-redux';
import FetchStations from 'actions/FetchStations';
import UpdateStationFilter from 'actions/UpdateStationFilter';
import ToggleAllStations from 'actions/ToggleAllStations';
;import Loader from 'react-loader';

import { Map, TileLayer, Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import FilterControl from 'components/FilterControl';
import LeafletButton from 'components/LeafletButton';
import 'drmonty-leaflet-awesome-markers';

// import { CrossHairs } from 'react-icons/fa/crosshairs';
require('styles/StationMap.scss');
require('../../node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css');
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css');

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

  filterCreated(event) {
    const center = event.layer.getLatLng();
    const radius = event.layer.getRadius();
    this.props.updateFilter(center, radius);
  }



  render() {
    let circle = '';
    let filter = this.props.filter;
    if (filter) {
      circle = (
        <Circle
          center={filter.center}
          radius={filter.radius}
          color='#ff0000'
        />
      );
    }

    // let crosshairButton = (<CrossHairs/>);

    return (
      <Loader loaded={this.props.loaded}>
        <Map className="map"
          center={[51.2191556, 4.4076572]}
          zoom={13}
        >
          <LeafletButton icon='refresh' onClick={this.props.refresh} />
          <LeafletButton icon='hide' onClick={this.props.toggleShowAll} />
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
          <FilterControl
            position='topright'
            onCreated={this.filterCreated.bind(this)}
            draw={{
              polyline: false,
              polygon: false,
              rectangle: false,
              marker: false,
              circle: {
                shapeOptions: {
                  color: '#ff0000'
                }
              }
            }}
          />
          {circle}
        </Map>
      </Loader>
    );
  }
}

const mapStateToProps = (state) => {
  state = state.StationReducer;
  const filter = state.stationFilter;

  if (state.showAllStations) {
    var stations = state.stations;
  } else {
    const center = filter.center;
    const radius = filter.radius;

    var stations = state.stations.filter(station => {
      return center.distanceTo(L.latLng(station.lat, station.lon)) < radius;
    })
  }

  return {
    loaded: !state.loading,
    stations,
    filter,
    showAllStations: state.showAllStations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: () => dispatch(FetchStations()),
    updateFilter: (center, radius) =>
      dispatch(UpdateStationFilter(center, radius)),
    toggleShowAll: () => dispatch(ToggleAllStations())
  }
};

StationMap.displayName = 'StationMap';

export default connect(mapStateToProps, mapDispatchToProps)(StationMap);
