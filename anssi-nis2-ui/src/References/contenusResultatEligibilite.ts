import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/contenusResultatEligibilite";

import { ResultatEligibilite } from "../Domaine/Simulateur/Eligibilite.definition.ts";

export const contenusResultatEligiblePetitEntreprise: ContenusResultatEligibilite =
  {
    classeDivResultat: "fr-nis2-eligible",
    classIcone: "fr-icon-check-line",
    titre: "La directive s'appliquerait à votre entité",
    fichierPrecisionSurReponse: "precisionsSurReponsePositive",
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
  titre: "La directive ne s'appliquerait pas à votre entité",
  fichierPrecisionSurReponse: "precisionsSurReponseNegative",
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
