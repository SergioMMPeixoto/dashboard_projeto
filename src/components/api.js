import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

axios.defaults.headers.put['header1'] = 'Access-Control-Allow-Origin';

export default api;