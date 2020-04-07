import axios from 'axios';

const { REACT_APP_API } = process.env;

const API = axios.create({
  baseURL: REACT_APP_API
});

export default API;
