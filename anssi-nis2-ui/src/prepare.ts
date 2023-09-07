import axios from "axios";

const simulationApiBaseurl = "/api";
export const simulationApi = axios.create({
  baseURL: simulationApiBaseurl,
  timeout: 1000,
});

export const generateSimulationApi = () => {
  console.log(`generateSimulationApi Using URL : ${simulationApiBaseurl}`);
  return axios.create({
    baseURL: simulationApiBaseurl,
    timeout: 1000,
  });
};
