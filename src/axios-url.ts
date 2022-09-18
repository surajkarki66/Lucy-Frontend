import axios from "axios";

const token = localStorage.getItem('tokan')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v2",
  withCredentials: true,
});

export default instance;
