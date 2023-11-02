import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../src/Domaine/Simulateur/ChampsSimulateur.definitions";
import {
  ArbitraireOptions,
  ArbitraireOptionsActivites,
} from "../Domaine/arbitraires/arbitraireOptions";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "../../src/Domaine/Simulateur/SousSecteurActivite.definition";
import { SecteurActivite } from "../../src/Domaine/Simulateur/SecteurActivite.definition";
import { ValeursPetitMoyenGrand } from "../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";

import { ValeursActivites } from "../../src/Domaine/Simulateur/Activite";
import { filtreSecteursSansSousSecteurs } from "../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { fabriqueListeActivitesDesSecteurs } from "../../src/Domaine/Simulateur/services/Activite/Activite.operations";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);
export type DonneesSectorielles = Pick<
  IDonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;
export const propageBase = <
  DonneesPartielles extends
    | IDonneesBrutesFormulaireSimulateur
    | DonneesSansActivite
    | Omit<DonneesSansActivite, "trancheNombreEmployes">
    | DonneesSectorielles,
>(
  base: DonneesPartielles,
) =>
  Object.entries(base).reduce(
    (donneesFormArbitraires, [champ, valeurs]) =>
      Object.assign({}, donneesFormArbitraires, {
        [champ]: constantArbitraire(valeurs),
      }),
    {},
  ) as { [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]> };

export const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) => {
  const avecMethod = (data: IDonneesFormulaireSimulateur) =>
    new DonneesFormulaireSimulateur(Object.assign({}, base, data));
  return fc.record({ ...propageBase(base), avec: fc.constant(avecMethod) });
};
export type DonneesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;

export const fabriqueArbSingleton = <T>(valeursPossibles: Readonly<T[]>) =>
  fc.subarray<T>([...valeursPossibles], {
    minLength: 1,
    maxLength: 1,
  });
export const ajouteArbitraireActivites = <
  DonneesPartielle extends
    | DonneesSansActivite
    | IDonneesBrutesFormulaireSimulateur,
>(
  base: DonneesPartielle,
  options?: ArbitraireOptionsActivites,
) => {
  const [opFiltreActivite, opMinLength] = [
    options?.filtreActivite || (() => true),
    options?.minLength || 0,
  ];
  const listeActivitesDesSecteurs = fabriqueListeActivitesDesSecteurs(
    [
      ...filtreSecteursSansSousSecteurs(base.secteurActivite),
      ...(base.sousSecteurActivite || []),
    ],
    opFiltreActivite,
  );
  const baseAvecActivites = base as IDonneesFormulaireSimulateur;
  const donneesActivite: ValeursActivites[] = baseAvecActivites.activites
    ? [...listeActivitesDesSecteurs, ...baseAvecActivites.activites]
    : listeActivitesDesSecteurs;
  if (listeActivitesDesSecteurs.length === 0) {
    return fc.record<IDonneesBrutesFormulaireSimulateur>({
      ...propageBase(base),
      activites: fc.constant([]),
    });
  }
  return fc.record<IDonneesBrutesFormulaireSimulateur>({
    ...propageBase(base),
    activites: fc.subarray(Array.from(new Set(donneesActivite)), {
      minLength: opMinLength,
    }),
  });
};
export const contrainteTranchesSansDoublonSurValeur = (
  base,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      (base.trancheCA.includes(valeurExclusive) &&
        !tranche.includes(valeurExclusive)) ||
      (!base.trancheCA.includes(valeurExclusive) &&
        tranche.includes(valeurExclusive)),
  );
export const fabriqueArbSecteurSousSecteurs = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  { minLength }: ArbitraireOptions = { minLength: 0 },
) => {
  if (listeSecteursSousSecteurs.length === 0) {
    return fc.record({
      secteurActivite: fc.constant([]),
      sousSecteurActivite: fc.constant([]),
    });
  }
  return fc
    .subarray(listeSecteursSousSecteurs, { minLength: minLength })
    .chain((couplesSecteurSousSecteur) =>
      fc.record({
        secteurActivite: fc.constant(
          Array.from(
            couplesSecteurSousSecteur.reduce(
              (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
              new Set<SecteurActivite>(),
            ),
          ),
        ),
        sousSecteurActivite: fc.constant(
          Array.from(
            couplesSecteurSousSecteur.reduce(
              (listeSousSecteurs, couple) =>
                listeSousSecteurs.add(couple.sousSecteur),
              new Set<SousSecteurActivite>(),
            ),
          ).filter((sousSecteur) => sousSecteur !== undefined),
        ),
      }),
    );
};
export const fabriqueArbSSS = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  { minLength }: ArbitraireOptions = { minLength: 0 },
) => {
  if (listeSecteursSousSecteurs.length === 0) {
    return fc.record({
      secteurActivite: fc.constant([]),
      sousSecteurActivite: fc.constant([]),
    });
  }
  return fc
    .subarray(listeSecteursSousSecteurs, { minLength: minLength })
    .chain((couplesSecteurSousSecteur) =>
      fc.record({
        secteurActivite: fc.constant(
          Array.from(
            couplesSecteurSousSecteur.reduce(
              (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
              new Set<SecteurActivite>(),
            ),
          ),
        ),
        sousSecteurActivite: fc.constant(
          Array.from(
            couplesSecteurSousSecteur.reduce(
              (listeSousSecteurs, couple) =>
                listeSousSecteurs.add(couple.sousSecteur),
              new Set<SousSecteurActivite>(),
            ),
          ).filter((sousSecteur) => sousSecteur !== undefined),
        ),
      }),
    );
};
export const decoreChaineRendue = <T extends object>(objet: T) => {
  Object.defineProperties(objet, {
    [fc.toStringMethod]: { value: () => objet.toString() },
  });
  return objet;
};
export const etendArbitraire = <
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
