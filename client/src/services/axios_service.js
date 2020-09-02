import axios from 'axios';
const baseUrl = '/api/tickets';

function get() {
  return axios.get(baseUrl);
}

function query(query) {
 return axios.get(`${baseUrl}?searchText=${query}`);
}

function post(newObject) {
  return axios.post(baseUrl, newObject);
}

function update(id, theUpdate) {
  return axios.post(`${baseUrl}/${id}/${theUpdate}`);
}

export { get, post, update, query };