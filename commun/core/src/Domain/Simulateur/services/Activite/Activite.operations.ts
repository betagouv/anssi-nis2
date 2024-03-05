import { Activite } from "../../Activite.definitions";
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
} from "../../Activite.valeurs";
import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteursSansSousSecteur,
} from "../../SecteurActivite.definitions";
import {
  PeutEtreSousSecteurActivite,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { estUnSecteurAvecDesSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats";
import { cartographieSousSecteursParSecteur } from "../SousSecteurActivite/SousSecteurActivite.operations";

export const activitesParSecteurEtSousSecteur: Record<
  ValeurCleSectorielle,
  readonly Activite[]
> = {
  administrationPublique: ValeursActivitesAdministrationPublique,
  autreSecteurActivite: [],
  autreSousSecteurEnergie: [],
  autreSousSecteurFabrication: [],
  autreSousSecteurTransports: [],
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
  donneesFormulaire: DonneesFormulaireSimulateur,
) => AssociationSectorielleActivite[] = (
  libellesSecteursActivite,
  libellesSousSecteursActivite,
  donneesFormulaire,
) =>
  cartographieSousSecteursParSecteur(donneesFormulaire).reduce<
    AssociationSectorielleActivite[]
  >(
    (acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) =>
      acc.concat(
        rempliSousSecteurs(
          listeSousSecteurs,
          secteur,
          libellesSecteursActivite[secteur],
          libellesSousSecteursActivite,
        ),
      ),
    [],
  );
const getValeurCleSectorielle = <T>(
  secteur: T,
  sousSecteur: PeutEtreSousSecteurActivite,
): ValeurCleSectorielle =>
  (sousSecteur !== "PasDeSousSecteurActivite"
    ? sousSecteur
    : secteur) as ValeurCleSectorielle;
export const getActivitesPour = <T extends SecteurActivite>(
  secteur: T,
  sousSecteur: PeutEtreSousSecteurActivite,
) => [
  ...activitesParSecteurEtSousSecteur[
    getValeurCleSectorielle(secteur, sousSecteur)
  ],
];
