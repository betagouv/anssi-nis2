import { fc } from "@fast-check/vitest";
import {
  IDonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteAuMoinsUneActiviteListee,
  DonneesSectorielles,
  etend,
  fabriqueArbEnrSecteurSousSecteurs,
} from "../../utilitaires/manipulationArbitraires";
import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
} from "../../Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../../src/Domaine/Simulateur/Eligibilite.constantes";
import { exerceActiviteDansListe, exerceUniquementActivitesDansListe, exerceAucuneActivitesDansListe } from "../../../src/Domaine/Simulateur/services/Activite/Activite.predicats";

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

const arbNonOSEPrivesPetitFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurInfraNum)
    .avec({
      designeOperateurServicesEssentiels: arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(ajouteAuMoinsUneActiviteListee);



const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    exerceAucuneActivitesDansListe([...ValeursActivitesConcernesInfrastructureNumerique, ...ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement])
  );

const arbNonOSEPrivesPetitHorsFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurNonInfraNum)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(ajouteAuMoinsUneActiviteListee);

export const arbFournisseursInfrastructureNumerique = {
  fournisseursInfrastructureNumerique: arbNonOSEPrivesPetitFournisseurInfraNum,
  fournisseursInfraNum: {
    /** Petite entité privéé exerçant une Activités dans la liste {@link ValeursActivitesConcernesInfrastructureNumerique} */
    activitesConcernes: arbNonOSEPrivesPetitFournisseurInfraNum.filter(
      exerceActiviteDansListe(ValeursActivitesConcernesInfrastructureNumerique)
    ) as fc.Arbitrary<IDonneesFormulaireSimulateur>,
    petitInfraNum: {
      representantFrance: etend(arbNonOSEPrivesPetitFournisseurInfraNum.filter(
        exerceUniquementActivitesDansListe(ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement)
      )).avec({
        fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
        localisationRepresentant: arbLocalisationRepresentant.france,
      })
    },
    activitesNonConcernes: arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  },
  listeNonFournisseursInfrastructureNumerique: arbNonOSEPrivesPetitHorsFournisseurInfraNum,
};

