import { match } from "ts-pattern";
import {
  Regulation,
  ResultatRegulationIncertain,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { EtatRegulationDefinitif } from "../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import {
  libelleTitreIncertainAutrePaysUnionEuropeenne,
  libelleTitreIncertainStandard,
  libelleTitreNonRegule,
  libelleTitreReguleEntiteEssentielle,
  libelleTitreReguleEntiteImportante,
} from "../../../References/LibellesResultatsEligibilite.ts";
import {
  ActionPrecisionsResultat,
  EtatPrecisionsResultat,
} from "./LigneResultat.declarations.ts";

export const changePropriete = (
  state: EtatPrecisionsResultat,
  action: ActionPrecisionsResultat,
) => ({ ...state, [action.type]: action.value });

export type ClassesCssResultat = { icone: string; cadre: string };

const fabriqueClassesCSSResultat = (
  classeIcone: string,
  classeCadre: string,
): ClassesCssResultat => ({
  icone: classeIcone,
  cadre: classeCadre,
});
export const getClassesCssResultat = (
  etatRegulation: EtatRegulationDefinitif,
): ClassesCssResultat =>
  match(etatRegulation)
    .with({ decision: Regulation.NonRegule }, () =>
      fabriqueClassesCSSResultat("fr-icon-close-line", "fr-nis2-non-eligible"),
    )
    .with(
      {
        decision: Regulation.Incertain,
        causes: { _tag: "DefiniDansUnAutreEtatMembre" },
      },
      () =>
        fabriqueClassesCSSResultat(
          "fr-icon-question-fill",
          "fr-nis2-incertain-UE",
        ),
    )
    .with({ decision: Regulation.Regule }, () =>
      fabriqueClassesCSSResultat("fr-icon-check-line", "fr-nis2-eligible"),
    )
    .otherwise(() =>
      fabriqueClassesCSSResultat(
        "fr-nis2-icon-in-progress",
        "fr-nis2-incertain",
      ),
    );

export const recupereTitrePourEtatEvaluation = (
  etatRegulation: EtatRegulationDefinitif,
) =>
  match(etatRegulation)
    .with(
      {
        decision: "Regule",
        typeEntite: "EntiteEssentielle",
      },
      () => libelleTitreReguleEntiteEssentielle,
    )
    .with(
      { decision: "Regule", typeEntite: "EntiteImportante" },
      () => libelleTitreReguleEntiteImportante,
    )
    .with({ decision: "NonRegule" }, () => libelleTitreNonRegule)
    .with(
      {
        // TODO : insérer une précision resultat pour incertain - PrecisionsResultat.AutrePaysUnionEuropeenne
        decision: "Incertain",
      },
      () => libelleTitreIncertainAutrePaysUnionEuropeenne,
    )
    .otherwise(() => libelleTitreIncertainStandard);
export const estCasNonGere = (etatRegulation: EtatRegulationDefinitif) =>
  etatRegulation.decision === "Incertain" &&
  (etatRegulation as ResultatRegulationIncertain).causes._tag ===
    "ConstructionTestEnCours";
