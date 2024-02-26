import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  Activite,
  ActivitesLocalisablesGrand,
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
  SecteurAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../../src/Domain/Simulateur/services/Activite/Activite.operations";
import { estActiviteListee } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { fabriqueContenuCapsuleInformationSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/CapsuleReponse.fabriques";
import { FabriqueEtatDonneesSimulateur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import {
  CategorieTaille,
  InformationSecteurLocalisable,
  InformationSecteurPossible,
  InformationSecteurSimple,
  InformationsSecteursCompositeListe,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseDesignationOperateurServicesEssentiels,
  ReponseInformationsSecteur,
  ReponseStructure,
  ReponseStructurePrivee,
  ReponseStructurePublique,
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

export const fabriqueArbEnsembleActivitesPourSecteurAvecFiltre =
  (filtre: (activite: Activite) => boolean) =>
  <T extends SecteurActivite, U extends Activite>(
    secteur: T,
    sousSecteur?: SousSecteurActivite,
  ): fc.Arbitrary<Set<U>> => {
    return fc
      .subarray(getActivitesPour(secteur, sousSecteur).filter(filtre), {
        minLength: 1,
      })
      .chain((a) => fc.constant(ens(...a))) as fc.Arbitrary<Set<U>>;
  };
export const fabriqueArbEnsembleActivitesPourSecteur =
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee);
export const fabriqueArbitraireEnsembleActivitesPourSecteurComposite =
  (filtre: (a: Activite) => boolean) =>
  <T extends SecteursAvecSousSecteurs, U extends SousSecteurDe<T>>([
    secteur,
    sousSecteur,
  ]: [T, U]): fc.Arbitrary<InformationsSecteursCompositeListe> =>
    fc.record({
      secteurActivite: fc.constant(secteur),
      sousSecteurActivite: fc.constant(sousSecteur),
      activites: fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(filtre)(
        secteur,
        sousSecteur,
      ),
    }) as fc.Arbitrary<InformationsSecteursCompositeListe>;

export const fabriqueArbitraireEnsembleActivitesPourSecteur =
  (filtre: (a: Activite) => boolean) =>
  <T extends SecteurActivite, U extends InformationSecteurSimple>(
    secteur: T,
  ): fc.Arbitrary<U> =>
    fc.record({
      secteurActivite: fc.constant(secteur),
      activites:
        fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(filtre)(secteur),
    }) as fc.Arbitrary<U>;
export const fabriqueArbitraireCapsuleSecteurPetit = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArbitraireCapsuleSecteurGrand = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Grand">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Grand"),
      secteurs: fc.constant(info),
    }),
  );

export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe =
  <
    T extends SecteurAvecBesoinLocalisationRepresentant,
    U extends "registresNomsDomainesPremierNiveau" | "fournisseurServicesDNS",
  >(
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
    fabriqueActivite: (
      secteur: T,
      sousSecteur?: SousSecteurActivite,
    ) => fc.Arbitrary<Set<U>>,
  ) =>
  (secteur: T): fc.Arbitrary<InformationSecteurLocalisable<"Petit">> =>
    fc.record<InformationSecteurLocalisable<"Petit">>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueActivite(secteur),
      fournitServicesUnionEuropeenne: fc.constant("oui"),
      localisationRepresentant: arbLocalisationRepresentant,
    }) as fc.Arbitrary<InformationSecteurLocalisable<"Petit">>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand =

    <
      T extends SecteurAvecBesoinLocalisationRepresentant,
      U extends ActivitesLocalisablesGrand,
    >(
      arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
      fabriqueActivite: (
        secteur: T,
        sousSecteur?: SousSecteurActivite,
      ) => fc.Arbitrary<Set<U>>,
    ) =>
    (secteur: T): fc.Arbitrary<InformationSecteurLocalisable<"Grand">> =>
      fc.record<InformationSecteurLocalisable<"Grand">>({
        secteurActivite: fc.constant(secteur),
        activites: fabriqueActivite(secteur),
        fournitServicesUnionEuropeenne: fc.constant("oui"),
        localisationRepresentant: arbLocalisationRepresentant,
      }) as fc.Arbitrary<InformationSecteurLocalisable<"Grand">>;
export const fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe = <
  T extends SecteurAvecBesoinLocalisationRepresentant,
>(
  secteur: T,
): fc.Arbitrary<InformationSecteurLocalisable<"Petit">> =>
  fc.record<InformationSecteurLocalisable<"Petit">>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur<
      T,
      ActivitesLocalisablesPetit
    >(secteur),
    fournitServicesUnionEuropeenne: fc.constant("non"),
  }) as fc.Arbitrary<InformationSecteurLocalisable<"Petit">>;

export const fabriqueArbitraireCapsuleSecteurLocalisable = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  arbFournitServicesUnionEuropeenne?: fc.Arbitrary<FournitServicesUnionEuropeenne>,
  arbLocalisationRepresentant?: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
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

export const fabriqueArbitrairesEnsembleInformationsSecteurs = <
  T extends InformationSecteurPossible<CategorieTaille>,
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
  ReponseStructure<CategorieTaille>,
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
  ReponseStructurePrivee<"Petit"> | ReponseStructurePublique<"Petit">,
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
export const fabriqueResultatEvaluationEnSuspensSecteurGrand = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesignationOperateurServicesEssentiels,
  ReponseAppartenancePaysUnionEuropeenne,
  ReponseStructurePrivee<"Grand"> | ReponseStructurePublique<"Grand">,
  ReponseInformationsSecteur<"Grand">,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurGrandChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
    ),
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
