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
  const sousSecteur = texte["Sous-secteurs"];

  const mappingDirect: Record<string, Activite> = {
    "Infrastructure numérique": "autreActiviteInfrastructureNumerique",
    "Gestion des services TIC": "autreActiviteGestionServicesTic",
    "Fournisseurs numériques": "autreActiviteFournisseursNumeriques",
    "Banques (secteur bancaire)": "autreActiviteSecteurBancaire",
    "Eau potable": "autreActiviteEauPotable",
    "Eaux usées": "autreActiviteEauxUsees",
    "Fabrication, production et distribution de produits chimiques":
      "autreActiviteFabricationProductionDistributionProduitsChimiques",
    "Infrastructure des marchés financiers":
      "autreActiviteInfrastructureMarcheFinancier",
    "Production transformation et distribution de denrées alimentaires":
      "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
    Recherche: "autreActiviteRecherche",
    "Services postaux et d'expédition":
      "autreActiviteServicesPostauxExpedition",
    Espace: "autreActiviteEspace",
    "Gestion des déchets": "autreActiviteGestionDechets",
  };

  const estMappingDirect = Object.keys(mappingDirect).includes(secteur);
  if (estMappingDirect) return new RegleActivites(mappingDirect[secteur]);

  if (secteur === "Énergie") {
    const mappingEnergie: Record<string, Activite> = {
      Électricité: "autreActiviteElectricite",
      Gaz: "autreActiviteGaz",
    };
    const activite = mappingEnergie[sousSecteur];

    if (!activite)
      throw new ErreurLectureDeRegle(
        `"Autre activité" pour le secteur ${secteur} (sous-secteur : ${sousSecteur})`,
        "Activités",
      );

    return new RegleActivites(activite);
  }

  throw new ErreurLectureDeRegle(
    `"Autre activité" pour le secteur ${secteur} (sous-secteur : ${sousSecteur})`,
    "Activités",
  );
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
