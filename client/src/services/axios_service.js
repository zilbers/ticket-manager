import axios from 'axios';
const baseUrl = '/api/tickets';

function get(query) {
  if(!query) {
    query = "";
  }
  return axios.get(`${baseUrl}${query}`);
}

function post(newObject) {
  return axios.post(baseUrl, newObject);
}

function update(id, theUpdate) {
  return axios.put(`${baseUrl}/${id}/${theUpdate}`);
}

export { get, post, update };