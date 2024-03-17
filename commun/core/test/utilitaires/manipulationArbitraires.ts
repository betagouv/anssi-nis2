import { fc } from "@fast-check/vitest";
import { Activite } from "../../src/Domain/Simulateur/Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
} from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { fabriqueListeActivitesDesSecteurs } from "../../src/Domain/Simulateur/services/Activite/Activite.fabriques";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { non } from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
  contientSecteurNecessitantLocalisation,
  contientUniquementSecteurNecessitantLocalisation,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { filtreSecteursSansSousSecteurs } from "../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";

import {
  ArbitraireDonneesFormulaireSimulateur,
  ArbitraireDonneesFormulaireSimulateurNomme,
  ArbitraireEnrichi,
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
  listeActivitesDesSecteurs: Activite[],
) =>
  base.activites
    ? [...listeActivitesDesSecteurs, ...base.activites]
    : listeActivitesDesSecteurs;

export const ajouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: {
    minLength?: number;
    filtreActivite?: (activite: Activite) => boolean;
  },
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
  const arbAuMoinsUneActivites = fc.subarray<Activite>(
    Array.from(new Set(donneesActivite)),
    { minLength: minLength },
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
  T extends
    DonneesFormulairesAvanttrancheChiffreAffaire = DonneesFormulaireSimulateur,
>(
  base: T,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      tranche[0] !== valeurExclusive ||
      base.trancheChiffreAffaire[0] !== valeurExclusive,
  );

export const decoreChaineRendue = <T extends object>(objet: T) => {
  Object.defineProperties(objet, {
    [fc.toStringMethod]: { value: () => objet.toString() },
  });
  return objet;
};

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

export const ajouteChampsFacultatifs = <
  T extends Omit<
    DonneesFormulaireSimulateur,
    | "typeEntitePublique"
    | "fournitServicesUnionEuropeenne"
    | "localisationRepresentant"
    | "localisationFournitureServicesNumeriques"
    | "paysDecisionsCyber"
    | "paysOperationsCyber"
    | "paysPlusGrandNombreSalaries"
  >,
>(
  base: T,
): fc.Arbitrary<DonneesFormulaireSimulateur> =>
  fc.record<DonneesFormulaireSimulateur>({
    typeEntitePublique: fc.constant([]),
    fournitServicesUnionEuropeenne: fc.constant([]),
    localisationRepresentant: fc.constant([]),
    localisationFournitureServicesNumeriques: fc.constant([]),
    paysDecisionsCyber: fc.constant([]),
    paysOperationsCyber: fc.constant([]),
    paysPlusGrandNombreSalaries: fc.constant([]),
    ...propageBase(base),
  });

export const nommeArbitraire =
  (nom: string) =>
  (
    arbitraire: ArbitraireDonneesFormulaireSimulateur,
  ): ArbitraireDonneesFormulaireSimulateurNomme =>
    Object.assign(arbitraire, { nom });

export const partitionneLocalisationServices = (
  arbitraire:
    | ArbitraireDonneesFormulaireSimulateur
    | ArbitraireDonneesFormulaireSimulateurNomme,
): ArbitraireEnrichi =>
  Object.assign(
    arbitraire,
    {
      sansBesoinLocalisation: nommeArbitraire("sansBesoinLocalisation")(
        arbitraire.filter(non(contientSecteurNecessitantLocalisation)),
      ),
      neFournitPasServiceUe: nommeArbitraire("avecFournitServiceUE")(
        etend(arbitraire.filter(contientSecteurNecessitantLocalisation)).avec({
          fournitServicesUnionEuropeenne: fc.constant<
            FournitServicesUnionEuropeenne[]
          >(["non"]),
        }),
      ),
      avecLocalisationRepresentant: nommeArbitraire(
        "avecLocalisationRepresentant",
      )(
        etend(arbitraire.filter(contientSecteurNecessitantLocalisation)).avec({
          fournitServicesUnionEuropeenne: fc.constant(["oui"]),
          localisationRepresentant: fabriqueArbSingleton(
            ValeursappartenancePaysUnionEuropeenne,
          ),
        }),
      ),
      avecLocalisationRepresentantHorsFrance: nommeArbitraire(
        "avecLocalisationRepresentantHorsFrance",
      )(
        etend(arbitraire.filter(contientSecteurNecessitantLocalisation)).avec({
          fournitServicesUnionEuropeenne: fc.constant(["oui"]),
          localisationRepresentant:
            fabriqueArbSingleton<AppartenancePaysUnionEuropeenne>([
              "autre",
              "horsue",
            ]),
        }),
      ),
      avecLocalisationRepresentantFrance: nommeArbitraire(
        "avecLocalisationRepresentant",
      )(
        etend(
          arbitraire.filter(contientUniquementSecteurNecessitantLocalisation),
        ).avec({
          fournitServicesUnionEuropeenne: fc.constant(["oui"]),
          localisationRepresentant: fc.constant<
            AppartenancePaysUnionEuropeenne[]
          >(["france"]),
        }),
      ),
    },
    {
      nom:
        (arbitraire as ArbitraireDonneesFormulaireSimulateurNomme).nom ??
        "multiple",
    },
  );
export const arrayOfOne = <T>(
  originalArray: T[],
  constraints?: fc.SubarrayConstraints,
): fc.Arbitrary<T[]> =>
  fc.subarray(
    originalArray,
    constraints !== undefined
      ? { ...constraints, minLength: 1, maxLength: 1 }
      : { minLength: 1, maxLength: 1 },
  );
