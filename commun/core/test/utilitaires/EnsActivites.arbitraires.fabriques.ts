import { fc } from "@fast-check/vitest";
import { Activite } from "../../src/Domain/Simulateur/Activite.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
} from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../src/Domain/Simulateur/Activite.operations";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteListee,
} from "../../src/Domain/Simulateur/Activite.predicats";
import {
  RepInfoSecteur,
  RepInfoSecteurLocalises,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { PeutEtreSousSecteurActivite } from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
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
export const fabriqueArb_EnsActivites_AvecFiltre_PourSecteur =
  <Taille extends CategorieTaille>(filtre: (a: Activite) => boolean) =>
  <
    Secteur extends SecteurActivite,
    Sortie extends RepInfoSecteur<Taille>,
    PeutEtreSousSecteur extends PeutEtreSousSecteurActivite,
  >([secteur, sousSecteur]: [
    Secteur,
    PeutEtreSousSecteur,
  ]): fc.Arbitrary<Sortie> =>
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
    }) as unknown as fc.Arbitrary<Sortie>;

// export const fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe =
//   <
//     Taille extends CategorieTaille,
//     S extends
//       SecteurAvecBesoinLocalisationRepresentant = SecteurAvecBesoinLocalisationRepresentant,
//     A extends
//       ActivitesAvecBesoinLocalisationRepresentant<Taille> = ActivitesAvecBesoinLocalisationRepresentant<Taille>,
//   >(
//     fabriqueActivite: (
//       secteur: S,
//       sousSecteur: PeutEtreSousSecteurActivite,
//     ) => fc.Arbitrary<Set<A>>,
//   ) =>
//   (
//     arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
//   ) =>
//   (
//     secteur: S,
//   ): fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<Taille>> =>
//     fc.record<InformationsSecteurAvecBesoinLocalisation<Taille>>({
//       secteurActivite: fc.constant(secteur),
//       activites: fabriqueActivite(secteur, "PasDeSousSecteurActivite"),
//       fournitServicesUnionEuropeenne:
//         arbFournitServiceUnionEuropeenne_ToujoursOui,
//       localisationRepresentant: arbLocalisationRepresentant,
//     }) as fc.Arbitrary<InformationsSecteurAvecBesoinLocalisation<Taille>>;
export const fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe = <
  T extends SecteurAvecBesoinLocalisationRepresentant,
  Sortie extends RepInfoSecteurLocalises<CategorieTaille>,
>(
  secteur: T,
): fc.Arbitrary<Sortie> =>
  fc.record<Sortie>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
      estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
    )(secteur, "PasDeSousSecteurActivite"),
  } as {
    [K in keyof Sortie]: fc.Arbitrary<Sortie[K]>;
  });
export const fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe = <
  Secteur extends SecteurAvecBesoinLocalisationRepresentant,
  Sortie extends RepInfoSecteurLocalises<CategorieTaille>,
>(
  secteur: Secteur,
): fc.Arbitrary<Sortie> =>
  fc.record<Sortie>({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
      estActiviteListee,
    )(secteur, "PasDeSousSecteurActivite"),
  } as {
    [K in keyof Sortie]: fc.Arbitrary<Sortie[K]>;
  }) as fc.Arbitrary<Sortie>;
// export const fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre = <
//   Taille extends CategorieTaille,
//   S extends SecteurAvecBesoinLocalisationRepresentant,
//   A extends ActivitesAvecBesoinLocalisationRepresentant<Taille>,
// >(
//   predicatActivite: (a: Activite | ActiviteInfranumLocalEtabLot1) => boolean,
// ) =>
//   fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe<Taille, S, A>(
//     fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
//       predicatActivite,
//     ),
//   );
// export const fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE =
//   fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
//     CategorieTaille,
//     SecteurAvecBesoinLocalisationRepresentant,
//     ActivitesLocalisablesGrand
//   >(estActiviteListee);
// export const fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation =
//   fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre(
//     estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
//   );
// export const fabriqueArb_EnsActivites_Infranum_Localisees =
//   <
//     TypeSecteurActivite extends
//       | "gestionServicesTic"
//       | "fournisseursNumeriques"
//       | "infrastructureNumerique",
//   >(
//     arbSecteurActivite: fc.Arbitrary<TypeSecteurActivite>,
//   ) =>
//   <TypeAppartenancePaysUnionEuropeenne extends AppartenancePaysUnionEuropeenne>(
//     arb: fc.Arbitrary<TypeAppartenancePaysUnionEuropeenne>,
//   ) =>
//     A.enchaine(fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(arb))(
//       arbSecteurActivite,
//     );
export const fabriqueArb_EnsActivites_Autres_PourSecteurSimple = <
  T extends SecteurActivite,
  U extends RepInfoSecteur<CategorieTaille>,
>(
  secteur: T,
): fc.Arbitrary<U> =>
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee)([
    secteur,
    "PasDeSousSecteurActivite",
  ]);
