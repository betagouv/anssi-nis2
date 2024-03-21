import { match } from "ts-pattern";
import { fabriqueIncertain } from "../../fabriques/ResultatRegulation.fabrique";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import { EtatRegulation } from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
  propageDonneesEvaluees,
  propageResultatIncertainEnSuspens,
} from "./EtatRegulation.fabriques";

export const evalueRegulationEtatReponseLocalisation = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      resultatEstDefinitif,
      propageDonneesEvaluees("AppartenancePaysUnionEuropeenne"),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "autre",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          fabriqueIncertain({ _tag: "DefiniDansUnAutreEtatMembre" }),
        ),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "horsue",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          fabriqueIncertain({
            _tag: "ConstructionTestEnCours",
            typeConstructionEnCours: "HorsUnionEuropeenne",
          }),
        ),
    )
    .otherwise(
      propageResultatIncertainEnSuspens("AppartenancePaysUnionEuropeenne"),
    );
