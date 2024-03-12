import { fc } from "@fast-check/vitest";
import {
  Activite,
  ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau,
  ActivitesLocalisablesGrand,
} from "../../src/Domain/Simulateur/Activite.definitions";
import { AppartenancePaysUnionEuropeenne } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
} from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../src/Domain/Simulateur/services/Activite/Activite.operations";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  ActivitesAvecBesoinLocalisationRepresentant,
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurSansBesoinLocalisation,
  InformationsSecteurSimple,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { PeutEtreSousSecteurActivite } from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  arbFournitServiceUnionEuropeenne_ToujoursNon,
  arbFournitServiceUnionEuropeenne_ToujoursOui,
} from "../Domaine/arbitraires/ValeursChampsSimulateur.arbitraire";
import { Arbitraire as A } from "./Arbitraires.operations";

export const fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite =
  (filtre: (activite: Activite) => boolean) =>
  <T extends SecteurActivite, U extends Activite>(
    secteur: T,
    sousSecteur: PeutEtreSousSecteurActivite,
  ): fc.Arbitrary<Set<U>> =>
    fc
      .subarray(getActivitesPour(secteur, sousSecteur).filter(filtre), {
        minLength: 1,
      })
      .chain(A.ensembleDepuisArray) as fc.Arbitrary<Set<U>>;
export const fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple =
  (filtre: (a: Activite) => boolean) =>
  <T extends SecteurActivite, U extends InformationsSecteurSimple>(
    secteur: T,
  ): fc.Arbitrary<U> =>
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(filtre)([
      secteur,
      "PasDeSousSecteurActivite",
    ]);
export const fabriqueArb_EnsActivites_AvecFiltre_PourSecteur =
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
      activites:
        fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
          filtre,
        )(secteur, sousSecteur),
    }) as unknown as fc.Arbitrary<R>;
// export const fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe =
//   <
//     T extends SecteurAvecBesoinLocalisationRepresentant,
//     U extends "registresNomsDomainesPremierNiveau" | "fournisseurServicesDNS",
//   >(
//     fabriqueActivite: (
//       secteur: T,
//       sousSecteur: PeutEtreSousSecteurActivite,
//     ) => fc.Arbitrary<Set<U>>,
//   ) =>
//   (
//     arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
//   ) =>
//   (
//     secteur: T,
//   ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
//     fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
//       secteurActivite: fc.constant(secteur),
//       activites: fabriqueActivite(secteur, "PasDeSousSecteurActivite"),
//       fournitServicesUnionEuropeenne:
//         arbFournitServiceUnionEuropeenne_ToujoursOui,
//       localisationRepresentant: arbLocalisationRepresentant,
//     }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;
export const fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe =
  <
    Taille extends CategorieTaille,
    S extends
      SecteurAvecBesoinLocalisationRepresentant = SecteurAvecBesoinLocalisationRepresentant,
    A extends
      ActivitesAvecBesoinLocalisationRepresentant<Taille> = ActivitesAvecBesoinLocalisationRepresentant<Taille>,
  >(
    fabriqueActivite: (
      secteur: S,
      sousSecteur: PeutEtreSousSecteurActivite,
    ) => fc.Arbitrary<Set<A>>,
  ) =>
  (
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
  ) =>
  (
    secteur: S,
  ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<Taille>> =>
    fc.record<InformationsSecteurAvecBesoinLocalisation<Taille>>({
      secteurActivite: fc.constant(secteur),
      activites: fabriqueActivite(secteur, "PasDeSousSecteurActivite"),
      fournitServicesUnionEuropeenne:
        arbFournitServiceUnionEuropeenne_ToujoursOui,
      localisationRepresentant: arbLocalisationRepresentant,
    }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<Taille>>;
export const fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe = <
  T extends SecteurAvecBesoinLocalisationRepresentant,
>(
  secteur: T,
): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
  fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
      estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
    )<T, ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau>(
      secteur,
      "PasDeSousSecteurActivite",
    ),
    fournitServicesUnionEuropeenne:
      arbFournitServiceUnionEuropeenne_ToujoursNon,
  }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;
export const fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe = <
  T extends SecteurAvecBesoinLocalisationRepresentant,
>(
  secteur: T,
): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">> =>
  fc.record<InformationsSecteurAvecBesoinLocalisation<"Petit">>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
      estActiviteListee,
    )<T, ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau>(
      secteur,
      "PasDeSousSecteurActivite",
    ),
    fournitServicesUnionEuropeenne:
      arbFournitServiceUnionEuropeenne_ToujoursNon,
  }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<"Petit">>;
export const fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre = <
  Taille extends CategorieTaille,
  S extends SecteurAvecBesoinLocalisationRepresentant,
  A extends ActivitesAvecBesoinLocalisationRepresentant<Taille>,
>(
  predicatActivite: (
    a:
      | Activite
      | ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau,
  ) => boolean,
) =>
  fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe<Taille, S, A>(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
      predicatActivite,
    ),
  );
export const fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE =
  fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
    CategorieTaille,
    SecteurAvecBesoinLocalisationRepresentant,
    ActivitesLocalisablesGrand
  >(estActiviteListee);
export const fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation =
  fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre(
    estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  );
export const fabriqueArb_EnsActivites_Infranum_Localisees =
  <
    TypeSecteurActivite extends
      | "gestionServicesTic"
      | "fournisseursNumeriques"
      | "infrastructureNumerique",
  >(
    arbSecteurActivite: fc.Arbitrary<TypeSecteurActivite>,
  ) =>
  <TypeAppartenancePaysUnionEuropeenne extends AppartenancePaysUnionEuropeenne>(
    arb: fc.Arbitrary<TypeAppartenancePaysUnionEuropeenne>,
  ) =>
    A.enchaine(fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(arb))(
      arbSecteurActivite,
    );
