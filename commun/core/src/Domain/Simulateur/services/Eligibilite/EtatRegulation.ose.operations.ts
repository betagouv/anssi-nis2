import { match } from "ts-pattern";
import { resultatIncertain } from "../../Regulation.constantes";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import { EtatRegulation } from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
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
          designationOperateurServicesEssentiels: "non",
        },
      },
      propageResultatIncertainEnSuspens(
        "DesignationOperateurServicesEssentiels",
      ),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "nsp",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "DesignationOperateurServicesEssentiels",
          resultatIncertain,
        ),
    )
    .otherwise(
      propageResultatIncertainEnSuspens(
        "DesignationOperateurServicesEssentiels",
      ),
    );
