import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  Activite,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursOuiNon } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import {
  SecteurActivite,
  SecteursAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../../src/Domain/Simulateur/services/Activite/Activite.operations";
import { estActiviteListee } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { FabriqueEtatDonneesSimulateur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import {
  InformationSecteurLocalisablePetiteEntreprise,
  InformationSecteurPossible,
  InformationSecteurSimple,
  InformationsSecteursCompositeListe,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteurPetit,
  ReponseStructure,
  ReponseStructurePetit,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { eqInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.predicats";
import {
  SousSecteurActivite,
  SousSecteurDe,
} from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";

const determineArbFournitServicesUnionEuropeenne = (
  arbFournitServicesUnionEuropeenne?: fc.Arbitrary<FournitServicesUnionEuropeenne>,
  arbLocalisationRepresentant?: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
): {
  fournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>;
} => ({
  fournitServicesUnionEuropeenne:
    arbFournitServicesUnionEuropeenne && arbLocalisationRepresentant
      ? fc.constantFrom(...ValeursOuiNon)
      : fc.constant("non"),
});

const determineArbLocalisationRepresentant = (
  arbLocalisationRepresentant?: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
): {
  localisationRepresentant?: fc.Arbitrary<AppartenancePaysUnionEuropeenne>;
} =>
  arbLocalisationRepresentant
    ? {}
    : { localisationRepresentant: arbLocalisationRepresentant };

export const fabriqueArbEnsembleActivitesPourSecteur = <
  T extends SecteurActivite,
  U extends Activite,
>(
  secteur: T,
  sousSecteur?: SousSecteurActivite,
): fc.Arbitrary<Set<U>> =>
  fc
    .subarray(
      getActivitesPour(secteur, sousSecteur).filter(estActiviteListee),
      {
        minLength: 1,
      },
    )
    .chain((a) => fc.constant(ens(...a))) as fc.Arbitrary<Set<U>>;
export const fabriqueArbEnsembleActivitesPourSecteurAvecFiltre =
  (filtre: (activite: Activite) => boolean) =>
  <T extends SecteurActivite, U extends Activite>(
    secteur: T,
    sousSecteur?: SousSecteurActivite,
  ): fc.Arbitrary<Set<U>> =>
    fc
      .subarray(getActivitesPour(secteur, sousSecteur).filter(filtre), {
        minLength: 1,
      })
      .chain((a) => fc.constant(ens(...a))) as fc.Arbitrary<Set<U>>;
export const fabriqueArbitraireEnsembleActivitesPourSecteur = <
  T extends SecteurActivite,
  U extends InformationSecteurSimple,
>(
  secteur: T,
): fc.Arbitrary<U> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur),
  }) as fc.Arbitrary<U>;

export const fabriqueArbitraireEnsembleActivitesPourSecteurComposite = <
  T extends SecteursAvecSousSecteurs,
  U extends SousSecteurDe<T>,
>([secteur, sousSecteur]: [
  T,
  U,
]): fc.Arbitrary<InformationsSecteursCompositeListe> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    sousSecteurActivite: fc.constant(sousSecteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur, sousSecteur),
  }) as fc.Arbitrary<InformationsSecteursCompositeListe>;
export const fabriqueArbitraireCapsuleSecteur = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteurPetit> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );

export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe =
  <
    T extends SecteursAvecBesoinLocalisationRepresentant,
    U extends "registresNomsDomainesPremierNiveau" | "fournisseurServicesDNS",
  >(
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
    fabriqueActivite: (
      secteur: T,
      sousSecteur?: SousSecteurActivite,
    ) => fc.Arbitrary<Set<U>>,
  ) =>
  (secteur: T): fc.Arbitrary<InformationSecteurLocalisablePetiteEntreprise> =>
    fc.record<InformationSecteurLocalisablePetiteEntreprise>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueActivite(secteur),
      fournitServicesUnionEuropeenne: fc.constant("oui"),
      localisationRepresentant: arbLocalisationRepresentant,
    }) as fc.Arbitrary<InformationSecteurLocalisablePetiteEntreprise>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe = <
  T extends SecteursAvecBesoinLocalisationRepresentant,
>(
  secteur: T,
): fc.Arbitrary<InformationSecteurLocalisablePetiteEntreprise> =>
  fc.record<InformationSecteurLocalisablePetiteEntreprise>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur<
      T,
      ActivitesLocalisablesPetit
    >(secteur),
    fournitServicesUnionEuropeenne: fc.constant("non"),
  }) as fc.Arbitrary<InformationSecteurLocalisablePetiteEntreprise>;

export const fabriqueArbitraireCapsuleSecteurLocalisable = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  arbFournitServicesUnionEuropeenne?: fc.Arbitrary<FournitServicesUnionEuropeenne>,
  arbLocalisationRepresentant?: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
): fc.Arbitrary<ReponseInformationsSecteurPetit> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
      ...determineArbFournitServicesUnionEuropeenne(
        arbFournitServicesUnionEuropeenne,
        arbLocalisationRepresentant,
      ),
      ...determineArbLocalisationRepresentant(arbLocalisationRepresentant),
    }),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteurPetit> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );

export const fabriqueArbitrairesEnsembleInformationsSecteurs = <
  T extends InformationSecteurPossible,
>(
  arb: fc.Arbitrary<T>,
) =>
  fc
    .uniqueArray(arb, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    })
    .chain((a) => fc.constant(ens(...a)));
export const fabriqueResultatEvaluationInconnuOse = (
  designationOperateurServicesEssentiels: ReponseDesignationOperateurServicesEssentiels,
) =>
  fabriqueResultatEvaluationInconnu({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels:
      designationOperateurServicesEssentiels,
  });
export const fabriqueResultatEvaluationEnSuspensAppUE = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
  );
export const fabriqueResultatEvaluationEnSuspensStructure = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.structureChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
    ),
  );
export const fabriqueResultatEvaluationEnSuspensSecteurPetit = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructurePetit,
  ReponseInformationsSecteurPetit,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurPetitChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ),
  );
