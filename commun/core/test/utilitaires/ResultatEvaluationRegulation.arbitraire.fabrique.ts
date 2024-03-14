import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { ens } from "../../../utils/services/sets.operations";
import { ActivitesPourSecteur } from "../../src/Domain/Simulateur/Activite.definitions";
import {
  SecteurActivite,
  SecteurSimple,
} from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationsSecteurPossible,
  InformationsSecteurSimpleListe,
} from "../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { fabriqueContenuCapsuleInformationSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.fabriques";
import { eqInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { Arbitraire as A } from "./Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_Autres_PourSecteurSimple,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
} from "./EnsActivites.arbitraires.fabriques";

export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    A.enchaine<
      Set<InformationsSecteurPossible<Taille>>,
      ReponseInformationsSecteur<Taille>
    >((info) =>
      fc.record({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(info),
      }),
    );

export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_GE =
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
    "Grand",
  );

export const fabriqueArb_EnsInformationsSecteurPossible = <
  Taille extends CategorieTaille,
  T extends
    InformationsSecteurPossible<Taille> = InformationsSecteurPossible<Taille>,
>(
  arb: fc.Arbitrary<T>,
) =>
  A.enchaine<T[], Set<T>>(A.ensembleDepuisArray)(
    fc.uniqueArray(arb, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    }),
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
export const fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
      taille,
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
  A.enchaine(fabriqueArb_EnsActivites_Autres_PourSecteurSimple),
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
    <T extends SecteurActivite, U extends InformationsSecteurSimpleListe>(
      secteur: T,
    ): fc.Arbitrary<U> =>
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre)([
        secteur,
        "PasDeSousSecteurActivite",
      ]),
  ),
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivite_PourTaille =

    <Secteur extends SecteurSimple>(secteur: Secteur) =>
    <TypeActivite extends ActivitesPourSecteur[Secteur]>(
      activite: TypeActivite,
    ) =>
    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
      fc.record({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(
          ens({
            secteurActivite: secteur,
            activites: ens(activite),
          }),
        ),
      });
//: fc.Arbitrary<ReponseInformationsSecteur<Taille>>