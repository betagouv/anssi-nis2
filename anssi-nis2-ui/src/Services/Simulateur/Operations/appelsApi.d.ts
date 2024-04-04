import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { AggregatInformationsEmail } from "../../../Domaine/Contact/InformationsEmail.definitions.ts";

export type EnvoieDonneesFormulaire = (
  formData: DonneesFormulaireSimulateur,
) => Promise<string>;
export type EnregistreInformationsEmail = (
  informations: InformationsEmai,
) => Promise<AggregatInformationsEmail>;
