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
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domaine/Simulateur/services/Activite/Activite.predicats";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);
export type DonneesSectorielles = Pick<
  IDonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;

export type DonneesFormulaireExtensibles =
  | IDonneesBrutesFormulaireSimulateur
  | DonneesSansActivite
  | DonneesBrutesSansActivite
  | DonneesSectorielles
  | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">;

export type DonneesAjout = 
  | Pick<IDonneesBrutesFormulaireSimulateur, "trancheCA">
  | Pick<IDonneesBrutesFormulaireSimulateur, "designeOperateurServicesEssentiels"|"typeStructure"|"trancheCA"| "trancheNombreEmployes" | "etatMembre">

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

export type DonneesBrutesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;

export type DonneesSansActivite = Omit<
  IDonneesFormulaireSimulateur,
  "activites"
>;

type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles,
> = DonneesPartielles & Pick<IDonneesBrutesFormulaireSimulateur, "activites">;
type OperationAjouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
) => fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;

const fabriqueEtendAvec: <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeAjout extends DonneesAjout = DonneesAjout,
  TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles & TypeAjout,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => (ajouts: fc.Arbitrary<TypeAjout>) => fc.Arbitrary<TypeRetour> =
  (arbitraire) =>
    <TypeRetour>(ajouts) =>
      arbitraire.chain((base) =>
        fc.record({ ...propageBase(base), ...ajouts }),
      ) as fc.Arbitrary<TypeRetour>;

export const etend = <
  DonneesPartielles extends DonneesFormulaireExtensibles,
>(
  arbitraireOrigine: fc.Arbitrary<DonneesPartielles>,
) => ({
  avec<
    TypeAjout extends DonneesAjout = DonneesAjout,
    TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles & TypeAjout,
  >(arbitraireAjoute: fc.Arbitrary<TypeAjout>) {
    return fabriqueEtendAvec<
      DonneesPartielles,
      TypeAjout,
      TypeRetour
    >(arbitraireOrigine)(arbitraireAjoute)
  }
});

export const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) => {
  const avecMethod = (data: IDonneesFormulaireSimulateur) =>
    new DonneesFormulaireSimulateur(Object.assign({}, base, data));
  return fc.record({ ...propageBase(base), avec: fc.constant(avecMethod) });
};

export const fabriqueArbSingleton = <T>(valeursPossibles: Readonly<T[]>) =>
  fc.subarray<T>([...valeursPossibles], {
    minLength: 1,
    maxLength: 1,
  });

const etendAvecActivitesVides = <DonneesPartielles extends DonneesSectorielles>(
  base: DonneesPartielles &
    Partial<Pick<IDonneesBrutesFormulaireSimulateur, "activites">>,
) =>
  fc.record({
    ...propageBase(base),
    activites: fc.constant([]),
  }) as unknown as fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;

const extraitOptionsAjoutArbitrairesActivite = (options?: ArbitraireOptionsActivites): [(activite: ValeursActivites) => boolean, number] => [
    options?.filtreActivite || (() => true),
    options?.minLength || 0,
  ];

function etendDonneesActivite<DonneesPartielles>(
  base: DonneesPartielles &
    Partial<Pick<IDonneesBrutesFormulaireSimulateur, "activites">>,
  listeActivitesDesSecteurs: ValeursActivites[],
) {
  return base.activites
    ? [...listeActivitesDesSecteurs, ...base.activites]
    : listeActivitesDesSecteurs;
}

export const ajouteArbitraireActivites: OperationAjouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles &
    Partial<Pick<IDonneesBrutesFormulaireSimulateur, "activites">>,
  options?: ArbitraireOptionsActivites,
) => {
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
  const arbAuMoinsUneActivites = fc.subarray<ValeursActivites>(
    Array.from(new Set(donneesActivite)),
    { minLength: minLength },
  );
  const enregistrementAvecActivites = {
    ...propageBase(base),
    activites: arbAuMoinsUneActivites,
  };
  return fc.record(enregistrementAvecActivites) as fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;
};

export const contrainteTranchesSansDoublonSurValeur = (
  base,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      tranche[0] !== valeurExclusive || base.trancheCA[0] !== valeurExclusive,
  );

const arbSecteursEtSousSecteursVides = fc.record({
  secteurActivite: fc.constant([]),
  sousSecteurActivite: fc.constant([]),
});

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
      (listeSousSecteurs, couple) => couple.sousSecteur ? listeSousSecteurs.add(couple.sousSecteur) : listeSousSecteurs,
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

export const fabriqueArbContraintSurTrancheCA = (
  base: Omit<DonneesBrutesSansActivite, "trancheNombreEmployes"> | Omit<IDonneesBrutesFormulaireSimulateur, "trancheNombreEmployes">,
) =>
  fc.record({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });
export const ajouteAuMoinsUneActiviteAutre = (base) =>
  ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteAutre,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteListee = (base) =>
  ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteListee,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteArbitraire = (base) =>
  ajouteArbitraireActivites(base, { minLength: 1 });

export const fabriqueArbTrancheSingleton = () =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand);
