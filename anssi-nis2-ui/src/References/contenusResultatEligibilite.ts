import { ResultatEligibilite } from "../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { PrecisionResultat } from "../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
import { fabriquePrecisionsResultatProps } from "../Services/fabriques/PrecisionsResultatProps.fabrique.ts";
import {
  ContenusResultatEligibilite,
  PrecisionsResultatProps,
} from "../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";
import PrecisionsResultatNonReguleHorsUnionEuropeenne from "./Documents/PrecisionsResultat.NonReguleHorsUnionEuropeenne.md";
import PrecisionsResultatNonReguleStandard from "./Documents/PrecisionsResultat.NonReguleStandard.md";
import PrecisionsResultatReguleDORA from "./Documents/PrecisionsResultat.ReguleDora.md";
import PrecisionsResultatReguleEnregistrementDeNomsDeDomaine from "./Documents/PrecisionsResultat.ReguleEnregistrementDeNomsDeDomaine.md";
import PrecisionsResultatReguleStandard from "./Documents/PrecisionsResultat.ReguleStandard.md";
import PrecisionsResultatIncertainAutrePaysUnionEuropeenne from "./Documents/PrecisionsResultat.IncertainAutrePaysUnionEuropeenne.md";

const precisionsResultatVide: PrecisionsResultatProps = {
  principal: "",
  annexe: "",
};

export const precisionPourResultat: Record<
  PrecisionResultat,
  PrecisionsResultatProps
> = {
  IncertainStandard: precisionsResultatVide,
  IncertainAutrePaysUnionEuropeenne: fabriquePrecisionsResultatProps(
    PrecisionsResultatIncertainAutrePaysUnionEuropeenne,
  ),
  NonReguleHorsUnionEuropeenne: fabriquePrecisionsResultatProps(
    PrecisionsResultatNonReguleHorsUnionEuropeenne,
  ),
  NonReguleStandard: fabriquePrecisionsResultatProps(
    PrecisionsResultatNonReguleStandard,
  ),
  ReguleDORA: fabriquePrecisionsResultatProps(PrecisionsResultatReguleDORA),
  ReguleEnregistrementDeNomsDeDomaine: fabriquePrecisionsResultatProps(
    PrecisionsResultatReguleEnregistrementDeNomsDeDomaine,
  ),
  ReguleStandard: fabriquePrecisionsResultatProps(
    PrecisionsResultatReguleStandard,
  ),
};

export const classDivPourPrecisionResultat: Record<PrecisionResultat, string> =
  {
    IncertainAutrePaysUnionEuropeenne: "fr-nis2-incertain-UE",
    IncertainStandard: "fr-nis2-incertain",
    NonReguleHorsUnionEuropeenne: "fr-nis2-non-eligible",
    NonReguleStandard: "fr-nis2-non-eligible",
    ReguleDORA: "fr-nis2-eligible",
    ReguleEnregistrementDeNomsDeDomaine: "fr-nis2-eligible",
    ReguleStandard: "fr-nis2-eligible",
  };
export const classIconePourPrecisionResultat: Record<
  PrecisionResultat,
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
export const titresPourPrecisionResultat: Record<PrecisionResultat, string> = {
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
