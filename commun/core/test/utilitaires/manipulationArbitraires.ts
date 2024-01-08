import { fc } from "@fast-check/vitest";
import { Activites } from "../../src/Domain/Simulateur/Activite.definitions";
import {
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
} from "../../src/Domain/Simulateur/DonneesFormulaire";
import { SecteurActivite } from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import { fabriqueListeActivitesDesSecteurs } from "../../src/Domain/Simulateur/services/Activite/Activite.operations";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { filtreSecteursSansSousSecteurs } from "../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  ArbitraireOptions,
  ArbitraireOptionsActivites,
} from "../Domaine/arbitraires/arbitraireOptions";

import {
  DonneesFormulaireExtensibles,
  DonneesAjout,
  DonneesBrutesSansActivite,
  DonneesExtensiblesAvecActivite,
} from "./manipulationArbitraires.declarations";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);

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

const fabriqueEtendAvec: <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeAjout extends DonneesAjout = DonneesAjout,
  TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
    TypeAjout,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => (ajouts: AvecParams<TypeAjout>) => fc.Arbitrary<TypeRetour> =
  (arbitraire) =>
  <
    DonneesPartielles extends DonneesFormulaireExtensibles,
    TypeAjout extends DonneesAjout = DonneesAjout,
    TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
      TypeAjout,
  >(
    ajouts: AvecParams<TypeAjout>,
  ) =>
    arbitraire.chain((base) =>
      fc.record<TypeRetour>({
        ...propageBase(base),
        ...ajouts,
      } as unknown as { [K in keyof TypeRetour]: fc.Arbitrary<TypeRetour[K]> }),
    ) as fc.Arbitrary<TypeRetour>;

type AvecParams<TypeAjout extends DonneesAjout = DonneesAjout> = {
  [k in keyof TypeAjout]: fc.Arbitrary<TypeAjout[k]>;
};
export const etend = <DonneesPartielles extends DonneesFormulaireExtensibles>(
  arbitraireOrigine: fc.Arbitrary<DonneesPartielles>,
) => ({
  avec<
    TypeAjout extends DonneesAjout = DonneesAjout,
    TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
      TypeAjout,
  >(arbitraireAjoute: AvecParams<TypeAjout>) {
    return fabriqueEtendAvec<DonneesPartielles, TypeAjout, TypeRetour>(
      arbitraireOrigine,
    )(arbitraireAjoute);
  },
});

export const fabriqueArbSingleton = <T>(valeursPossibles: Readonly<T[]>) =>
  fc.subarray<T>([...valeursPossibles], {
    minLength: 1,
    maxLength: 1,
  });

const etendAvecActivitesVides = <DonneesPartielles extends DonneesSectorielles>(
  base: DonneesPartielles &
    Partial<Pick<DonneesFormulaireSimulateur, "activites">>,
) =>
  fc.record({
    ...propageBase(base),
    activites: fc.constant([]),
  }) as unknown as fc.Arbitrary<
    DonneesExtensiblesAvecActivite<DonneesPartielles>
  >;

const extraitOptionsAjoutArbitrairesActivite = (
  options?: ArbitraireOptionsActivites,
): [(activite: Activites) => boolean, number] => [
  options?.filtreActivite || (() => true),
  options?.minLength || 0,
];

function etendDonneesActivite<DonneesPartielles>(
  base: DonneesPartielles &
    Partial<Pick<DonneesFormulaireSimulateur, "activites">>,
  listeActivitesDesSecteurs: Activites[],
) {
  return base.activites
    ? [...listeActivitesDesSecteurs, ...base.activites]
    : listeActivitesDesSecteurs;
}

export const ajouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
): fc.Arbitrary<
  Pick<DonneesFormulaireSimulateur, "activites"> & DonneesPartielles
> => {
  const [filtreActivite, minLength] =
    extraitOptionsAjoutArbitrairesActivite(options);
  const listeSectorielle = [
    ...filtreSecteursSansSousSecteurs(base.secteurActivite),
    ...(base.sousSecteurActivite || []),
  ];
  const listeActivitesDesSecteurs = fabriqueListeActivitesDesSecteurs(
    listeSectorielle,
    filtreActivite,
  );
  const donneesActivite = etendDonneesActivite(base, listeActivitesDesSecteurs);

  if (listeActivitesDesSecteurs.length === 0) {
    return etendAvecActivitesVides(base);
  }
  const arbAuMoinsUneActivites = fc.subarray<Activites>(
    Array.from(new Set(donneesActivite)),
    { minLength: minLength },
  );
  const enregistrementAvecActivites: {
    [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]>;
  } & {
    activites: fc.Arbitrary<Activites[]>;
  } = {
    ...propageBase(base),
    activites: arbAuMoinsUneActivites,
  };
  return fc.record(enregistrementAvecActivites) as fc.Arbitrary<
    Pick<DonneesFormulaireSimulateur, "activites"> & DonneesPartielles
  >;
};

