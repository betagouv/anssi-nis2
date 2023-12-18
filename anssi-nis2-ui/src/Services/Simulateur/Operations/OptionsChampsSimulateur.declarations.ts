import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";

export type TransformeRecordToSelect<
  ValeursCles extends string,
  Contenu = string,
> = (
  valeurs: Record<ValeursCles, Contenu>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: IDonneesBrutesFormulaireSimulateur,
) => OptionsChampSimulateur;

export type GenerateurLibelle<T extends string, P = string> = (
  value: T,
  valeursMetier: Record<T, P>,
) => P;
