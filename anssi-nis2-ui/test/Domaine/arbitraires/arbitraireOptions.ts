import { ValeursActivites } from "../../../../anssi-nis2-domain/src/Simulateur/Activite.definitions";

export type ArbitraireOptions = {
  minLength?: number;
};
export type ArbitraireOptionsActivites = ArbitraireOptions & {
  filtreActivite?: (activite: ValeursActivites) => boolean;
};
