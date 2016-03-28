const initialState = {};

module.exports = function(state = initialState, action) {

  switch(action.type) {
    case 'UPDATE_NAME': {
      return {...state, name: action.name}
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
