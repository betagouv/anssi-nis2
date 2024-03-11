import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { ens } from "../../../utils/services/sets.operations";
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
} from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { fabriqueContenuCapsuleInformationSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.fabriques";
import {
  eqInformationsSecteur,
  InformationSecteurSimple,
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { arbFournitServiceUnionEuropeenne_ToujoursNon } from "../Domaine/arbitraires/ValeursChampsSimulateur.arbitraire";
import { Arbitraire as A } from "./Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple,
} from "./EnsActivites.arbitraires.fabriques";

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

export const fabriqueArb_ReponseInformationsSecteur_NonLoca_PE = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArb_ReponseInformationsSecteur_Localisable_PourTaille =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
  (
    arbFournitServicesUnionEuropeenne: fc.Arbitrary<FournitServicesUnionEuropeenne>,
    arbLocalisationRepresentant: fc.Arbitrary<AppartenancePaysUnionEuropeenne>,
  ) =>
    A.enchaine<
      Set<InformationsSecteurPossible<Taille>>,
      ReponseInformationsSecteur<Taille>
    >((info) =>
      fc.record<ReponseInformationsSecteur<Taille>>({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(info),
        ...determineArbFournitServicesUnionEuropeenne(
          arbFournitServicesUnionEuropeenne,
          arbLocalisationRepresentant,
        ),
      }),
    );
export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PE =

    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    (
      arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
    ): fc.Arbitrary<ReponseInformationsSecteur<Taille>> =>
      arb.chain((info) =>
        fc.record({
          _categorieTaille: fc.constant(taille),
          secteurs: fc.constant(info),
        }),
      );
export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_GE =
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<"Grand">> =>
    arb.chain((info) =>
      fc.record({
        _categorieTaille: fc.constant("Grand"),
        secteurs: fc.constant(info),
      }),
    );

export const fabriqueArb_EnsInformationsSecteurPossible = <
  Taille extends CategorieTaille,
  T extends
    InformationsSecteurPossible<Taille> = InformationsSecteurPossible<Taille>,
>(
  arb: fc.Arbitrary<T>,
) =>
  fc
    .uniqueArray(arb, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    })
    .chain(A.ensembleDepuisArray);

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
export const fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    fabriqueArb_ReponseInformationsSecteur_Localisable_PourTaille(taille)(
      fc.constant("oui"),
      fc.constant("france"),
    );
export const fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe =
  flow(
    fabriqueArb_EnsInformationsSecteurPossible,
    fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
      "Moyen",
    ),
  );
export const fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_GE_AvecEnsembleDe =
  flow(
    fabriqueArb_EnsInformationsSecteurPossible,
    fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
      "Grand",
    ),
  );
export const fabriqueArb_EnsInformationsSecteur_ActivitesListees = flow(
  A.enchaine(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple(estActiviteListee),
  ),
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInformationsSecteur_ActivitesListeesAgno = flow(
  A.enchaine(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
  ),
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInformationsSecteur_ActivitesAutres = flow(
  A.enchaine(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple(estActiviteAutre),
  ),
  fabriqueArb_EnsInformationsSecteurPossible,
);
