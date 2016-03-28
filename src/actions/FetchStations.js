const stationsEndpoint = 'https://crossorigin.me/https://www.velo-antwerpen.be/availability_map/getJsonObject';

module.exports = () => {
  return (dispatch) => {
    fetch(stationsEndpoint)
      .then(r => r.json())
      .then(stations => dispatch({
        type: 'FETCHED_STATIONS',
        stations
      }), error => dispatch({
        type: 'FETCH_ERROR',
        error
      }));
  }
};
