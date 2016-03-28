const initialState = {stations: [], showAllStations: true};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'FETCHING_STATIONS':
      return {...state, loading: true}
    case 'FETCHED_STATIONS':
      return {
        ...state,
        stations: action.stations,
        loading: false
      };
    case 'UPDATE_STATION_FILTER':
      return {
        ...state,
        stationFilter: {
          center: action.center,
          radius: action.radius
        }
      };
    case 'TOGGLE_ALL_STATIONS':
      return {
        ...state,
        showAllStations: !state.showAllStations
      };
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