export const contrainteTranchesSansDoublonSurValeur = <
  T extends DonneesFormulairesAvantTrancheCA = DonneesFormulaireSimulateur,
>(
  base: T,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      tranche[0] !== valeurExclusive || base.trancheCA[0] !== valeurExclusive,
  );

const extraitCouplesAvecSecteurUniques = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[],
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
      new Set<SecteurActivite>(),
    ),
  );

const extraitSousSecteursDesCouples = (
  couplesSecteurSousSecteur: EnrSecteurSousSecteur[],
) =>
  Array.from(
    couplesSecteurSousSecteur.reduce(
      (listeSousSecteurs, couple) =>
        couple.sousSecteur
          ? listeSousSecteurs.add(couple.sousSecteur)
          : listeSousSecteurs,
      new Set<SousSecteurActivite>(),
    ),
  ).filter((sousSecteur) => sousSecteur !== undefined);

const fabriqueArbSecteurSousSecteursTailleMini = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  minLength: number,
) =>
  fc
    .subarray(listeSecteursSousSecteurs, { minLength: minLength })
    .chain((couplesSecteurSousSecteur) =>
      fc.record<DonneesSectorielles>({
        secteurActivite: fc.constant(
          extraitCouplesAvecSecteurUniques(couplesSecteurSousSecteur),
        ),
        sousSecteurActivite: fc.constant(
          extraitSousSecteursDesCouples(couplesSecteurSousSecteur),
        ),
      }),
    );

const arbSecteursEtSousSecteursVides = fc.record({
  secteurActivite: fc.constant([]),
  sousSecteurActivite: fc.constant([]),
});

export const fabriqueArbEnrSecteurSousSecteurs = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  { minLength }: ArbitraireOptions = { minLength: 0 },
): fc.Arbitrary<DonneesSectorielles> => {
  if (listeSecteursSousSecteurs.length === 0) {
    return arbSecteursEtSousSecteursVides;
  }
  return fabriqueArbSecteurSousSecteursTailleMini(
    listeSecteursSousSecteurs,
    minLength || 0,
  );
};

export const decoreChaineRendue = <T extends object>(objet: T) => {
  Object.defineProperties(objet, {
    [fc.toStringMethod]: { value: () => objet.toString() },
  });
  return objet;
};

type DonneesFormulairesAvantTrancheCA =
  | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">
  | Omit<DonneesFormulaireSimulateur, "trancheNombreEmployes">
  | (DonneesSectorielles &
      Pick<
        DonneesFormulaireSimulateur,
        | "designeOperateurServicesEssentiels"
        | "typeStructure"
        | "trancheCA"
        | "etatMembre"
      >);
export const fabriqueArbContraintSurTrancheCA = <
  T extends DonneesFormulairesAvantTrancheCA,
>(
  base: T,
) =>
  fc.record({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });

export const ajouteAuMoinsUneActiviteAutre = <
  T extends DonneesAjout & DonneesSectorielles,
>(
  base: T,
) =>
  ajouteArbitraireActivites<T>(base, {
    filtreActivite: estActiviteAutre,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteListee = <
  T extends DonneesAjout & DonneesSectorielles,
>(
  base: T,
) =>
  ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteListee,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteArbitraire = <
  T extends DonneesSectorielles,
>(
  base: T,
) => ajouteArbitraireActivites(base, { minLength: 1 });

export const fabriqueArbTrancheSingleton = () =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand);

export const ajouteChampsFacultatifs = <
  T extends Omit<
    DonneesFormulaireSimulateur,
    | "typeEntitePublique"
    | "fournitServicesUnionEuropeenne"
    | "localisationRepresentant"
  >,
>(
  base: T,
) =>
  fc.record({
    typeEntitePublique: fc.constant([]),
    fournitServicesUnionEuropeenne: fc.constant([]),
    localisationRepresentant: fc.constant([]),
    ...propageBase(base),
  });
