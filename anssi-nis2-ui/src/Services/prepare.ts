import axios from "axios";

const baseUrlApi = import.meta.env.NIS2_API_BASE_URL || "";

const simulationApiBaseurl = baseUrlApi + "api/simulateur-reponse";
export const generateSimulationApi = () => {
  console.log(`generateSimulationApi Using URL : ${simulationApiBaseurl}`);
  return axios.create({
    baseURL: simulationApiBaseurl,
    timeout: 1000,
  });
};
