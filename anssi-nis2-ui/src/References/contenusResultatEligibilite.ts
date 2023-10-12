import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/contenusResultatEligibilite";
import { ResultatEligibilite } from "../Domaine/Simulateur/resultatEligibilite.ts";

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

export const contenusResultats: Record<
  ResultatEligibilite,
  ContenusResultatEligibilite
> = {
  EligiblePetiteEntreprise: contenusResultatEligiblePetitEntreprise,
  EligibleMoyenneGrandeEntreprise: contenusResultatEligibleGrandeEntreprise,
  NonEligible: contenusResultatNonEligible,
};
