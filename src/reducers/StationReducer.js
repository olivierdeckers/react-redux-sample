const initialState = {stations: []};

module.exports = function(state = initialState, action) {

  switch(action.type) {
    case 'FETCHED_STATIONS':
      return {...state, stations: action.stations};
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
