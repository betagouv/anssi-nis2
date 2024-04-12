import axios from "axios";

type RoutesApi = "simulateur-reponse" | "informations-emails";

export const genereClientApi = (route: RoutesApi = "simulateur-reponse") =>
  axios.create({ baseURL: `/api/${route}` });
