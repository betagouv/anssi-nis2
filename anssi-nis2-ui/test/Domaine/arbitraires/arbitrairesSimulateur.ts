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
  DonneesSectorielles,
  fabriqueArbSecteurSousSecteurs,
  fabriqueArbSingleton,
  propageBase,
} from "../../utilitaires/manipulationArbitraires";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
  ValeursTypeStructure,
} from "../../../src/Domaine/Simulateur/ValeursChampsSimulateur";

import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domaine/Simulateur/Operations/FiltreActivites";
import { listeEnrSecteursAvecLeursSousSecteurs } from "../../../src/Domaine/Simulateur/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";

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

const etendArbitraire = <
  DonneesPartielles extends
    | IDonneesBrutesFormulaireSimulateur
    | DonneesSansActivite
    | Omit<DonneesSansActivite, "secteurActivite" | "sousSecteurActivite">
    | Omit<DonneesSansActivite, "trancheNombreEmployes">
    | DonneesSectorielles,
>(
  donnees: fc.Arbitrary<DonneesSectorielles>,
  ajouts: {
    [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]>;
  },
) =>
  donnees.chain((base) =>
    fc.record({
      ...propageBase(base),
      ...ajouts,
    }),
  );

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

export const donneesArbitrairesFormActivitesAutres: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbitraireSecteursSousSecteurs
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels:
          arbDesigneOperateurServicesEssentiels.non,
        typeStructure: fabriqueArbSingleton(ValeursTypeStructure),
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
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
        filtreActivite: estActiviteListee,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const donneesArbitrairesFormNonOSEPrivesMoyenneGrande: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(
    listeEnrSecteursAvecLeursSousSecteurs.filter(
      (enr) =>
        !enr.secteur.startsWith("autre") &&
        !enr.sousSecteur?.startsWith("autre"),
    ),
    {
      minLength: 1,
    },
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
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
        filtreActivite: estActiviteListee,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
export const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresSESS: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(
    listeEnrSecteursAvecLeursSousSecteurs.filter(
      (enr) =>
        enr.secteur.startsWith("autre") && enr.sousSecteur?.startsWith("autre"),
    ),
    {
      minLength: 1,
    },
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
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, {
        minLength: 1,
        filtreActivite: estActiviteListee,
      }),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
export const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(
    listeEnrSecteursAvecLeursSousSecteurs.filter(
      (enr) =>
        !enr.secteur.startsWith("autre") &&
        !enr.sousSecteur?.startsWith("autre"),
    ),
    {
      minLength: 1,
    },
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
    activitesAutres: donneesArbitrairesFormActivitesAutres,
    petit: {
      fournisseursInfrastructureNumerique:
        donneesArbitrairesFormNonOSEPrivesPetitFournisseurInfraNum,
    },
    grand: {
      secteursListes: donneesArbitrairesFormNonOSEPrivesMoyenneGrande,
      secteursAutres: donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresSESS,
      activitesAutres:
        donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites,
    },
  },
};
