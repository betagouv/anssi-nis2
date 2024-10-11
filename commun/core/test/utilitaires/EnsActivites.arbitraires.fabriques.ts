import { fc } from "@fast-check/vitest";
import { Activite } from "../../src/Domain/Simulateur/Activite.definitions";
import { SecteurActivite } from "../../src/Domain/Simulateur/SecteurActivite.definitions";
import { getActivitesPour } from "../../src/Domain/Simulateur/Activite.operations";
import { estActiviteListee } from "../../src/Domain/Simulateur/Activite.predicats";
import {
  RepInfoSecteur,
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
    } as { [k in keyof Sortie]: fc.Arbitrary<Sortie[k]> });


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
