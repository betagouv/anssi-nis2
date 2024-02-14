import { DonneesSectorielles } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
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
  partitionneLocalisationServices,
} from "../../utilitaires/manipulationArbitraires";
import { fabriqueArbEnrSecteurSousSecteurs } from "../../utilitaires/manipulationArbitraires.fabriques";
import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
} from "../exemples/ListesEnrSecteursSousSecteur";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";

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
  ...ValeursActivitesConcernesInfrastructureNumerique,
  ...ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
];
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

const extendInfranumDNSOuNomDomaine = etend(
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    exerceUniquementActivitesDansListe(
      ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
    ),
  ),
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
      /** Petite entité privéé exerçant une Activité dans la liste {@link ValeursActivitesConcernesInfrastructureNumerique} */
      activitesConcernes: Object.assign(
        arbNonOSEPrivesPetitFournisseurInfraNum.filter(
          exerceActiviteDansListe(
            ValeursActivitesConcernesInfrastructureNumerique,
          ),
        ),
        {
          uniquement: partitionneLocalisationServices(
            arbNonOSEPrivesPetitFournisseurInfraNum.filter(
              exerceUniquementActivitesDansListe(
                ValeursActivitesConcernesInfrastructureNumerique,
              ),
            ),
          ),
        },
      ),
      infraNumDNSOuNomDomaine,
    },
    activitesNonConcernes:
      arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  },
  listeNonFournisseursInfrastructureNumerique:
    arbNonOSEPrivesPetitHorsFournisseurInfraNum,
};
