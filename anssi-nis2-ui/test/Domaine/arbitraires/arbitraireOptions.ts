import { Activite } from "../../../src/Domaine/Simulateur/Activite";

export type ArbitraireOptions = {
  minLength?: number;
};
export type ArbitraireOptionsActivites = ArbitraireOptions & {
  filtreActivite?: (activite: Activite) => boolean;
};