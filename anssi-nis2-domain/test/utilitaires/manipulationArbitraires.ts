import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import {
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions";
import {
  ArbitraireOptions,
  ArbitraireOptionsActivites,
} from "anssi-nis2-domain/test/arbitraires/arbitraireOptions";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "anssi-nis2-domain/src/Simulateur/SousSecteurActivite.definitions";
import { SecteurActivite } from "anssi-nis2-domain/src/Simulateur/SecteurActivite.definitions";
import { ValeursPetitMoyenGrand } from "anssi-nis2-domain/src/Simulateur/ChampsSimulateur.valeurs";

import { ValeursActivites } from "anssi-nis2-domain/src/Simulateur/Activite.definitions";
import { filtreSecteursSansSousSecteurs } from "anssi-nis2-domain/src/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { fabriqueListeActivitesDesSecteurs } from "anssi-nis2-domain/src/Simulateur/services/Activite/Activite.operations";
import {
  estActiviteAutre,
  estActiviteListee,
} from "anssi-nis2-domain/src/Simulateur/services/Activite/Activite.predicats";
import {
  AjoutADonneesFormulaire,
  DonneesFormulaireExtensibles,
  DonneesSectorielles,
  ManipulationArbitrairesDeclarations,
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
  TypeAjout extends AjoutADonneesFormulaire = AjoutADonneesFormulaire,
  TypeRetour = unknown,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => (ajouts: TypeAjout) => fc.Arbitrary<TypeRetour> =
  (arbitraire) =>
  <TypeRetour, TypeAjout>(ajouts: TypeAjout) =>
    arbitraire.chain((base) =>
      fc.record({ ...propageBase(base), ...ajouts }),
    ) as fc.Arbitrary<TypeRetour>;

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
  });

const extraitOptionsAjoutArbitrairesActivite = (
  options: ArbitraireOptionsActivites,
): [(activite: ValeursActivites) => boolean, number] => [
  options.filtreActivite || (() => true),
  options?.minLength || 0,
];

const etendDonneesActivite = <DonneesPartielles>(
  base: DonneesPartielles &
    Partial<Pick<IDonneesBrutesFormulaireSimulateur, "activites">>,
  listeActivitesDesSecteurs: ValeursActivites[],
) =>
  base.activites
    ? [...listeActivitesDesSecteurs, ...base.activites]
    : listeActivitesDesSecteurs;

export const ajouteArbitraireActivites = <
  ChampsAbsents extends keyof IDonneesBrutesFormulaireSimulateur,
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    ChampsAbsents
  > &
    DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
) => {
  const [filtreActivite, minLength] = extraitOptionsAjoutArbitrairesActivite(
    options || { filtreActivite: () => true, minLength: 0 },
  );
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
  return fc.record(enregistrementAvecActivites);
};
export const contrainteTranchesSansDoublonSurValeur = <
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    "trancheNombreEmployes" | "activites"
  >,
>(
  base: DonneesPartielles,
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
  base: Omit<ManipulationArbitrairesDeclarations, "trancheNombreEmployes">,
) =>
  fc.record<ManipulationArbitrairesDeclarations>({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });
export const ajouteAuMoinsUneActiviteAutre = <
  ChampsAbsents extends keyof IDonneesBrutesFormulaireSimulateur,
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    ChampsAbsents
  > &
    DonneesSectorielles,
>(
  base: DonneesPartielles,
) =>
  ajouteArbitraireActivites<ChampsAbsents, DonneesPartielles>(base, {
    filtreActivite: estActiviteAutre,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteListee = <
  ChampsAbsents extends keyof IDonneesBrutesFormulaireSimulateur,
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    ChampsAbsents
  > &
    DonneesSectorielles,
>(
  base: DonneesPartielles,
) =>
  ajouteArbitraireActivites(base, {
    filtreActivite: estActiviteListee,
    minLength: 1,
  });
export const ajouteAuMoinsUneActiviteArbitraire = <
  ChampsAbsents extends keyof IDonneesBrutesFormulaireSimulateur,
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    ChampsAbsents
  > &
    DonneesSectorielles,
>(
  base: DonneesPartielles,
) => ajouteArbitraireActivites(base, { minLength: 1 });

export const fabriqueArbTrancheSingleton = () =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand);
