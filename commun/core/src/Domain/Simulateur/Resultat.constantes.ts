import {
  PrecisionResultat,
  PrecisionResultatRegulation,
} from "./Resultat.declarations";

export const PrecisionsResultatRegulation: Record<
  PrecisionResultatRegulation,
  PrecisionResultatRegulation
> = {
  ReguleStandard: "ReguleStandard",
  ReguleDORA: "ReguleDORA",
  ReguleEnregistrementDeNomsDeDomaine: "ReguleEnregistrementDeNomsDeDomaine",
  NonReguleStandard: "NonReguleStandard",
  NonReguleHorsUnionEuropeenne: "NonReguleHorsUnionEuropeenne",
  IncertainStandard: "IncertainStandard",
  IncertainAutrePaysUnionEuropeenne: "IncertainAutrePaysUnionEuropeenne",
};
export const PrecisionsResultat: Record<PrecisionResultat, PrecisionResultat> =
  {
    AutrePaysUnionEuropeenne: "AutrePaysUnionEuropeenne",
    DORA: "DORA",
    EnregistrementDeNomsDeDomaine: "EnregistrementDeNomsDeDomaine",
    HorsUnionEuropeenne: "HorsUnionEuropeenne",
    Standard: "Standard",
  };
