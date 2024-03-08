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
  InformationsSecteurAvecBesoinLocalisation,
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

export const fabriqueArb_ReponseInformationsSecteur_Localisable_PE =
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
        ...{ localisationRepresentant: arbLocalisationRepresentant },
      }),
    );
export const fabriqueArb_ReponseInformationsSecteur_NonLoca_PE = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArb_ReponseInformationsSecteur_Localisable_GE =
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
export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PE =
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<"Petit">> =>
    arb.chain((info) =>
      fc.record({
        _categorieTaille: fc.constant("Petit"),
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
  T extends InformationsSecteurPossible<CategorieTaille>,
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
export const fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_GE =
  fabriqueArb_ReponseInformationsSecteur_Localisable_GE(
    fc.constant("oui"),
    fc.constant("france"),
  );
export const fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PE =
  fabriqueArb_ReponseInformationsSecteur_Localisable_PE(
    fc.constant("oui"),
    fc.constant("france"),
  );
export const fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe =
  flow(
    fabriqueArb_EnsInformationsSecteurPossible<
      InformationsSecteurAvecBesoinLocalisation<"Grand">
    >,
    fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_GE,
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
