import axios from "axios";

const simulationApiBaseurl =
  process.env.SIMULATION_API_BASEURL || "http://localhost:3000/";
export const simulationApi = axios.create({
  baseURL: simulationApiBaseurl,
  timeout: 1000,
});
