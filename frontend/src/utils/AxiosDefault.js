import axios from "axios";

export const AxiosDefault = axios.create();
AxiosDefault.defaults.baseURL = "http://localhost:8009/api/v1/";