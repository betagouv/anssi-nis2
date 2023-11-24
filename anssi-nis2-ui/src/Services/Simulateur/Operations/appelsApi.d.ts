import { IDonneesBrutesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { AggregatInformationsEmail } from "../../../../../anssi-nis2-domain/src/Contact/InformationsEmail.definitions.ts";

export type EnvoieDonneesFormulaire = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => Promise<string>;
export type EnregistreInformationsEmail = (
  informations: InformationsEmai,
) => Promise<AggregatInformationsEmail>;
