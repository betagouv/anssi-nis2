import { DonneesSectorielles } from "../../../src/Domain/Simulateur/DonneesFormulaire";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../../src/Domain/Simulateur/Eligibilite.constantes";
import {
  exerceActiviteDansListe,
  exerceAucuneActivitesDansListe,
  exerceUniquementActivitesDansListe,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
  fabriqueArbEnrSecteurSousSecteurs,
} from "../../utilitaires/manipulationArbitraires";
import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
} from "../exemples/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";

const arbSecteurSousSecteurInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
  { minLength: 1 }
);
const arbSecteurSousSecteurNonInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreEnrSectorielHorsSecteurs([
    "infrastructureNumerique",
    "autreSecteurActivite",
  ]),
  { minLength: 1 }
);

export const arbNonOSEPrivesPetitFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurInfraNum)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(ajouteAuMoinsUneActiviteListee)
    .chain(ajouteChampsFacultatifs);

const valeursActivitesInfrastructureNumerique = [
  ...ValeursActivitesConcernesInfrastructureNumerique,
  ...ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
];
const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    exerceAucuneActivitesDansListe(valeursActivitesInfrastructureNumerique)
  );

const arbNonOSEPrivesPetitHorsFournisseurInfraNum = etend<DonneesSectorielles>(
  arbSecteurSousSecteurNonInfraNum
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);

const extendInfranumDNSOuNomDomaine = etend(
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    exerceUniquementActivitesDansListe(
      ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement
    )
  )
);
const infraNumDNSOuNomDomaine = {
  neFournitPasEnUE: extendInfranumDNSOuNomDomaine.avec({
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.non,
  }),
  representantFrance: extendInfranumDNSOuNomDomaine.avec({
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.france,
  }),
  representantUE: extendInfranumDNSOuNomDomaine.avec({
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.autre,
  }),
  representantHorsUE: extendInfranumDNSOuNomDomaine.avec({
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.horsue,
  }),
};

export const arbFournisseursInfrastructureNumerique = {
  fournisseursInfraNum: {
    petitInfraNum: {
      /** Petite entité privéé exerçant une Activités dans la liste {@link ValeursActivitesConcernesInfrastructureNumerique} */
      activitesConcernes: arbNonOSEPrivesPetitFournisseurInfraNum.filter(
        exerceActiviteDansListe(
          ValeursActivitesConcernesInfrastructureNumerique
        )
      ),
      infraNumDNSOuNomDomaine,
    },
    activitesNonConcernes:
      arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  },
  listeNonFournisseursInfrastructureNumerique:
    arbNonOSEPrivesPetitHorsFournisseurInfraNum,
};
