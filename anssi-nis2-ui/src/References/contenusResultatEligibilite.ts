import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/contenusResultatEligibilite";
import { ResultatEligibilite } from "../Domaine/Simulateur/resultatEligibilite.ts";

export const contenusResultatEligible: ContenusResultatEligibilite = {
  classeDivResultat: "fr-nis2-eligible",
  classIcone: "fr-icon-check-line",
  titre: "La directive s'appliquerait à votre entité",
  fichierPrecisionSurReponse: "precisionsSurReponsePositive",
  afficheBlocs: {
    etMaintenant: true,
    enSavoirPlus: true,
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
  },
};

export const contenusResultats: Record<
  ResultatEligibilite,
  ContenusResultatEligibilite
> = {
  EligiblePetiteEntreprise: contenusResultatEligible,
  EligibleMoyenneGrandeEntreprise: contenusResultatEligible,
  NonEligible: contenusResultatNonEligible,
};
