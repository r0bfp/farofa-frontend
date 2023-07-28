import axios from "axios";

const baseURL = 'https://api-farofa-v4a4mamzqq-ue.a.run.app/api/'

const api = axios.create({
    baseURL: baseURL
});

export { api };