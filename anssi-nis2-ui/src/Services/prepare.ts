import axios from "axios";

export const genereClientApi = () => axios.create({ baseURL: `/api` });
