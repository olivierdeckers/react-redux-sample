'use strict';

import React from 'react';

import { Map, TileLayer, Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import FilterControl from 'components/FilterControl';
import LeafletButton from 'components/LeafletButton';
import 'drmonty-leaflet-awesome-markers';

require('styles/StationMap.scss');
require('../../node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css');
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css');

export default class StationMap extends React.Component {

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
    this.props.onUpdateFilter(center, radius);
  }

  renderFilterCircle() {
    let filter = this.props.filter;
    if (filter) {
      return (
        <Circle
          center={filter.center}
          radius={filter.radius}
          color='#ff0000'
        />
      );
    }
    return ''
  }

  renderFilterControl() {
    return (
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
    );
  }

  renderStations() {
    return this.props.stations.map(s => {
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
    });
  }

  render() {
    return (
      <Map className="map"
        center={[51.2191556, 4.4076572]}
        zoom={13}>
        <LeafletButton icon='refresh' onClick={this.props.onRefresh} />
        <LeafletButton icon='hide' onClick={this.props.onToggleShowAll} />
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
        {this.renderStations()}
        {this.renderFilterControl()}
        {this.renderFilterCircle()}
      </Map>
    );
  }
}
