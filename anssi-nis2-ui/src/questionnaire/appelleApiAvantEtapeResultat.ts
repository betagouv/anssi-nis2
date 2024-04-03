import { TypeEtape } from "../../../commun/core/src/Domain/Simulateur/InformationsEtape.ts";
import { EnvoieDonneesFormulaire } from "../Services/Simulateur/Operations/appelsApi";
import { ActionQuestionnaire } from "./actions.ts";
import { EtatQuestionnaire } from "./reducerQuestionnaire.ts";

export const quiAppelleFonctionAvantResultat =
  <
    TEtat extends EtatQuestionnaire,
    TAction extends Pick<ActionQuestionnaire, "type">,
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
