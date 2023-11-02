import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteArbitraireActivites,
  ajouteMethodeAvec,
  DonneesBrutesSansActivite,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbSecteurSousSecteurs,
  fabriqueArbSingleton,
  fabriqueArbEnregistrementSecteurSousSecteur,
  propageBase,
  etend,
  DonneesSectorielles,
  DonneesFormulaireExtensibles,
} from "../../utilitaires/manipulationArbitraires";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";

import {
  filtreSecteurListeSecteursSousSecteurs,
  listeEnrSecteursAvecLeursSousSecteurs,
} from "../../Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { estSousSecteurListe } from "../../../src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { estSecteurListe } from "../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domaine/Simulateur/services/Activite/Activite.predicats";

export const arbTrancheSingleton = () =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand);

export const arbitraireSecteursSousSecteurs = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
).chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbOSEPetit = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
  .chain(ajouteArbitraireActivites);

const arbOSEMoyenGrand = arbitraireSecteursSousSecteurs
  .chain((base) =>
    fc.record({
      ...propageBase(base),
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.oui,
      typeStructure: arbTypeStructure.privee,
      etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
      trancheCA: arbTrancheSingleton(),
    }),
  )
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain(ajouteArbitraireActivites)
  .chain(ajouteMethodeAvec);

const arbSecteursSousSecteursListes = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      !enr.secteur.startsWith("autre") && !enr.sousSecteur?.startsWith("autre"),
  ),
  {
    minLength: 1,
  },
);

function ajouteAuMoinsUneActiviteAutre(
  base,
): fc.Arbitrary<DonneesFormulaireExtensibles> {
  return ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteAutre,
    minLength: 1,
  });
}

const arbActivitesAutres: fc.Arbitrary<DonneesFormulaireSimulateur> =
  etend<DonneesSectorielles>(arbSecteursSousSecteursListes)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: fc.constant(["privee"]),
      trancheCA: arbTrancheSingleton(),
      trancheNombreEmployes: arbTrancheSingleton(),
      etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
    })
    .chain<DonneesFormulaireExtensibles>(ajouteAuMoinsUneActiviteAutre)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbNonOSEPrivesPetitFournisseurInfraNum: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(
    filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
    { minLength: 1 },
  )
    .chain((base) =>
      fc.record<DonneesBrutesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTranche.petit,
        trancheNombreEmployes: arbTranche.petit,
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain<IDonneesBrutesFormulaireSimulateur>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
      }),
    )
    .filter((donnees) => donnees.activites.some(estActiviteListee))
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbNonOSEPrivesMoyenneGrande: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(listeEnrSecteursAvecLeursSousSecteurs, {
    minLength: 1,
  })
    .filter(
      (enr) =>
        enr.secteurActivite.some(estSecteurListe) &&
        enr.sousSecteurActivite.some(estSousSecteurListe),
    )
    .chain((base) =>
      fc.record({
        secteurActivite: fc.constant([...base.secteurActivite]),
        sousSecteurActivite: fc.constant([...base.sousSecteurActivite]),
      }),
    )
    .chain((base) =>
      fc.record<Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
      }),
    )
    .filter((donnees) => donnees.activites.some(estActiviteListee))
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbNonOSEPublique: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(listeEnrSecteursAvecLeursSousSecteurs, {
    minLength: 1,
  })
    .filter(
      (enr) =>
        enr.secteurActivite.some(estSecteurListe) &&
        enr.sousSecteurActivite.some(estSousSecteurListe),
    )
    .chain((base) =>
      fc.record({
        secteurActivite: fc.constant([...base.secteurActivite]),
        sousSecteurActivite: fc.constant([...base.sousSecteurActivite]),
      }),
    )
    .chain((base) =>
      fc.record<Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.publique,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
      }),
    )
    .filter((donnees) => donnees.activites.some(estActiviteListee))
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const listeAutresSecteursSousSecteurs =
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      enr.secteur.startsWith("autre") || enr.sousSecteur?.startsWith("autre"),
  );
const arbNonOSEPrivesMoyenneGrandeAutresSESS: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbEnregistrementSecteurSousSecteur(listeAutresSecteursSousSecteurs, {
    minLength: 1,
  })
    .chain((base) =>
      fc.record<Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>((base) =>
      ajouteArbitraireActivites(base, {
        filtreActivite: estActiviteListee,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbSecteursSousSecteursListes
    .chain((base) =>
      fc.record<Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
        filtreActivite: estActiviteAutre,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbToutesValeursPossibles: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbSecteursSousSecteursListes
    .chain((base) =>
      fc.record<DonneesBrutesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels: fabriqueArbSingleton([
          "oui",
          "non",
          "nsp",
        ]),
        typeStructure: fabriqueArbSingleton(["privee", "publique"]),
        trancheCA: arbTrancheSingleton(),
        trancheNombreEmployes: arbTrancheSingleton(),
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

const arbDonneesSansTypeStructure = arbToutesValeursPossibles.chain((base) =>
  fc.record({
    ...propageBase(base),
    typeStructure: fc.constant([]),
  }),
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
