import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { activitesParSecteurEtSousSecteur } from "../../../src/Domain/Simulateur/services/Activite/Activite.operations";
import { estActiviteListee } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  eqInformationsSecteur,
  InformationSecteurPossible,
  InformationSecteurSimple,
  InformationsSecteurPetit,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  SousSecteurActivite,
  SousSecteurDe,
} from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../../src/Domain/Simulateur/ValeurCleSectorielle.definitions";

const getValeurCleSectorielle = <T>(
  secteur: T,
  sousSecteur?: string,
): ValeurCleSectorielle =>
  (sousSecteur ? sousSecteur : secteur) as ValeurCleSectorielle;
const getActivitesPour = <T extends SecteurActivite>(
  secteur: T,
  sousSecteur?: SousSecteurActivite,
) => [
  ...activitesParSecteurEtSousSecteur[
    getValeurCleSectorielle(secteur, sousSecteur)
  ],
];
const fabriqueArbEnsembleActivitesPourSecteur = <T extends SecteurActivite>(
  secteur: T,
  sousSecteur?: SousSecteurActivite,
) =>
  fc
    .subarray(
      getActivitesPour(secteur, sousSecteur).filter(estActiviteListee),
      {
        minLength: 1,
      },
    )
    .chain((a) => fc.constant(ens(...a)));
export const fabriqueArbitraireEnsembleActivitesPourSecteur = (
  secteur: SecteurActivite,
): fc.Arbitrary<InformationSecteurSimple> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur),
  });
export const fabriqueArbitraireEnsembleActivitesPourSecteurComposite = <
  T extends SecteursAvecSousSecteurs,
  U extends SousSecteurDe<T>,
>([secteur, sousSecteur]: [
  T,
  U,
]): fc.Arbitrary<InformationsSecteursCompositeListe> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    sousSecteurActivite: fc.constant(sousSecteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur, sousSecteur),
  }) as fc.Arbitrary<InformationsSecteursCompositeListe>;
export const fabriqueArbitraireCapsuleSecteur = (
  arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
): fc.Arbitrary<InformationsSecteurPetit> =>
  arb.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArbitrairesEnsembleInformationsSecteurs = <
  T extends InformationSecteurPossible,
>(
  arb: fc.Arbitrary<T>,
) =>
  fc
    .uniqueArray(arb, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    })
    .chain((a) => fc.constant(ens(...a)));
