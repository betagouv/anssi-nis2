import {
  ValeursActivitesAdministrationPublique,
  ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  ValeursActivitesEauPotable,
  ValeursActivitesEauUsees,
  ValeursActivitesElectricite,
  ValeursActivitesEspace,
  ValeursActivitesFabricationAutreMaterielsTransports,
  ValeursActivitesFabricationDispositifsMedicaux,
  ValeursActivitesFabricationEquipementsElectroniques,
  ValeursActivitesFabricationMachinesEquipements,
  ValeursActivitesFabricationProductionDistributionProduitsChimiques,
  ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  ValeursActivitesFournisseursNumeriques,
  ValeursActivitesGaz,
  ValeursActivitesGestionDechets,
  ValeursActivitesGestionServicesTic,
  ValeursActivitesHydrogene,
  ValeursActivitesInfrastructureMarcheFinancier,
  ValeursActivitesInfrastructureNumerique,
  ValeursActivitesPetrole,
  ValeursActivitesProductionTransformationDistributionDenreesAlimentaires,
  ValeursActivitesRecherche,
  ValeursActivitesReseauxChaleurFroid,
  ValeursActivitesSante,
  ValeursActivitesSecteurBancaire,
  ValeursActivitesServicesPostauxExpedition,
  ValeursActivitesTransportsAeriens,
  ValeursActivitesTransportsFerroviaires,
  ValeursActivitesTransportsParEaux,
  ValeursActivitesTransportsRoutiers,
} from "../../Activite.valeurs.ts";
import { ValeurCleSectorielle } from "../../ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../../Activite.definitions.ts";
import { SecteurActivite } from "../../SecteurActivite.definitions.ts";
import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import { cartographieSousSecteursParSecteur } from "../SousSecteurActivite/SousSecteurActivite.operations.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats.ts";

export const activitesParSecteurEtSousSecteur: Record<
  ValeurCleSectorielle,
  readonly ValeursActivites[]
> = {
  administrationPublique: ValeursActivitesAdministrationPublique,
  autreSecteurActivite: [],
  autreSousSecteurEnergie: [],
  autreSousSecteurFabrication: [],
  autreSousSecteurTransport: [],
  banqueSecteurBancaire: ValeursActivitesSecteurBancaire,
  constructionVehiculesAutomobiles:
    ValeursActivitesConstructionVehiculesAutomobilesRemorquesSemi,
  eauPotable: ValeursActivitesEauPotable,
  eauxUsees: ValeursActivitesEauUsees,
  electricite: ValeursActivitesElectricite,
  espace: ValeursActivitesEspace,
  fabricationAutresMaterielTransports:
    ValeursActivitesFabricationAutreMaterielsTransports,
  fabricationDispositifsMedicaux:
    ValeursActivitesFabricationDispositifsMedicaux,
  fabricationEquipementsElectroniques:
    ValeursActivitesFabricationEquipementsElectroniques,
  fabricationFabricationProduitsInformatiquesElectroniquesOptiques:
    ValeursActivitesFabricationProduitsInformatiquesElectroniquesOptiques,
  fabricationMachinesEquipements:
    ValeursActivitesFabricationMachinesEquipements,
  fabricationProductionDistributionProduitsChimiques:
    ValeursActivitesFabricationProductionDistributionProduitsChimiques,
  fournisseursNumeriques: ValeursActivitesFournisseursNumeriques,
  gaz: ValeursActivitesGaz,
  gestionDechets: ValeursActivitesGestionDechets,
  gestionServicesTic: ValeursActivitesGestionServicesTic,
  hydrogene: ValeursActivitesHydrogene,
  infrastructureMarchesFinanciers:
    ValeursActivitesInfrastructureMarcheFinancier,
  infrastructureNumerique: ValeursActivitesInfrastructureNumerique,
  petrole: ValeursActivitesPetrole,
  productionTransformationDistributionDenreesAlimentaires:
    ValeursActivitesProductionTransformationDistributionDenreesAlimentaires,
  recherche: ValeursActivitesRecherche,
  reseauxChaleurFroid: ValeursActivitesReseauxChaleurFroid,
  sante: ValeursActivitesSante,
  servicesPostauxExpedition: ValeursActivitesServicesPostauxExpedition,
  transportsAeriens: ValeursActivitesTransportsAeriens,
  transportsFerroviaires: ValeursActivitesTransportsFerroviaires,
  transportsParEau: ValeursActivitesTransportsParEaux,
  transportsRoutiers: ValeursActivitesTransportsRoutiers,
};
export type AssociationSectorielleActivite = {
  secteurOuSousSecteur: ValeurCleSectorielle;
  titreActivite: string;
};
const collecteTitresSecteursSimples = (
  libelleSecteursActivite: string,
  secteur: SecteursSansSousSecteur,
): AssociationSectorielleActivite[] => [
  {
    titreActivite: libelleSecteursActivite,
    secteurOuSousSecteur: secteur,
  },
];
const collecteTitreSousSecteurs: (
  libelleSecteursActivite: string,
  listeSousSecteurs: SousSecteurActivite[],
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
) => AssociationSectorielleActivite[] = (
  libelleSecteursActivite: string,
  listeSousSecteurs: SousSecteurActivite[],
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
) =>
  listeSousSecteurs.map((sousSecteur: SousSecteurActivite) => ({
    secteurOuSousSecteur: sousSecteur,
    titreActivite: `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
  }));
const rempliSousSecteurs = (
  listeSousSecteurs: SousSecteurActivite[],
  secteur: SecteurActivite,
  libelleSecteursActivite: string,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
): AssociationSectorielleActivite[] => {
  if (
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    listeSousSecteurs.length === 0
  )
    throw Error(
      `Houla! un secteur avec sous secteurs n'en n'a pas ! ${secteur}`,
    );
  return listeSousSecteurs.length === 0
    ? collecteTitresSecteursSimples(
        libelleSecteursActivite,
        secteur as SecteursSansSousSecteur,
      )
    : collecteTitreSousSecteurs(
        libelleSecteursActivite,
        listeSousSecteurs,
        libellesSousSecteursActivite,
      );
};
export const collecteTitresPourActivite: (
  libellesSecteursActivite: Record<SecteurActivite, string>,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) => AssociationSectorielleActivite[] = (
  libellesSecteursActivite,
  libellesSousSecteursActivite,
  donneesFormulaire,
) =>
  cartographieSousSecteursParSecteur(donneesFormulaire).reduce<
    AssociationSectorielleActivite[]
  >((acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) => {
    return acc.concat(
      rempliSousSecteurs(
        listeSousSecteurs,
        secteur,
        libellesSecteursActivite[secteur],
        libellesSousSecteursActivite,
      ),
    );
  }, []);
export const fabriqueListeActivitesDesSecteurs = (
  secteurActivite: ValeurCleSectorielle[],
  filtreActivite: (activite: ValeursActivites) => boolean,
): ValeursActivites[] => {
  return Array.from(
    secteurActivite.reduce((ensembleActivites, secteur) => {
      activitesParSecteurEtSousSecteur[secteur]
        ?.filter(filtreActivite)
        .map((activite: ValeursActivites) => ensembleActivites.add(activite));
      return ensembleActivites;
    }, new Set<ValeursActivites>()),
  );
};
