import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store"
nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
})
const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    // no se cong them /api/ trong file apiService de chay
});
// interceptor se chen chan vao moi lan trinh duyet gui request va sau moi lan sever gui respone
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    nProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response && response.data ? response.data : response;
}, function (error) {
    nProgress.done();
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = "/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;