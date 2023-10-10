import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";

export type TransformeRecordToSelect<
  ValeursCles extends string,
  Contenu = string,
> = (
  valeurs: Partial<Record<ValeursCles, Contenu>>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  formData?: DonneesFormulaireSimulateur,
) => OptionsChampSimulateur;
