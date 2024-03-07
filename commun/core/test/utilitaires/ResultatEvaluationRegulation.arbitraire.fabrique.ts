import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { ens } from "../../../utils/services/sets.operations";
import {
  Activite,
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../src/Domain/Simulateur/Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
  TypeStructure,
} from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { resultatIncertain } from "../../src/Domain/Simulateur/Regulation.constantes";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
} from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../src/Domain/Simulateur/services/Activite/Activite.operations";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { fabriqueContenuCapsuleInformationSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/CapsuleReponse.fabriques";
import { UnionReponseEtatNonVide } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";
import { FabriqueEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import { ReponseAppartenancePaysUnionEuropeenne } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseAppartenancePaysUnionEuropeenne.definition";
import { ReponseDesignationOperateurServicesEssentiels } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseDesignationOperateurServicesEssentiels.definitino";
import {
  eqInformationsSecteur,
  InformationSecteurSimple,
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurPossible,
  InformationsSecteurSansBesoinLocalisation,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { PeutEtreSousSecteurActivite } from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  arbFournitServiceUnionEuropeenne_ToujoursNon,
  arbFournitServiceUnionEuropeenne_ToujoursOui,
} from "../Domaine/arbitraires/ValeursChampsSimulateur.arbitraire";

const determineArbFournitServicesUnionEuropeenne = (
  arbFournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>,
  arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
): {
  fournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>;
} => ({
  fournitServicesUnionEuropeenne:
    arbFournitServicesUnionEuropeenne && arbLocalisationRepresentant
      ? arbFournitServicesUnionEuropeenne
      : arbFournitServiceUnionEuropeenne_ToujoursNon,
});
const fabriqueArbitraireEnsembleDepuisArray = <T>(a: T[]) =>
  fc.constant(ens(...a));
const determineArbLocalisationRepresentant = (
  arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
): {
  localisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>;
} => ({ localisationRepresentant: arbLocalisationRepresentant });

export const fabriqueArbEnsembleActivitesPourSecteurAvecFiltre =
  (filtre: (activite: Activite) => boolean) =>
  <T extends SecteurActivite, U extends Activite>(
    secteur: T,
    sousSecteur: PeutEtreSousSecteurActivite,
  ): fc.Arbitrary<Set<U>> =>
    fc
      .subarray(getActivitesPour(secteur, sousSecteur).filter(filtre), {
        minLength: 1,
      })
      .chain(fabriqueArbitraireEnsembleDepuisArray) as fc.Arbitrary<Set<U>>;
export const fabriqueArbEnsembleActivitesPourSecteur =
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee);

export const fabriqueArbitraireEnsembleActivitesPourSecteurAgno =
  (filtre: (a: Activite) => boolean) =>
  <
    T extends SecteurActivite,
    R extends
      | InformationsSecteurSansBesoinLocalisation
      | InformationsSecteurAvecBesoinLocalisation<CategorieTaille>,
    U extends PeutEtreSousSecteurActivite,
  >([secteur, sousSecteur]: [T, U]): fc.Arbitrary<R> =>
    fc.record({
      secteurActivite: fc.constant(secteur),
      ...(sousSecteur
        ? {
            sousSecteurActivite: fc.constant(sousSecteur),
          }
        : {}),
      activites: fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(filtre)(
        secteur,
        sousSecteur,
      ),
    }) as unknown as fc.Arbitrary<R>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurComposite =
  fabriqueArbitraireEnsembleActivitesPourSecteurAgno;

export const fabriqueArbitraireEnsembleActivitesPourSecteur =
  (filtre: (a: Activite) => boolean) =>
  <T extends SecteurActivite, U extends InformationSecteurSimple>(
    secteur: T,
  ): fc.Arbitrary<U> =>
    fabriqueArbitraireEnsembleActivitesPourSecteurAgno(filtre)([
      secteur,
      "PasDeSousSecteurActivite",
    ]);
export const fabriqueArbitraireCapsuleSecteur =
  <T extends CategorieTaille>(taille: `${T}`) =>
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<T>> =>
    arb.chain((info) =>
      fc.record({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(info),
      }),
    );
export const fabriqueArbitraireCapsuleSecteurPetit =
  fabriqueArbitraireCapsuleSecteur("Petit");
export const fabriqueArbitraireCapsuleSecteurMoyen =
  fabriqueArbitraireCapsuleSecteur("Moyen");
export const fabriqueArbitraireCapsuleSecteurGrand =
  fabriqueArbitraireCapsuleSecteur("Grand");

