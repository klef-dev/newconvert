/* eslint-disable no-undef */
import axios from "axios";
import store from "./store/";
// create a new axios instance
const instance = axios.create({
  baseURL: store.state.baseUrl,
  headers: {
    Authorization: `Bearer ${store.state.authentication.token}`
  }
});

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default instance;
