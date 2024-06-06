import { Regle } from "../Specifications.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { Activite } from "../../../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { libellesActivites } from "../../../References/LibellesActivites.ts";

export class RegleActivites implements Regle {
  constructor(private readonly activite: Activite) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const activites = reponses.activites;
    return contientUnParmi(this.activite)(activites);
  }

  static nouvelle(texte: SpecificationTexte): RegleActivites | undefined {
    const valeur = texte["Activités"];

    if (!valeur) return;

    return valeur === "Autre activité"
      ? recupereAutreActivite(texte)
      : recupereActiviteIdentifiee(valeur);
  }
}

const recupereAutreActivite = (texte: SpecificationTexte) => {
  const secteur = texte["Secteurs"];
  switch (secteur) {
    case "Infrastructure numérique":
      return new RegleActivites("autreActiviteInfrastructureNumerique");
    case "Gestion des services TIC":
      return new RegleActivites("autreActiviteGestionServicesTic");
    case "Fournisseurs numériques":
      return new RegleActivites("autreActiviteFournisseursNumeriques");
    case "Banques (secteur bancaire)":
      return new RegleActivites("autreActiviteSecteurBancaire");
    case "Eau potable":
      return new RegleActivites("autreActiviteEauPotable");
    case "Eaux usées":
      return new RegleActivites("autreActiviteEauxUsees");
    case "Fabrication, production et distribution de produits chimiques":
      return new RegleActivites(
        "autreActiviteFabricationProductionDistributionProduitsChimiques",
      );
    case "Infrastructure des marchés financiers":
      return new RegleActivites("autreActiviteInfrastructureMarcheFinancier");
    case "Production transformation et distribution de denrées alimentaires":
      return new RegleActivites(
        "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
      );
    case "Recherche":
      return new RegleActivites("autreActiviteRecherche");
    default:
      throw new ErreurLectureDeRegle(
        `"Autre activité" pour le secteur ${secteur}`,
        "Activités",
      );
  }
};

const recupereActiviteIdentifiee = (valeur: string) => {
  const activiteCorrespondante = Object.entries(libellesActivites).find(
    ([, libelle]) => libelle === valeur,
  );

  if (!activiteCorrespondante)
    throw new ErreurLectureDeRegle(valeur, "Activités");

  const [id] = activiteCorrespondante;
  return new RegleActivites(id as Activite);
};
