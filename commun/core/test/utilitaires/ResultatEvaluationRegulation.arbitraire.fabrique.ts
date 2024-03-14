import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { ens } from "../../../utils/services/sets.operations";
import {
  ActiviteInfranumLocalEtabLot1,
  ActiviteInfranumLocalServices,
  ActivitesPourSecteur,
} from "../../src/Domain/Simulateur/Activite.definitions";
import {
  SecteurActivite,
  SecteurSimple,
} from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationsAutresSecteursListes,
  InformationsSecteurComposite,
} from "../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import {
  LocalisationEtablissementPrincipal,
  LocalisationsServices,
} from "../../src/Domain/Simulateur/services/Eligibilite/LocalisationsActivites.definitions";
import {
  RepInfoSecteur,
  RepInfoSecteurInfranum,
  RepInfoSecteurLocalEtab,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { fabriqueContenuCapsuleInformationSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.fabriques";
import { eqInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { fabriqueCategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.fabriques";
import { PeutEtreSousSecteurActivite } from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import { Arbitraire as A } from "./Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_Autres_PourSecteurSimple,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
} from "./EnsActivites.arbitraires.fabriques";

export const fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    A.enchaine<Set<RepInfoSecteur<Taille>>, ReponseInformationsSecteur<Taille>>(
      (info) =>
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
  T extends RepInfoSecteur<Taille> = RepInfoSecteur<Taille>,
>(
  arb: fc.Arbitrary<T>,
) =>
  A.enchaine<T[], Set<T>>(A.ensembleDepuisArray)(
    fc.uniqueArray(arb as fc.Arbitrary<T>, {
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
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "autreSecteurActivite",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "energie",
        sousSecteurActivite: "autreSousSecteurEnergie",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "fabrication",
        sousSecteurActivite: "autreSousSecteurFabrication",
      }),
    ),
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
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
    fabriqueArb_EnsInformationsSecteurPossible as (
      arb: fc.Arbitrary<RepInfoSecteur<CategorieTaille>>,
    ) => fc.Arbitrary<Set<RepInfoSecteur<"Moyen">>>,
    fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
      "Moyen",
    ),
  );
export const fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_GE_AvecEnsembleDe =
  flow(
    fabriqueArb_EnsInformationsSecteurPossible as (
      arb: fc.Arbitrary<RepInfoSecteur<CategorieTaille>>,
    ) => fc.Arbitrary<Set<RepInfoSecteur<"Grand">>>,
    fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
      "Grand",
    ),
  );
export const fabriqueArb_EnsInformationsSecteur_ActivitesListees = flow(
  A.enchaine(fabriqueArb_EnsActivites_Autres_PourSecteurSimple) as (
    arb: fc.Arbitrary<SecteurActivite>,
  ) => fc.Arbitrary<RepInfoSecteur<CategorieTaille>>,
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInformationsSecteur_ActivitesListeesAgno = flow(
  A.enchaine(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
  ) as (
    arb: fc.Arbitrary<[SecteurActivite, PeutEtreSousSecteurActivite]>,
  ) => fc.Arbitrary<RepInfoSecteur<CategorieTaille>>,
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInformationsSecteur_ActivitesAutres = flow(
  A.enchaine(
    <
      T extends SecteurActivite,
      U extends
        | RepInfoSecteurInfranum<CategorieTaille>
        | RepInfoSecteurLocalEtab<CategorieTaille>
        | InformationsSecteurComposite
        | InformationsAutresSecteursListes,
    >(
      secteur: T,
    ): fc.Arbitrary<U> =>
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre)([
        secteur,
        "PasDeSousSecteurActivite",
      ]),
  ) as (
    arb: fc.Arbitrary<SecteurActivite>,
  ) => fc.Arbitrary<RepInfoSecteur<CategorieTaille>>,
  fabriqueArb_EnsInformationsSecteurPossible,
);
export const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille =

    <Secteur extends SecteurSimple>(secteur: Secteur) =>
    <TypeActivite extends ActivitesPourSecteur[Secteur]>(
      ...activites: TypeActivite[]
    ) =>
    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
      fc.record({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(
          ens({
            secteurActivite: secteur,
            activites: ens(...activites),
          }),
        ),
      });
export const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab =

    <Secteur extends "infrastructureNumerique">(secteur: Secteur) =>
    <TypeActivite extends ActiviteInfranumLocalEtabLot1>(
      ...activites: TypeActivite[]
    ) =>
    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
      A.enchaine((loc: LocalisationEtablissementPrincipal) =>
        fc.record({
          _categorieTaille: fc.constant(taille),
          secteurs: fc.constant(
            ens({
              _categorieTaille: taille,
              secteurActivite: secteur,
              activites: ens(...activites),
              ...loc,
            }),
          ),
        }),
      );
export const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays =

    <Secteur extends "infrastructureNumerique">(secteur: Secteur) =>
    <TypeActivite extends ActiviteInfranumLocalServices>(
      ...activites: TypeActivite[]
    ) =>
    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
      A.enchaine((loc: LocalisationsServices) =>
        fc.record({
          _categorieTaille: fc.constant(taille),
          secteurs: fc.constant(
            ens({
              _categorieTaille: taille,
              secteurActivite: secteur,
              activites: ens(...activites),
              ...loc,
            }),
          ),
        }),
      );


//: fc.Arbitrary<ReponseInformationsSecteur<Taille>>