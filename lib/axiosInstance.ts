// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL, // your backend URL
  withCredentials: true, // send HTTP-only cookies
});

export default instance;