export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe =
  <
    T extends SecteurAvecBesoinLocalisationRepresentant,
    U extends "registresNomsDomainesPremierNiveau" | "fournisseurServicesDNS",
  >(
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
    fabriqueActivite: (
      secteur: T,
      sousSecteur: PeutEtreSousSecteurActivite,
    ) => fc.Arbitrary<Set<U>>,
  ) =>
  (
    secteur: T,
  ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
    fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueActivite(secteur, "PasDeSousSecteurActivite"),
      fournitServicesUnionEuropeenne:
        arbFournitServiceUnionEuropeenne_ToujoursOui,
      localisationRepresentant: arbLocalisationRepresentant,
    }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;

export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand =

    <
      T extends SecteurAvecBesoinLocalisationRepresentant,
      U extends ActivitesLocalisablesGrand,
    >(
      arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
      fabriqueActivite: (
        secteur: T,
        sousSecteur: PeutEtreSousSecteurActivite,
      ) => fc.Arbitrary<Set<U>>,
    ) =>
    (
      secteur: T,
    ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Grand">> =>
      fc.record<InformationsSecteurAvecBesoinLocalisation<"Grand">>({
        secteurActivite: fc.constant(secteur),
        activites: fabriqueActivite(secteur, "PasDeSousSecteurActivite"),
        fournitServicesUnionEuropeenne:
          arbFournitServiceUnionEuropeenne_ToujoursOui,
        localisationRepresentant: arbLocalisationRepresentant,
      }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Grand">>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurInfraNumLocalisable_HorsUe =
  <T extends SecteurAvecBesoinLocalisationRepresentant>(
    secteur: T,
  ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
    fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<T, ActivitesLocalisablesPetit>(secteur, "PasDeSousSecteurActivite"),
      fournitServicesUnionEuropeenne:
        arbFournitServiceUnionEuropeenne_ToujoursNon,
    }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurEILocalisable_HorsUe =
  <T extends SecteurAvecBesoinLocalisationRepresentant>(
    secteur: T,
  ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
    fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteListee,
      )<T, ActivitesLocalisablesPetit>(secteur, "PasDeSousSecteurActivite"),
      fournitServicesUnionEuropeenne:
        arbFournitServiceUnionEuropeenne_ToujoursNon,
    }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;

export const fabriqueArbitraireCapsuleSecteurLocalisable =
  (
    arbFournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>,
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
  ) =>
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
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
export const fabriqueArbitraireCapsuleSecteurNonLoca = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisableGrand =
  (
    arbFournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>,
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
  ) =>
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<"Grand">> =>
    arb.chain((info) =>
      fc.record({
        _categorieTaille: fc.constant("Grand"),
        secteurs: fc.constant(info),
        ...determineArbFournitServicesUnionEuropeenne(
          arbFournitServicesUnionEuropeenne,
          arbLocalisationRepresentant,
        ),
      }),
    );
export const fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFranceGrand = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Grand">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Grand"),
      secteurs: fc.constant(info),
    }),
  );

export const fabriqueArbitrairesEnsembleInformationsSecteurs = <
  T extends InformationsSecteurPossible<CategorieTaille>,
>(
  arb: fc.Arbitrary<T>,
) =>
  fc
    .uniqueArray(arb, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    })
    .chain(fabriqueArbitraireEnsembleDepuisArray);
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
  ReponseStructure<TypeStructure, CategorieTaille>,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.structureChaineGen(
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
  ReponseStructure<TypeStructure, "Petit">,
  ReponseInformationsSecteur<"Petit">,
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
export const fabriqueResultatEvaluationEnSuspensSecteur = <
  S extends TypeStructure,
  T extends CategorieTaille,
>([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructure<S, T>,
  ReponseInformationsSecteur<T>,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurChaine<S, T>(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ) as UnionReponseEtatNonVide,
  );
export const fabriqueArbInformationsSecteurAutre = <T extends CategorieTaille>(
  taille: T,
) =>
  fc.constantFrom<ReponseInformationsSecteur<T>>(
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        secteurActivite: "autreSecteurActivite",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        secteurActivite: "energie",
        sousSecteurActivite: "autreSousSecteurEnergie",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        secteurActivite: "fabrication",
        sousSecteurActivite: "autreSousSecteurFabrication",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        secteurActivite: "transports",
        sousSecteurActivite: "autreSousSecteurTransports",
      }),
    ),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand(
    fc.constant("oui"),
    fc.constant("france"),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France =
  fabriqueArbitraireCapsuleSecteurLocalisable(
    fc.constant("oui"),
    fc.constant("france"),
  );
export const fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe =
  flow(
    fabriqueArbitrairesEnsembleInformationsSecteurs<
      InformationsSecteurAvecBesoinLocalisation<"Grand">
    >,
    fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France,
  );
