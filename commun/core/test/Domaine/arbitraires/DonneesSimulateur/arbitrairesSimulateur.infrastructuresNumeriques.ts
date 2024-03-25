import { Activite } from "../../../../src/Domain/Simulateur/Activite.definitions";
import { exerceAucuneActivitesDansListe } from "../../../../src/Domain/Simulateur/Activite.predicats";
import { DonneesSectorielles } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
} from "../../../utilitaires/manipulationArbitraires";
import { fabriqueArbEnrSecteurSousSecteurs } from "../../../utilitaires/manipulationArbitraires.fabriques";
import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
} from "../../exemples/ListesEnrSecteursSousSecteur";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "../ValeursChampsSimulateur.arbitraire";

const arbSecteurSousSecteurInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
  { minLength: 1 },
);
const arbSecteurSousSecteurNonInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreEnrSectorielHorsSecteurs([
    "infrastructureNumerique",
    "autreSecteurActivite",
  ]),
  { minLength: 1 },
);

export const arbNonOSEPrivesPetitFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurInfraNum)
    .avec({
      designationOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheChiffreAffaire: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      appartenancePaysUnionEuropeenne:
        arbappartenancePaysUnionEuropeenne.france,
    })
    .chain(ajouteAuMoinsUneActiviteListee)
    .chain(ajouteChampsFacultatifs);

const valeursActivitesInfrastructureNumerique = [
  "fournisseurReseauxCommunicationElectroniquesPublics",
  "fournisseurServiceCommunicationElectroniquesPublics",
  "prestataireServiceConfianceQualifie",
  "prestataireServiceConfianceNonQualifie",
  "registresNomsDomainesPremierNiveau",
  "fournisseurServicesDNS",
] as Activite[];
const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    exerceAucuneActivitesDansListe(valeursActivitesInfrastructureNumerique),
  );

const arbNonOSEPrivesPetitHorsFournisseurInfraNum = etend<DonneesSectorielles>(
  arbSecteurSousSecteurNonInfraNum,
)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);

export const arbFournisseursInfrastructureNumerique = {
  petitInfraNum: arbNonOSEPrivesPetitFournisseurInfraNum,
  activitesNonConcernes:
    arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  listeNonFournisseursInfrastructureNumerique:
    arbNonOSEPrivesPetitHorsFournisseurInfraNum,
};
