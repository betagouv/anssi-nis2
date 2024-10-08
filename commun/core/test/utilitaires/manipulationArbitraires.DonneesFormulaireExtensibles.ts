import { fc } from "@fast-check/vitest";
import { Activite } from "../../src/Domain/Simulateur/Activite.definitions";
import {
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { fabriqueListeActivitesDesSecteurs } from "../../src/Domain/Simulateur/Activite.fabriques";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/Activite.predicats";
import { filtreSecteursSansSousSecteurs } from "../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";

import {
  AvecParams,
  DonneesAjout,
  DonneesExtensiblesAvecActivite,
  DonneesFormulaireExtensibles,
  DonneesFormulairesAvanttrancheChiffreAffaire,
} from "./manipulationArbitraires.declarations";
import {
  fabriqueArbSingleton,
  fabriqueEtendAvec,
} from "./manipulationArbitraires.fabriques";

export const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[]
) => fc.constant(value);

export const propageBase = <
  DonneesPartielles extends DonneesFormulaireExtensibles
>(
  base: DonneesPartielles
) =>
  Object.entries(base).reduce(
    (donneesFormArbitraires, [champ, valeurs]) =>
      Object.assign({}, donneesFormArbitraires, {
        [champ]: constantArbitraire(valeurs),
      }),
    {}
  ) as { [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]> };

export const etend = <DonneesPartielles extends DonneesFormulaireExtensibles>(
  arbitraireOrigine: fc.Arbitrary<DonneesPartielles>
) => ({
  avec<
    TypeAjout extends DonneesAjout = DonneesAjout,
    TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
      TypeAjout
  >(arbitraireAjoute: AvecParams<TypeAjout>) {
    return fabriqueEtendAvec<DonneesPartielles, TypeAjout, TypeRetour>(
      arbitraireOrigine
    )(arbitraireAjoute);
  },
});

const etendAvecActivitesVides = <DonneesPartielles extends DonneesSectorielles>(
  base: DonneesPartielles &
    Partial<Pick<DonneesFormulaireSimulateur, "activites">>
) =>
  fc.record<DonneesPartielles>({
    ...propageBase<
      DonneesPartielles &
        Partial<Pick<DonneesFormulaireSimulateur, "activites">>
    >(base),
    activites: fc.constant([]),
  }) as fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;

const extraitOptionsAjoutArbitrairesActivite = (options?: {
  minLength?: number;
  filtreActivite?: (activite: Activite) => boolean;
}): [(activite: Activite) => boolean, number] => [
  options?.filtreActivite || (() => true),
  options?.minLength || 0,
];

const etendDonneesActivite = <DonneesPartielles>(
  base: DonneesPartielles &
    Partial<Pick<DonneesFormulaireSimulateur, "activites">>,
  listeActivitesDesSecteurs: Activite[]
) =>
  base.activites
    ? [...listeActivitesDesSecteurs, ...base.activites]
    : listeActivitesDesSecteurs;

export const ajouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles
>(
  base: DonneesPartielles,
  options?: {
    minLength?: number;
    filtreActivite?: (activite: Activite) => boolean;
  }
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
    filtreActivite
  );
  const donneesActivite = etendDonneesActivite(base, listeActivitesDesSecteurs);

  if (listeActivitesDesSecteurs.length === 0) {
    return etendAvecActivitesVides(base);
  }
  const arbAuMoinsUneActivites = fc.subarray<Activite>(
    Array.from(new Set(donneesActivite)),
    { minLength: minLength }
  );
  const enregistrementAvecActivites: {
    [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]>;
  } & {
    activites: fc.Arbitrary<Activite[]>;
  } = {
    ...propageBase(base),
    activites: arbAuMoinsUneActivites,
  };
  return fc.record(enregistrementAvecActivites) as fc.Arbitrary<
    Pick<DonneesFormulaireSimulateur, "activites"> & DonneesPartielles
  >;
};

export const contrainteTranchesSansDoublonSurValeur = <
  T extends DonneesFormulairesAvanttrancheChiffreAffaire = DonneesFormulaireSimulateur
>(
  base: T,
  valeurExclusive: UnionPetitMoyenGrand
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      tranche[0] !== valeurExclusive ||
      base.trancheChiffreAffaire[0] !== valeurExclusive
  );

export const decoreChaineRendue = <T extends object>(objet: T) => {
  Object.defineProperties(objet, {
    [fc.toStringMethod]: { value: () => objet.toString() },
  });
  return objet;
};

export const ajouteAuMoinsUneActiviteAutre = <
  T extends DonneesAjout & DonneesSectorielles
>(
  base: T
) =>
  ajouteArbitraireActivites<T>(base, {
    filtreActivite: estActiviteAutre,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteListee = <
  T extends DonneesAjout & DonneesSectorielles
>(
  base: T
) =>
  ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteListee,
    minLength: 1,
  });

export const ajouteChampsFacultatifs = <
  T extends Omit<
    DonneesFormulaireSimulateur,
    | "typeEntitePublique"
    | "localisationFournitureServicesNumeriques"
    | "paysDecisionsCyber"
    | "paysOperationsCyber"
    | "paysPlusGrandNombreSalaries"
  >
>(
  base: T
): fc.Arbitrary<DonneesFormulaireSimulateur> =>
  fc.record<DonneesFormulaireSimulateur>({
    typeEntitePublique: fc.constant([]),
    localisationFournitureServicesNumeriques: fc.constant([]),
    paysDecisionsCyber: fc.constant([]),
    paysOperationsCyber: fc.constant([]),
    paysPlusGrandNombreSalaries: fc.constant([]),
    ...propageBase(base),
  });
