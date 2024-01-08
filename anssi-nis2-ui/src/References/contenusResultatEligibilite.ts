import { ResultatEligibilite } from "../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { separeMarkdownParLignes } from "../Services/Markdown/TransformeMarkdown.operations.ts";
import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";
import resultatKOComplet from "./Documents/precisionsSurReponseNegative.md";
import resultatOKComplet from "./Documents/precisionsSurReponsePositive.md";

const [resultatOK, resultatOKPlus] = separeMarkdownParLignes(resultatOKComplet);
const [resultatKO, resultatKOPlus] = separeMarkdownParLignes(resultatKOComplet);

export const contenusResultatEligiblePetitEntreprise: ContenusResultatEligibilite =
  {
    classeDivResultat: "fr-nis2-eligible",
    classIcone: "fr-icon-check-line",
    titre: "Votre entité serait régulée  \npar la directive NIS 2",
    fichierPrecisionSurReponse: "precisionsSurReponsePositive",
    precisions: {
      principal: resultatOK,
      annexe: resultatOKPlus,
    },
    modeFormulaireEmail: "complet",
    afficheBlocs: {
      etMaintenant: true,
      enSavoirPlus: true,
      bienDebuterAvecPdf: true,
    },
  };
export const contenusResultatEligibleGrandeEntreprise: ContenusResultatEligibilite =
  {
    ...contenusResultatEligiblePetitEntreprise,
    afficheBlocs: {
      ...contenusResultatEligiblePetitEntreprise.afficheBlocs,
      bienDebuterAvecPdf: false,
    },
  };

export const contenusResultatNonEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-non-eligible",
  classIcone: "fr-icon-close-line",
  titre: "Votre entité ne serait pas régulée  \npar la directive NIS 2",
  fichierPrecisionSurReponse: "precisionsSurReponseNegative",
  modeFormulaireEmail: "simple",
  precisions: {
    principal: resultatKO,
    annexe: resultatKOPlus,
  },
  afficheBlocs: {
    etMaintenant: false,
    enSavoirPlus: false,
    bienDebuterAvecPdf: false,
  },
};
export const contenusResultatIncertain: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-incertain",
  classIcone: "fr-nis2-icon-in-progress",
  titre: "Nous ne pouvons vous répondre dans l’immédiat",
  modeFormulaireEmail: "simple",
  sousTitre:
    "Le test est en cours d’évolution pour prendre en compte l’ensemble des " +
    "typologies d’entités, mais n’est pas encore en mesure de couvrir les " +
    "paramètres qui ont été saisis.",
  afficheBlocs: {
    etMaintenant: false,
    enSavoirPlus: false,
    bienDebuterAvecPdf: true,
  },
};

export const contenusResultats: Record<
  ResultatEligibilite,
  ContenusResultatEligibilite
> = {
  EligiblePetiteEntreprise: contenusResultatEligiblePetitEntreprise,
  EligibleMoyenneGrandeEntreprise: contenusResultatEligibleGrandeEntreprise,
  Incertain: contenusResultatIncertain,
  NonEligible: contenusResultatNonEligible,
};
