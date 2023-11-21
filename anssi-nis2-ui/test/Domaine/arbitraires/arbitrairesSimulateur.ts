import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteArbitraire,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  ajouteMethodeAvec,
  DonneesSectorielles,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbEnrSecteurSousSecteurs,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";

import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
  listeAutresSecteursSousSecteurs,
  listeEnrSecteursAvecLeursSousSecteurs,
  secteurEtSousSecteursSontListes,
} from "../../Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { auMoinsUnSousSecteurListe } from "../../../src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { auMoinsUnSecteurListe } from "../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { predicatDonneesFormulaire } from "../../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { ValeursNomChampsFormulaire } from "../../../src/Domaine/Simulateur/DonneesFormulaire.valeurs";
import { ValeursActivitesConcernesInfrastructureNumerique } from "../../../src/Domaine/Simulateur/Activite.valeurs";

export const arbitraireSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
)
  .filter((donnees) => donnees.secteurActivite.length > 0)
  .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbSecteursSousSecteursListes = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(secteurEtSousSecteursSontListes),
  { minLength: 1 },
);

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

const arbTousSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
  { minLength: 1 },
);

const arbEnrAutresSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeAutresSecteursSousSecteurs,
  {
    minLength: 1,
  },
);

type ArbitraireFormulaire = fc.Arbitrary<IDonneesFormulaireSimulateur>;
const arbOSEPetit = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;

const arbOSEMoyenGrand = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
    trancheCA: fabriqueArbTrancheSingleton(),
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0);

const arbActivitesAutres = etend<DonneesSectorielles>(
  arbSecteursSousSecteursListes,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: fc.constant(["privee"]),
    trancheCA: fabriqueArbTrancheSingleton(),
    trancheNombreEmployes: fabriqueArbTrancheSingleton(),
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteAutre)
  .filter((d) => d.activites.length > 0);

const arbNonOSEPrivesPetitFournisseurInfraNum = etend<DonneesSectorielles>(
  arbSecteurSousSecteurInfraNum,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(ajouteAuMoinsUneActiviteListee);

const arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.some((a) =>
        ValeursActivitesConcernesInfrastructureNumerique.includes(a),
      ),
  );
const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      !d.activites.some((a) =>
        ValeursActivitesConcernesInfrastructureNumerique.includes(a),
      ),
  );

const arbNonOSEPrivesPetitHorsFournisseurInfraNum = etend<DonneesSectorielles>(
  arbSecteurSousSecteurNonInfraNum,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(ajouteAuMoinsUneActiviteListee);

const arbSecteursEtSousSecteursListes = arbTousSecteursSousSecteurs.filter(
  (enr) =>
    (enr.sousSecteurActivite.length == 0 &&
      auMoinsUnSecteurListe(enr.secteurActivite)) ||
    (auMoinsUnSecteurListe(enr.secteurActivite) &&
      auMoinsUnSousSecteurListe(enr.sousSecteurActivite)),
);

const arbNonOSEPrivesMoyenneGrande = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteListee);

const arbNonOSEPublique = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.publique,
    typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteArbitraire)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);

const arbNonOSEPrivesMoyenneGrandeAutresSESS = etend(
  arbEnrAutresSecteursSousSecteurs,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteListee);

const arbNonOSEPrivesMoyenneGrandeAutresActivites = etend(
  arbSecteursSousSecteursListes,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteAutre)
  .filter(predicatDonneesFormulaire.uniquement.activiteAutre)
  .filter((d) => d.activites.length > 0);

const arbToutesValeursPossibles = etend(arbSecteursSousSecteursListes).avec({
  designeOperateurServicesEssentiels: fabriqueArbSingleton([
    "oui",
    "non",
    "nsp",
  ]),
  typeStructure: fabriqueArbSingleton(["privee", "publique"]),
  typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
  trancheCA: fabriqueArbTrancheSingleton(),
  trancheNombreEmployes: fabriqueArbTrancheSingleton(),
  etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
}) as ArbitraireFormulaire;

type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;

function fabriqueArbitraireVidePourChamp(nom: string) {
  return etend(arbToutesValeursPossibles).avec({
    [nom]: fc.constant([]),
  }) as ArbitraireFormulaire;
}

const initialValue: ArbitraireSurTousLesChamps = {
  activites: undefined,
  designeOperateurServicesEssentiels: undefined,
  etatMembre: undefined,
  secteurActivite: undefined,
  sousSecteurActivite: undefined,
  trancheCA: undefined,
  trancheNombreEmployes: undefined,
  typeEntitePublique: undefined,
  typeStructure: undefined,
};

const donneeAbsente = ValeursNomChampsFormulaire.reduce(
  (resultat, nom) => ({
    ...resultat,
    [nom]: fabriqueArbitraireVidePourChamp(nom),
  }),
  initialValue,
);

export const arbForm = {
  designeOSE: {
    petit: arbOSEPetit,
    moyenGrand: arbOSEMoyenGrand,
  },
  nonDesigneOSE: {
    privee: {
      activitesAutres: arbActivitesAutres,
      petit: {
        fournisseursInfrastructureNumerique:
          arbNonOSEPrivesPetitFournisseurInfraNum,
        fournisseursInfraNum: {
          activitesConcernes:
            arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes,
          activitesConcernesFrance: arbNonOSEPrivesPetitFournisseurInfraNum,
          activitesNonConcernes:
            arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
        },
        listeNonFournisseursInfrastructureNumerique:
          arbNonOSEPrivesPetitHorsFournisseurInfraNum,
      },
      grand: {
        secteursListes: arbNonOSEPrivesMoyenneGrande,
        secteursAutres: arbNonOSEPrivesMoyenneGrandeAutresSESS,
        activitesAutres: arbNonOSEPrivesMoyenneGrandeAutresActivites,
      },
    },
    publique: arbNonOSEPublique,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
