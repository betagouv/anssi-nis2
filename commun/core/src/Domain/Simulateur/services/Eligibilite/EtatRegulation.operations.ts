import { match, P } from "ts-pattern";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estSecteurAutre } from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationEnSuspens,
} from "./EtatRegulation.definition";
import {
  fabriqueResultatEnSuspensOse,
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationReguleOse,
} from "./EtatRegulation.fabriques";
import {
  EtapesEvaluationActives,
  InformationsSecteursComposite,
  ReponseInformationsSecteurGrand,
  ReponseInformationsSecteurPetit,
} from "./Reponse.definitions";
import { propReponseEtat } from "./Reponse.operations";
import {
  estReponseEtatInformationsSecteur,
  estReponseInformationsSecteurPetit,
  estSecteurBienLocaliseHorsFrancePetit,
  estSecteurBienLocalisePetit,
} from "./Reponse.predicats";

const propageDonneesEvaluees =
  (etape: EtapesEvaluationActives) =>
  (reponse: ResultatEvaluationRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });
export const evalueRegulationEtatReponseOse = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
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
      fabriqueResultatEnSuspensOse(reponse),
    )
    .otherwise(fabriqueResultatEnSuspensOse(reponse));
export const evalueRegulationEtatReponseLocalisation = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("AppartenancePaysUnionEuropeenne"),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: P.not("france"),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          resultatIncertain,
        ),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "AppartenancePaysUnionEuropeenne",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
export const evalueRegulationEtatReponseStructure = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("Structure"),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "Structure",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );

export const contientEnsembleAutresSecteurs = (
  info: ResultatEvaluationRegulation,
) =>
  estReponseEtatInformationsSecteur(info) &&
  [...info.InformationsSecteur.secteurs].every(
    (sec) =>
      estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
      estSousSecteurAutre(
        (sec as InformationsSecteursComposite)
          ?.sousSecteurActivite as SousSecteurActivite,
      ),
  );

// const tous = <T>(ensemble: Set<T>) => [...ensemble].every;

export const contientEnsembleSecteursRepresentantsLocalisesFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  [...info.secteurs].every(estSecteurBienLocalisePetit);
export const contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  [...info.secteurs].every(estSecteurBienLocaliseHorsFrancePetit);

export const evalueRegulationEtatReponseInformationsSecteur = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("InformationsSecteur"),
    )
    .when(contientEnsembleAutresSecteurs, () =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    )
    .with(
      {
        _tag: "InformationsSecteur",
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
        InformationsSecteur: P.when(
          contientEnsembleSecteursRepresentantsLocalisesFrancePetit,
        ),
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule({
            ...propReponseEtat(reponse)("Structure"),
            ...propReponseEtat(reponse)("InformationsSecteur"),
          }),
        ),
    )
    .with(
      {
        _tag: "InformationsSecteur",
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
        InformationsSecteur: P.when(
          contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit,
        ),
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        _tag: "InformationsSecteur",
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule({
            ...propReponseEtat(reponse)("Structure"),
            ...propReponseEtat(reponse)("InformationsSecteur"),
          }),
        ),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "InformationsSecteur",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
