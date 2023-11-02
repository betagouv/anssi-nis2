import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteArbitraireActivites,
  ajouteMethodeAvec,
  contrainteTranchesSansDoublonSurValeur,
  DonneesSansActivite,
  etendArbitraire,
  fabriqueArbSecteurSousSecteurs,
  fabriqueArbSingleton,
  fabriqueArbSSS,
  propageBase,
} from "../../utilitaires/manipulationArbitraires";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
} from "../../../src/Domaine/Simulateur/ValeursChampsSimulateur";

import { listeEnrSecteursAvecLeursSousSecteurs } from "../../Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
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

const filtreSecteurListeSecteursSousSecteurs = (secteurFiltre: string) =>
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enrSecteurSousSecteur) => enrSecteurSousSecteur.secteur == secteurFiltre,
  );

const arbitraireSecteursSousSecteurs = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
);

export function fabriqueArbContraintSurTrancheCA(
  base: Omit<DonneesSansActivite, "trancheNombreEmployes">,
) {
  return fc.record<DonneesSansActivite>({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });
}

export const donneesArbitrairesFormOSEPetit: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  etendArbitraire(arbitraireSecteursSousSecteurs, {
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
    .chain<DonneesSansActivite>(ajouteArbitraireActivites)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const donneesArbitrairesFormOSEMoyenGrand: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbitraireSecteursSousSecteurs
    .chain((base) =>
      fc.record({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.oui,
        typeStructure: arbTypeStructure.privee,
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
        trancheCA: arbTrancheSingleton(),
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<DonneesSansActivite>(ajouteArbitraireActivites)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
const arbSecteursSousSecteursListes = fabriqueArbSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      !enr.secteur.startsWith("autre") && !enr.sousSecteur?.startsWith("autre"),
  ),
  {
    minLength: 1,
  },
);
export const donneesArbitrairesFormActivitesAutres: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbSecteursSousSecteursListes
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: fc.constant(["privee"]),
        trancheCA: arbTrancheSingleton(),
        trancheNombreEmployes: arbTrancheSingleton(),
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
      }),
    )
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        filtreActivite: estActiviteAutre,
        minLength: 1,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const donneesArbitrairesFormNonOSEPrivesPetitFournisseurInfraNum: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(
    filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
    { minLength: 1 },
  )
    .chain((base) =>
      fc.record<DonneesSansActivite>({
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

export const donneesArbitrairesFormNonOSEPrivesMoyenneGrande: fc.Arbitrary<IDonneesFormulaireSimulateur> =
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
      fc.record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
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

export const donneesArbitrairesFormNonOSEPublique: fc.Arbitrary<IDonneesFormulaireSimulateur> =
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
      fc.record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
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

export const listeAutresSecteursSousSecteurs =
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      enr.secteur.startsWith("autre") || enr.sousSecteur?.startsWith("autre"),
  );
export const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresSESS: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSSS(listeAutresSecteursSousSecteurs, {
    minLength: 1,
  })
    .chain((base) =>
      fc.record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        filtreActivite: estActiviteListee,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbSecteursSousSecteursListes
    .chain((base) =>
      fc.record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: arbTypeStructure.privee,
        trancheCA: arbTrancheSingleton(),
        etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
      }),
    )
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
        filtreActivite: estActiviteAutre,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const arbForm = {
  designeOSE: {
    petit: donneesArbitrairesFormOSEPetit,
    moyenGrand: donneesArbitrairesFormOSEMoyenGrand,
  },
  nonDesigneOSE: {
    privee: {
      activitesAutres: donneesArbitrairesFormActivitesAutres,
      petit: {
        fournisseursInfrastructureNumerique:
          donneesArbitrairesFormNonOSEPrivesPetitFournisseurInfraNum,
      },
      grand: {
        secteursListes: donneesArbitrairesFormNonOSEPrivesMoyenneGrande,
        secteursAutres:
          donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresSESS,
        activitesAutres:
          donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites,
      },
    },
    publique: donneesArbitrairesFormNonOSEPublique,
  },
};
