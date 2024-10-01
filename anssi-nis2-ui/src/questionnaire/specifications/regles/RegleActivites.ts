import { estValeurVide, Regle } from "../Specifications.ts";
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

    if (estValeurVide(valeur)) return;

    return valeur === "Autre activité"
      ? recupereAutreActivite(texte)
      : valeur === "Gestionnaire de réseau de transport"
      ? recupereReseauTransport(texte)
      : recupereActiviteIdentifiee(valeur);
  }
}

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
  "Services postaux et d'expédition": "autreActiviteServicesPostauxExpedition",
  Espace: "autreActiviteEspace",
  "Gestion des déchets": "autreActiviteGestionDechets",
  Santé: "autreActiviteSante",
};

const mappingEnergie: Record<string, Activite> = {
  Électricité: "autreActiviteElectricite",
  Gaz: "autreActiviteGaz",
  Hydrogène: "autreActiviteHydrogene",
  Pétrole: "autreActivitePetrole",
  "Réseaux de chaleur et de froid": "autreActiviteReseauxChaleurFroid",
};

const mappingFabrication: Record<string, Activite> = {
  "Construction de véhicules automobiles, remorques et semi- remorques":
    "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
  "Fabrication de dispositifs médicaux et de dispositifs médicaux de diagnostic in vitro":
    "autreActiviteFabricationDispositifsMedicaux",
  "Fabrication de produits informatiques, électroniques et optiques":
    "autreActiviteFabricationProduitsInformatiquesElectroniquesOptiques",
  "Fabrication de machines et équipements n.c.a.":
    "autreActiviteFabricationMachinesEquipements",
  "Fabrication d'équipements électriques":
    "autreActiviteFabricationEquipementsElectroniques",
  "Fabrication d'autres matériels de transport":
    "autreActiviteConstructionVehiculesAutomobilesRemorquesSemi",
};

const mappingTransports: Record<string, Activite> = {
  Aériens: "autreActiviteTransportsAeriens",
  Ferroviaires: "autreActiviteTransportsFerroviaires",
  "Par eau": "autreActiviteTransportsParEaux",
  Routiers: "autreActiviteTransportsRoutiers",
};

const recupereAutreActivite = (texte: SpecificationTexte) => {
  const secteur = texte["Secteurs"];
  const sousSecteur = texte["Sous-secteurs"];

  const estMappingDirect = Object.keys(mappingDirect).includes(secteur);
  if (estMappingDirect) return new RegleActivites(mappingDirect[secteur]);

  const mappingsParSousSecteurs: Record<string, Record<string, Activite>> = {
    Énergie: mappingEnergie,
    Fabrication: mappingFabrication,
    Transports: mappingTransports,
  };

  const secteursAvecAutreActivite = Object.keys(mappingsParSousSecteurs);
  const secteurConnu = secteursAvecAutreActivite.includes(secteur);
  if (!secteurConnu)
    throw new ErreurLectureDeRegle(
      `"Autre activité" pour le secteur ${secteur} (sous-secteur : ${sousSecteur})`,
      "Activités",
    );

  const activite = mappingsParSousSecteurs[secteur][sousSecteur];

  if (!activite)
    throw new ErreurLectureDeRegle(
      `"Autre activité" pour le secteur ${secteur} (sous-secteur : ${sousSecteur})`,
      "Activités",
    );

  return new RegleActivites(activite);
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

const recupereReseauTransport = (texte: SpecificationTexte) => {
  const sousSecteur = texte["Sous-secteurs"];

  if (sousSecteur === "Électricité")
    return new RegleActivites("gestionnaireReseauTransportElectricite");
  if (sousSecteur === "Gaz")
    return new RegleActivites("gestionnaireReseauTransportGaz");

  throw new ErreurLectureDeRegle(
    `"Gestionnaire de réseau de transport" pour le sous-secteur : ${sousSecteur}`,
    "Activités",
  );
};
