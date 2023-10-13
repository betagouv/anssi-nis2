import { describe, expect } from "vitest";
import { it, fc } from "@fast-check/vitest";
import { ValeursSecteursSansSousSecteur } from "../../src/Domaine/Simulateur/ValeursSecteursActivites";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
} from "../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import {
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  UnionPetitMoyenGrand,
  ValeurChampSimulateur,
} from "../../src/Domaine/Simulateur/ChampsSimulateur";
import { activitesParSecteurEtSousSecteur } from "../../src/Domaine/Simulateur/ActivitesParSecteurEtSousSecteur";
import { Activite } from "../../src/Domaine/Simulateur/Activite";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);

const propageBase = <
  DonneesPartielles extends
    | IDonneesBrutesFormulaireSimulateur
    | DonneesSansActivite
    | Omit<DonneesSansActivite, "trancheNombreEmployes">,
>(
  base: DonneesPartielles,
) =>
  Object.entries(base).reduce(
    (donneesFormArbitraires, [champ, valeurs]) => ({
      ...donneesFormArbitraires,
      [champ]: constantArbitraire(valeurs),
    }),
    {},
  ) as { [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]> };
const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) => {
  const avecMethod = (data: IDonneesFormulaireSimulateur) =>
    new DonneesFormulaireSimulateur({ ...base, ...data });
  return fc.record({ ...propageBase(base), avec: fc.constant(avecMethod) });
};

type DonneesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;
const ajouteSecteursArbitraires = <
  DonneesPartielle extends DonneesSansActivite,
>(
  base: DonneesPartielle,
  filtreActivite: (activite: Activite) => boolean = () => true,
) =>
  fc.record<DonneesPartielle>({
    ...propageBase(base),
    activites: fc.subarray(
      base.secteurActivite.map(
        (secteur) =>
          activitesParSecteurEtSousSecteur[secteur]?.filter(filtreActivite),
      ),
    ),
  });

const trancheSansDoublonSurValeur = (
  base,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fc
    .subarray<TrancheNombreEmployes>([...ValeursPetitMoyenGrand], {
      minLength: 1,
      maxLength: 1,
    })
    .filter(
      (tranche) =>
        (base.trancheCA.includes(valeurExclusive) &&
          !tranche.includes(valeurExclusive)) ||
        (!base.trancheCA.includes(valeurExclusive) &&
          tranche.includes(valeurExclusive)),
    );

const tranche = () =>
  fc.subarray<TrancheChiffreAffaire>([...ValeursPetitMoyenGrand], {
    minLength: 1,
    maxLength: 1,
  });

const donneesArbitrairesFormOSEPetit: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fc
    .record<DonneesSansActivite>({
      designeOperateurServicesEssentiels: fc.constant<
        DesignationOperateurServicesEssentiels[]
      >(["oui"]),
      typeStructure: fc.constant<TypeStructure[]>(["privee"]),
      trancheCA: fc.constant<TrancheChiffreAffaire[]>(["petit"]),
      trancheNombreEmployes: fc.constant<TrancheNombreEmployes[]>(["petit"]),
      etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
      secteurActivite: fc.subarray([...ValeursSecteursSansSousSecteur]),
      sousSecteurActivite: fc.constant([]),
    })
    .chain<DonneesSansActivite>(ajouteSecteursArbitraires)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
const donneesArbitrairesFormOSEMoyenGrand: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fc
    .record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
      designeOperateurServicesEssentiels: fc.constant<
        DesignationOperateurServicesEssentiels[]
      >(["oui"]),
      typeStructure: fc.constant<TypeStructure[]>(["privee"]),
      sousSecteurActivite: fc.constant([]),
      etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
      secteurActivite: fc.subarray([...ValeursSecteursSansSousSecteur]),
      trancheCA: tranche(),
    })
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        trancheNombreEmployes: trancheSansDoublonSurValeur(base, "petit"),
      }),
    )
    .chain<Partial<IDonneesFormulaireSimulateur>>(ajouteSecteursArbitraires)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

describe("Entité OSE pour NIS1", () => {
  it("de petite taille est toujours éligible", () => {
    fc.assert(
      fc.property(donneesArbitrairesFormOSEPetit, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.EligiblePetiteEntreprise,
        );
      }),
    );
  });
  it("de moyenne taille est toujours éligible", () => {
    fc.assert(
      fc.property(donneesArbitrairesFormOSEMoyenGrand, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
        );
      }),
    );
  });
});

describe("Entite non OSE pour NIS 1", () => {
  const donneesArbitrairesFormActivitesAutres: fc.Arbitrary<IDonneesFormulaireSimulateur> =
    fc
      .record<DonneesSansActivite>({
        designeOperateurServicesEssentiels: fc.constant<
          DesignationOperateurServicesEssentiels[]
        >(["non"]),
        typeStructure: fc.constant<TypeStructure[]>(["privee"]),
        trancheCA: tranche(),
        trancheNombreEmployes: tranche(),
        sousSecteurActivite: fc.constant([]),
        etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
        secteurActivite: fc.subarray([...ValeursSecteursSansSousSecteur]),
      })
      .chain<DonneesSansActivite>((base) =>
        ajouteSecteursArbitraires(base, (activite: Activite) =>
          activite.startsWith("autre"),
        ),
      )
      .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
  it("n'est pas eligible si activites cochees sont uniquement autres", () => {
    fc.assert(
      fc.property(donneesArbitrairesFormActivitesAutres, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.NonEligible,
        );
      }),
    );
  });
});
