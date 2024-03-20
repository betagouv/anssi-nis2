import { P, match } from "ts-pattern";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import { EtatRegulation } from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationReguleOse,
  propageDonneesEvaluees,
  propageResultatIncertainEnSuspens,
} from "./EtatRegulation.fabriques";

export const evalueRegulationEtatReponseOse = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      resultatEstDefinitif,
      propageDonneesEvaluees("DesignationOperateurServicesEssentiels"),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      },
      fabriqueResultatEvaluationReguleOse,
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: P.union("non", "nsp"),
        },
      },
      propageResultatIncertainEnSuspens(
        "DesignationOperateurServicesEssentiels",
      ),
    )
    .otherwise(
      propageResultatIncertainEnSuspens(
        "DesignationOperateurServicesEssentiels",
      ),
    );
