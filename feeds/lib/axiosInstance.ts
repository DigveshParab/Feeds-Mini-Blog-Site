// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // your backend URL
  withCredentials: true, // send HTTP-only cookies
});

export default instance;
