import axios from "axios";

const simulationApiBaseurl = "/api/simulateur-reponse";
export const generateSimulationApi = () => {
  console.log(`generateSimulationApi Using URL : ${simulationApiBaseurl}`);
  return axios.create({
    baseURL: simulationApiBaseurl,
    timeout: 1000,
  });
};
