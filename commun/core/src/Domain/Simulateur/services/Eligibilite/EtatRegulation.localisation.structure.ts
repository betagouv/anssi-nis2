import { match } from "ts-pattern";
import { VVV } from "../../../utilitaires/debug";
import { resultatIncertain } from "../../Regulation.constantes";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import { EtatRegulation } from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
  propageDonneesEvaluees,
  propageResultatIncertainEnSuspens,
} from "./EtatRegulation.fabriques";

export const evalueRegulationEtatReponseStructure = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .when(
      (r) => r._resultatEvaluationRegulation === "Definitif",
      propageDonneesEvaluees("Structure"),
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
        Structure: { typeStructure: "publique" },
      },
      () => fabriqueResultatEvaluationDefinitif("Structure", resultatIncertain),
    )
    .otherwise(propageResultatIncertainEnSuspens("Structure"));
