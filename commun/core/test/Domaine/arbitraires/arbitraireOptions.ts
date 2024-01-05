import { ValeursActivites } from "../../../src/Domain/Simulateur/Activite.definitions";

export type ArbitraireOptions = {
  minLength?: number;
};
export type ArbitraireOptionsActivites = ArbitraireOptions & {
  filtreActivite?: (activite: ValeursActivites) => boolean;
};
