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

const precisionsResultatVide: PrecisionsResultatProps = {
  principal: "",
  annexe: "",
};

export const precisionPourResultat: Record<
  PrecisionResultat,
  PrecisionsResultatProps
> = {
  IncertainStandard: precisionsResultatVide,
  IncertainAutrePaysUnionEuropeenne: precisionsResultatVide,
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
    IncertainAutrePaysUnionEuropeenne: "fr-nis2-incertain",
    IncertainStandard: "fr-nis2-incertain",
    NonReguleHorsUnionEuropeenne: "fr-nis2-non-eligible",
    NonReguleStandard: "fr-nis2-non-eligible",
    ReguleDORA: "fr-nis2-eligible",
    ReguleEnregistrementDeNomsDeDomaine: "fr-nis2-eligible",
    ReguleStandard: "fr-nis2-eligible",
  };

export const contenusResultatEligiblePetitEntreprise: ContenusResultatEligibilite =
  {
    classIcone: "fr-icon-check-line",
    titre: "Votre entité serait régulée  \npar la directive NIS 2",
    fichierPrecisionSurReponse: "precisionsSurReponsePositive",
    modeFormulaireEmail: "complet",
    blocs: new Set(["etMaintenant", "enSavoirPlus", "bienDebuterAvecPdf"]),
  };
export const contenusResultatEligibleGrandeEntreprise: ContenusResultatEligibilite =
  {
    ...contenusResultatEligiblePetitEntreprise,
    blocs: new Set(["etMaintenant", "enSavoirPlus"]),
  };

export const contenusResultatNonEligible: ContenusResultatEligibilite = {
  classIcone: "fr-icon-close-line",
  titre: "Votre entité ne serait pas régulée  \npar la directive NIS 2",
  fichierPrecisionSurReponse: "precisionsSurReponseNegative",
  modeFormulaireEmail: "simple",
  blocs: new Set([]),
};
export const contenusResultatIncertain: ContenusResultatEligibilite = {
  classIcone: "fr-nis2-icon-in-progress",
  titre: "Nous ne pouvons vous répondre dans l’immédiat",
  modeFormulaireEmail: "simple",
  sousTitre:
    "Le test est en cours d’évolution pour prendre en compte l’ensemble des " +
    "typologies d’entités, mais n’est pas encore en mesure de couvrir les " +
    "paramètres qui ont été saisis.",
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
