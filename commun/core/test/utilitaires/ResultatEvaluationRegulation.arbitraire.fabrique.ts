import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { ens } from "../../../utils/services/sets.operations";
import {
  ActiviteInfranumLocalEtabLot1,
  ActiviteInfranumLocalEtabLot2,
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
} from "../../src/Domain/Simulateur/Activite.predicats";
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

export const fabriqueArbInformationsSecteurAutre = <
  Taille extends CategorieTaille,
>(
  taille: `${Taille}`,
) =>
  fc.constantFrom<ReponseInformationsSecteur<Taille>>(
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "autreSecteurActivite",
      }),
    ) as ReponseInformationsSecteur<Taille>,
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "energie",
        sousSecteurActivite: "autreSousSecteurEnergie",
      }),
    ) as ReponseInformationsSecteur<Taille>,
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "fabrication",
        sousSecteurActivite: "autreSousSecteurFabrication",
      }),
    ) as ReponseInformationsSecteur<Taille>,
    fabriqueContenuCapsuleInformationSecteur(taille)(
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "transports",
        sousSecteurActivite: "autreSousSecteurTransports",
      }),
    ) as ReponseInformationsSecteur<Taille>,
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
export const fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites =

    <Taille extends CategorieTaille>(taille: Taille) =>
    <Secteur extends SecteurSimple>(secteur: Secteur) =>
    <TypeActivite extends ActivitesPourSecteur[Secteur]>(
      ...activites: TypeActivite[]
    ) =>
      fc.record({
        _categorieTaille: fc.constant(taille as unknown as `${Taille}`),
        secteurs: fc.constant(
          ens({
            _categorieTaille: taille as unknown as `${Taille}`,
            secteurActivite: secteur,
            activites: ens(...activites),
          }),
        ),
      });

type TypeCond<
  Taille extends CategorieTaille,
  Secteur extends
    | "infrastructureNumerique"
    | "gestionServicesTic"
    | "fournisseursNumeriques",
> = Taille extends "Petit"
  ? ActiviteInfranumLocalEtabLot1
  : Secteur extends "infrastructureNumerique"
    ? ActiviteInfranumLocalEtabLot1 | ActiviteInfranumLocalEtabLot2
    : ActivitesPourSecteur[Secteur];

export const fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourEtab: <
  Taille extends CategorieTaille,
>(
  taille: Taille,
) => <
  Secteur extends
    | "infrastructureNumerique"
    | "gestionServicesTic"
    | "fournisseursNumeriques",
>(
  secteur: Secteur,
) => <TypeActivite extends TypeCond<Taille, Secteur>>(
  ...activites: TypeActivite[]
) => (
  arb: fc.Arbitrary<LocalisationEtablissementPrincipal>,
) => fc.Arbitrary<ReponseInformationsSecteur<Taille>> =
  <Taille extends CategorieTaille>(taille: Taille) =>
  <
    Secteur extends
      | "infrastructureNumerique"
      | "gestionServicesTic"
      | "fournisseursNumeriques",
  >(
    secteur: Secteur,
  ) =>
  <TypeActivite extends TypeCond<Taille, Secteur>>(
    ...activites: TypeActivite[]
  ) =>
    A.enchaine((loc: LocalisationEtablissementPrincipal) =>
      fc.record({
        _categorieTaille: fc.constant(taille as unknown as `${Taille}`),
        secteurs: fc.constant(
          ens({
            _categorieTaille: taille as unknown as `${Taille}`,
            secteurActivite: secteur,
            activites: ens(...activites),
            ...loc,
          }),
        ),
      }),
    ) as (
      arb: fc.Arbitrary<LocalisationEtablissementPrincipal>,
    ) => fc.Arbitrary<ReponseInformationsSecteur<Taille>>;

export const fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourServiceDansPays =

    <Taille extends CategorieTaille>(taille: `${Taille}`) =>
    <Secteur extends "infrastructureNumerique">(secteur: Secteur) =>
    <TypeActivite extends ActiviteInfranumLocalServices>(
      ...activites: TypeActivite[]
    ) =>
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
