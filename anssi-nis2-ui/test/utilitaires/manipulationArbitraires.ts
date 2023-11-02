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
} from "../../src/Domaine/Simulateur/SousSecteurActivite.definitions";
import { SecteurActivite } from "../../src/Domaine/Simulateur/SecteurActivite.definitions";
import { ValeursPetitMoyenGrand } from "../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";

import { ValeursActivites } from "../../src/Domaine/Simulateur/Activite.definitions";
import { filtreSecteursSansSousSecteurs } from "../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { fabriqueListeActivitesDesSecteurs } from "../../src/Domaine/Simulateur/services/Activite/Activite.operations";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);
export type DonneesSectorielles = Pick<
  IDonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;
// export type DonneesFormulaireAvecActiviteExtensibles =
//   | IDonneesBrutesFormulaireSimulateur
//   | DonneesSectorielles;

export type DonneesFormulaireExtensibles =
  | IDonneesBrutesFormulaireSimulateur
  | DonneesSansActivite
  | DonneesBrutesSansActivite
  | DonneesSectorielles
  // | Omit<DonneesBrutesSansActivite, "secteurActivite" | "sousSecteurActivite">
  | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">;

export const propageBase = <
  DonneesPartielles extends DonneesFormulaireExtensibles,
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

type AjoutADonneesFormulaire = Partial<{
  [K in keyof IDonneesBrutesFormulaireSimulateur]: fc.Arbitrary<
    IDonneesBrutesFormulaireSimulateur[K]
  >;
}>;
const fabriqueEtendAvec: <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeAjout extends AjoutADonneesFormulaire = AjoutADonneesFormulaire,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => (ajouts: TypeAjout) => fc.Arbitrary<unknown> = (arbitraire) => (ajouts) =>
  arbitraire.chain((base) => fc.record({ ...propageBase(base), ...ajouts }));

export const etend = <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeAjout extends AjoutADonneesFormulaire = AjoutADonneesFormulaire,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => ({
  avec: fabriqueEtendAvec<DonneesPartielles, TypeAjout>(arbitraire),
});

export const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) => {
  const avecMethod = (data: IDonneesFormulaireSimulateur) =>
    new DonneesFormulaireSimulateur(Object.assign({}, base, data));
  return fc.record({ ...propageBase(base), avec: fc.constant(avecMethod) });
};
export type DonneesBrutesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;
export type DonneesSansActivite = Omit<
  IDonneesFormulaireSimulateur,
  "activites"
>;

export const fabriqueArbSingleton = <T>(valeursPossibles: Readonly<T[]>) =>
  fc.subarray<T>([...valeursPossibles], {
    minLength: 1,
    maxLength: 1,
  });

type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles,
> = DonneesPartielles & Pick<IDonneesBrutesFormulaireSimulateur, "activites">;
export const ajouteArbitraireActivites: <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
) => fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>> = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
): fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>> => {
  const [filtreActivite, minLength] = [
    options?.filtreActivite || (() => true),
    options?.minLength || 0,
  ];
  const listeActivitesDesSecteurs = fabriqueListeActivitesDesSecteurs(
    [
      ...filtreSecteursSansSousSecteurs(base.secteurActivite),
      ...(base.sousSecteurActivite || []),
    ],
    filtreActivite,
  );
  const baseAvecActivites: DonneesPartielles &
    Partial<Pick<IDonneesBrutesFormulaireSimulateur, "activites">> = base;
  const donneesActivite: ValeursActivites[] = baseAvecActivites.activites
    ? [...listeActivitesDesSecteurs, ...baseAvecActivites.activites]
    : listeActivitesDesSecteurs;
  if (listeActivitesDesSecteurs.length === 0) {
    return fc.record({
      ...propageBase(base),
      activites: fc.constant([]),
    }) as fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;
  }
  const donneesActivitesUniques = Array.from(new Set(donneesActivite));
  const enregistrementAvecActivites = {
    ...propageBase(base),
    activites: fc.subarray<ValeursActivites>(donneesActivitesUniques, {
      minLength: minLength,
    }),
  };
  return fc.record(enregistrementAvecActivites) as fc.Arbitrary<
    DonneesExtensiblesAvecActivite<DonneesPartielles>
  >;
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
): fc.Arbitrary<DonneesSectorielles> => {
  if (listeSecteursSousSecteurs.length === 0) {
    return fc.record({
      secteurActivite: fc.constant([]),
      sousSecteurActivite: fc.constant([]),
    });
  }
  return fc
    .subarray(listeSecteursSousSecteurs, { minLength: minLength })
    .chain((couplesSecteurSousSecteur) =>
      fc.record<DonneesSectorielles>({
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
export const fabriqueArbEnregistrementSecteurSousSecteur = (
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

export const fabriqueArbContraintSurTrancheCA = (
  base: Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">,
) =>
  fc.record<DonneesBrutesSansActivite>({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });
