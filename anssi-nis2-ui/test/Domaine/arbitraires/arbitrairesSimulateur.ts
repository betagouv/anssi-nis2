import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteArbitraire,
  ajouteAuMoinsUneActiviteAutre,
  ajouteMethodeAvec,
  DonneesFormulaireExtensibles,
  DonneesSectorielles,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbEnregistrementSecteurSousSecteur,
  fabriqueArbSecteurSousSecteurs,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";

import {
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

export const arbitraireSecteursSousSecteurs = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
).chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbSecteursSousSecteursListes = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(secteurEtSousSecteursSontListes),
  { minLength: 1 },
);

const arbSecteurSousSecteurInfraNum = fabriqueArbSecteurSousSecteurs(
  filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
  { minLength: 1 },
);

const arbTousSecteursSousSecteurs = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
  { minLength: 1 },
);

const arbEnrAutresSecteursSousSecteurs =
  fabriqueArbEnregistrementSecteurSousSecteur(listeAutresSecteursSousSecteurs, {
    minLength: 1,
  });

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
  .chain(ajouteArbitraireActivites) as ArbitraireFormulaire;

const arbOSEMoyenGrand = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
    trancheCA: fabriqueArbTrancheSingleton(),
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain(ajouteArbitraireActivites);

const arbActivitesAutres: fc.Arbitrary<DonneesFormulaireSimulateur> =
  etend<DonneesSectorielles>(arbSecteursSousSecteursListes)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: fc.constant(["privee"]),
      trancheCA: fabriqueArbTrancheSingleton(),
      trancheNombreEmployes: fabriqueArbTrancheSingleton(),
      etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
    })
    .chain<DonneesFormulaireExtensibles>(ajouteAuMoinsUneActiviteAutre)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

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
  .chain((base: IDonneesBrutesFormulaireSimulateur) =>
    ajouteArbitraireActivites(base, { minLength: 1 }),
  )
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);

const arbSecteursEtSousSecteursListes = arbTousSecteursSousSecteurs.filter(
  (enr) =>
    auMoinsUnSecteurListe(enr.secteurActivite) ||
    auMoinsUnSousSecteurListe(enr.sousSecteurActivite),
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
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteArbitraire)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);

const arbNonOSEPublique = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.publique,
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
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteArbitraire)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);

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
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteArbitraire)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteAutre);

const arbToutesValeursPossibles = etend(arbSecteursSousSecteursListes).avec({
  designeOperateurServicesEssentiels: fabriqueArbSingleton([
    "oui",
    "non",
    "nsp",
  ]),
  typeStructure: fabriqueArbSingleton(["privee", "publique"]),
  trancheCA: fabriqueArbTrancheSingleton(),
  trancheNombreEmployes: fabriqueArbTrancheSingleton(),
  etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
}) as ArbitraireFormulaire;

const arbDonneesSansTypeStructure = etend(arbToutesValeursPossibles).avec({
  typeStructure: fc.constant([]),
}) as ArbitraireFormulaire;

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
    donneeAbsente: {
      typeStructure: arbDonneesSansTypeStructure,
    },
  },
};
