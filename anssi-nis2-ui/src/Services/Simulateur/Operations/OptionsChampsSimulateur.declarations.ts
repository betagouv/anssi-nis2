import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";

export type TransformeRecordToSelect<
  ValeursCles extends string,
  Contenu = string,
> = (
  valeurs: Record<ValeursCles, Contenu>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: DonneesFormulaireSimulateur,
) => OptionsChampSimulateur;

export type GenerateurLibelle<T extends string, P = string> = (
  value: T,
  valeursMetier: Record<T, P>,
) => P;
