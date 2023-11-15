import axios from "axios";

const baseUrlApi = import.meta.env.NIS2_API_BASE_URL || "";

const urlApi = baseUrlApi + "api";

type RoutesApi = "simulateur-reponse" | "informations-emails";
export const genereClientApi = (route: RoutesApi = "simulateur-reponse") => {
  const url = `${urlApi}/${route}`;
  console.log(`${genereClientApi.name} Using URL : ${url}`);
  return axios.create({
    baseURL: url,
    timeout: 1000,
  });
};
