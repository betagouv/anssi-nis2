import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { AggregatInformationsEmail } from "../../../Domaine/Contact/InformationsEmail.definitions.ts";

export type EnvoieDonneesFormulaire = (
  formData: IDonneesBrutesFormulaireSimulateur,
) => Promise<string>;
export type EnregistreInformationsEmail = (
  informations: InformationsEmai,
) => Promise<AggregatInformationsEmail>;
