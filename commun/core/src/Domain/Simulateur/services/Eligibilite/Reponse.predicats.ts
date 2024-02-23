import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { VVVPipe } from "../../../utilitaires/debug";
import { Activite } from "../../Activite.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estActiviteListee } from "../Activite/Activite.predicats";
import {
  estSecteurAutre,
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite,
  estSecteurListe,
  estSecteurAvecActivitesEssentielles,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { estReponseEtatInformationsSecteur } from "./EtatRegulation.predicats";
import {
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisableGrandeEntite,
  InformationSecteurLocalisablePetiteEntite,
  InformationSecteurPossible,
  InformationSecteurPossibleGrand,
  InformationSecteurPossiblePetit,
  InformationsSecteurPossibleNonLocalisees,
  InformationsSecteurPossiblesAutre,
  InformationsSecteursComposite,
  ReponseInformationsSecteur,
} from "./Reponse.definitions";

export const estReponseInformationsSecteurPetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
): info is ReponseInformationsSecteur<"Petit"> =>
  info._categorieTaille === "Petit";
export const estReponseInformationsSecteurGrand = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
): info is ReponseInformationsSecteur<"Grand"> =>
  info._categorieTaille === "Grand";

export const eqInformationsSecteur = (
  a: InformationSecteurPossible,
  b: InformationSecteurPossible,
) => a.secteurActivite === b.secteurActivite;
export const estEtablissementPrincipalFournitUE = (
  reponse:
    | InformationSecteurLocalisablePetiteEntite
    | EtablissementPrincipalFournitUE,
): reponse is EtablissementPrincipalFournitUE =>
  reponse.fournitServicesUnionEuropeenne === "oui";

export const estInformationSecteurAvecActivitesEssentielles = (
  informationsSecteur: InformationSecteurPossible,
) =>
  estSecteurAvecActivitesEssentielles(
    informationsSecteur.secteurActivite as SecteurActivite,
  );
export const estInformationSecteurAvecActivitesEssentiellesGrand = (
  informationsSecteur: InformationSecteurPossible,
) =>
  estSecteurAvecActivitesEssentielles(
    informationsSecteur.secteurActivite as SecteurActivite,
  );

export const estInformationSecteurLocalisablePetiteEntreprise = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisablePetiteEntite =>
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estInformationSecteurLocalisableGrandeEntite = (
  sec:
    | InformationSecteurPossibleGrand
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisableGrandeEntite =>
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite(
    sec.secteurActivite as SecteurActivite,
  ) ||
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estSecteurBienLocalisePetit = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisablePetiteEntreprise(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseGrand = (
  sec:
    | InformationSecteurPossibleGrand
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisableGrandeEntite(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseHorsFrancePetit = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisablePetiteEntreprise(sec) &&
  (sec.fournitServicesUnionEuropeenne === "non" ||
    (sec.fournitServicesUnionEuropeenne === "oui" &&
      sec.localisationRepresentant !== "france"));
export const contientEnsembleAutresSecteurs = (
  info: ResultatEvaluationRegulation,
) =>
  estReponseEtatInformationsSecteur(info) &&
  tous(
    (sec: InformationSecteurPossiblePetit) =>
      estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
      estSousSecteurAutre(
        (sec as InformationsSecteursComposite)
          ?.sousSecteurActivite as SousSecteurActivite,
      ),
  )(info.InformationsSecteur.secteurs);
export const contientEnsembleSecteursRepresentantsLocalisesFrancePetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estSecteurBienLocalisePetit)(info.secteurs);
export const contientEnsembleSecteursRepresentantsLocalisesFranceGrand = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurGrand(info) &&
  tous(estSecteurBienLocaliseGrand)(info.secteurs);
export const contientEnsembleSecteursRepresentantsLocalisesFranceGrandEE = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurGrand(info) &&
  tous(estSecteurBienLocaliseGrand)(info.secteurs);

const estInformationsSecteurEligible = flow(
  prop("secteurActivite"),
  estSecteurListe,
);
const auMoinsUneActiviteListee = flow(
  prop<Set<Activite>, "activites">("activites"),
  certains(estActiviteListee),
);
export const contientEnsembleSecteursEtActiviteListeesListesSansRepresantGrand =
  (
    info:
      | ReponseInformationsSecteur<"Petit">
      | ReponseInformationsSecteur<"Grand">,
  ) =>
    estReponseInformationsSecteurGrand(info) &&
    tous(estInformationsSecteurEligible)(
      info.secteurs as Set<{ secteurActivite: SecteurActivite }>,
    ) &&
    certains(auMoinsUneActiviteListee)(
      info.secteurs as Set<{ activites: Set<Activite> }>,
    );

export const contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estSecteurBienLocaliseHorsFrancePetit)(info.secteurs);
export const contientEnsembleSecteursNonEligiblesPetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estInformationSecteurAvecActivitesEssentielles)(info.secteurs);
export const contientEnsembleSecteursNonEligiblesGrand = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurGrand(info) &&
  tous(estInformationSecteurAvecActivitesEssentiellesGrand)(info.secteurs);
