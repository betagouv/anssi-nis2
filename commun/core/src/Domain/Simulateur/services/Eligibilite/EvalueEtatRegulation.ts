import { flow } from "fp-ts/lib/function";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "./EtatRegulation.definitions";
import { evalueRegulationEtatReponseLocalisation } from "./EtatRegulation.localisation.operations";
import { evalueRegulationEtatReponseStructure } from "./EtatRegulation.localisation.structure";
import { evalueRegulationEtatReponseInformationsSecteur } from "./EtatRegulation.operations";
import { evalueRegulationEtatReponseOse } from "./EtatRegulation.ose.operations";

export const evalueEtatRegulation: (
  reponse: EtatRegulation,
) => EtatRegulationDefinitif = flow(
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseStructure,
  evalueRegulationEtatReponseInformationsSecteur,
) as (reponse: EtatRegulation) => EtatRegulationDefinitif;
