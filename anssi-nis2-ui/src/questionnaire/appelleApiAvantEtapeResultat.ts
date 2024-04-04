import { TypeEtape } from "../../../commun/core/src/Domain/Simulateur/InformationsEtape.ts";
import { DonneesFormulaireSimulateur } from "../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { EnvoieDonneesFormulaire } from "../Services/Simulateur/Operations/appelsApi";

export const quiAppelleFonctionAvantResultat =
  <
    TEtat extends { etapeCourante: TypeEtape } & DonneesFormulaireSimulateur,
    TAction,
  >(
    etapeCible: TypeEtape,
    hookFonction: EnvoieDonneesFormulaire,
  ) =>
  (reducerOriginal: (etat: TEtat, action: TAction) => TEtat) =>
  (etat: TEtat, action: TAction) => {
    const etatOriginal = reducerOriginal(etat, action);
    if (etatOriginal.etapeCourante === etapeCible) hookFonction(etatOriginal);
    return etatOriginal;
  };
