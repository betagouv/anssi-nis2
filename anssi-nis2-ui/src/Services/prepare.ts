import axios from "axios";

const baseUrlApi = import.meta.env.VITE_API_URL_BASE || "";

const simulationApiBaseurl = baseUrlApi + "api/simulateur-reponse";
export const generateSimulationApi = () => {
  console.log(`generateSimulationApi Using URL : ${simulationApiBaseurl}`);
  return axios.create({
    baseURL: simulationApiBaseurl,
    timeout: 1000,
  });
};
