import axios from 'axios';
const baseUrl = '/api/tickets';

// Sends get request to server, if recives query it sends with query
function get(query) {
  if(query) {
    return axios.get(`${baseUrl}?searchText=${query}`);
  }
  return axios.get(baseUrl);
}

// Posting new server to server
function post(newObject) {
  return axios.post(baseUrl, newObject);
}

// Updates ticket
function update(id, theUpdate) {
  return axios.post(`${baseUrl}/${id}/${theUpdate}`);
}

export { get, post, update };