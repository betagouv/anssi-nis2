import { match, P } from "ts-pattern";
import { tous } from "../../../../../../utils/services/sets.operations";
import { ou } from "../../../../../../utils/services/commun.predicats";
import { resultatNonRegule } from "../../Regulation.constantes";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import {
  EtatEvaluationEnSuspens,
  EtatRegulation,
} from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
  propageDonneesEvaluees,
  propageResultatIncertainEnSuspens,
} from "./EtatRegulation.fabriques";
import { evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand } from "./EtatRegulation.Grand.operations";
import { evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen } from "./EtatRegulation.Moyen.operations";
import { evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit } from "./EtatRegulation.Petit.operations";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";
import {
  estInformationSecteurSecteurAutre,
  estInformationSecteurSousSecteurAutre,
} from "./ReponseInformationsSecteur.predicats";

export const evalueRegulationEtatReponseInformationsSecteurEnSuspens = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur,
): EtatRegulation =>
  match(reponse.Structure._categorieTaille)
    .with("Petit", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit(
        reponse as EtatEvaluationEnSuspens &
          ReponseEtatInformationsSecteur<"Petit">,
      ),
    )
    .with("Moyen", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen(
        reponse as EtatEvaluationEnSuspens &
          ReponseEtatInformationsSecteur<"Moyen">,
      ),
    )
    .with("Grand", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand(
        reponse as EtatEvaluationEnSuspens &
          ReponseEtatInformationsSecteur<"Grand">,
      ),
    )
    .exhaustive();

export const evalueRegulationEtatReponseInformationsSecteur = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(resultatEstDefinitif, propageDonneesEvaluees("InformationsSecteur"))
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(
              ou(
                estInformationSecteurSecteurAutre,
                estInformationSecteurSousSecteurAutre,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
      },
      (reponse) =>
        evalueRegulationEtatReponseInformationsSecteurEnSuspens(
          reponse as EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur,
        ),
    )
    .otherwise(propageResultatIncertainEnSuspens("InformationsSecteur"));
