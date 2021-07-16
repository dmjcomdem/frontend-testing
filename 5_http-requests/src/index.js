const axios = require('axios');

// BEGIN
function get(url) {
  return axios.get(url);
}

function post(url, payload) {
  return axios.post(url, payload);
}
// END

module.exports = { get, post };
