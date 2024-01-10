import { ResultatEligibilite } from "../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { PrecisionResultatRegulation } from "../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const classDivPourPrecisionResultat: Record<
  PrecisionResultatRegulation,
  string
> = {
  IncertainAutrePaysUnionEuropeenne: "fr-nis2-incertain-UE",
  IncertainStandard: "fr-nis2-incertain",
  NonReguleHorsUnionEuropeenne: "fr-nis2-non-eligible",
  NonReguleStandard: "fr-nis2-non-eligible",
  ReguleDORA: "fr-nis2-eligible",
  ReguleEnregistrementDeNomsDeDomaine: "fr-nis2-eligible",
  ReguleStandard: "fr-nis2-eligible",
};
export const classIconePourPrecisionResultat: Record<
  PrecisionResultatRegulation,
  string
> = {
  IncertainAutrePaysUnionEuropeenne: "fr-icon-question-fill",
  IncertainStandard: "fr-nis2-icon-in-progress",
  NonReguleHorsUnionEuropeenne: "fr-icon-close-line",
  NonReguleStandard: "fr-icon-close-line",
  ReguleDORA: "fr-icon-check-line",
  ReguleEnregistrementDeNomsDeDomaine: "fr-icon-check-line",
  ReguleStandard: "fr-icon-check-line",
};
export const titresPourPrecisionResultat: Record<
  PrecisionResultatRegulation,
  string
> = {
  IncertainAutrePaysUnionEuropeenne:
    "Nous ne pouvons pas déterminer si votre  \nentité serait régulée par la directive NIS 2",
  IncertainStandard: "Nous ne pouvons vous répondre dans l’immédiat",
  NonReguleHorsUnionEuropeenne:
    "Votre entité ne serait pas régulée  \npar la directive NIS 2",
  NonReguleStandard:
    "Votre entité ne serait pas régulée  \npar la directive NIS 2",
  ReguleDORA: "Votre entité serait régulée  \npar la directive NIS 2",
  ReguleEnregistrementDeNomsDeDomaine:
    "Votre entité serait régulée  \npar la directive NIS 2",
  ReguleStandard: "Votre entité serait régulée  \npar la directive NIS 2",
};

export const explicationContenuIncertain =
  "Le test est en cours d’évolution pour prendre en compte l’ensemble des " +
  "typologies d’entités, mais n’est pas encore en mesure de couvrir les " +
  "paramètres qui ont été saisis.";

export const contenusResultatEligiblePetitEntreprise: ContenusResultatEligibilite =
  {
    modeFormulaireEmail: "complet",
    blocs: new Set(["etMaintenant", "enSavoirPlus", "bienDebuterAvecPdf"]),
  };
export const contenusResultatEligibleGrandeEntreprise: ContenusResultatEligibilite =
  {
    ...contenusResultatEligiblePetitEntreprise,
    blocs: new Set(["etMaintenant", "enSavoirPlus"]),
  };

export const contenusResultatNonEligible: ContenusResultatEligibilite = {
  modeFormulaireEmail: "simple",
  blocs: new Set([]),
};
export const contenusResultatIncertain: ContenusResultatEligibilite = {
  modeFormulaireEmail: "simple",
  blocs: new Set(["bienDebuterAvecPdf"]),
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
