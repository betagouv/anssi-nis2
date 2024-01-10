import { ResultatEligibilite } from "../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { ContenusResultatEligibilite } from "../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const libelleTitreIncertainAutrePaysUnionEuropeenne =
  "Nous ne pouvons pas déterminer si votre  \nentité serait régulée par la directive NIS 2";
export const libelleTitreIncertainStandard =
  "Nous ne pouvons vous répondre dans l’immédiat";
export const libelleTitreNonRegule =
  "Votre entité ne serait pas régulée  \npar la directive NIS 2";
export const libelleTitreRegule =
  "Votre entité serait régulée  \npar la directive NIS 2";

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
