import { fc } from "@fast-check/vitest";
import { ValeursPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { DonneesSectorielles } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  extraitCouplesAvecSecteurUniques,
  extraitSousSecteursDesCouples,
} from "../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.operations";
import { EnrSecteurSousSecteur } from "../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  contrainteTranchesSansDoublonSurValeur,
  propageBase,
} from "./manipulationArbitraires.DonneesFormulaireExtensibles";
import {
  AvecParams,
  DonneesAjout,
  DonneesFormulaireExtensibles,
  DonneesFormulairesAvanttrancheChiffreAffaire,
} from "./manipulationArbitraires.declarations";

const arbSecteursEtSousSecteursVides = fc.record({
  secteurActivite: fc.constant([]),
  sousSecteurActivite: fc.constant([]),
});
export const fabriqueEtendAvec: <
  DonneesPartielles extends DonneesFormulaireExtensibles,
  TypeAjout extends DonneesAjout = DonneesAjout,
  TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
    TypeAjout,
>(
  arbitraire: fc.Arbitrary<DonneesPartielles>,
) => (ajouts: AvecParams<TypeAjout>) => fc.Arbitrary<TypeRetour> =
  (arbitraire) =>
  <
    DonneesPartielles extends DonneesFormulaireExtensibles,
    TypeAjout extends DonneesAjout = DonneesAjout,
    TypeRetour extends DonneesPartielles & TypeAjout = DonneesPartielles &
      TypeAjout,
  >(
    ajouts: AvecParams<TypeAjout>,
  ) =>
    arbitraire.chain((base) =>
      fc.record({
        ...propageBase(base),
        ...ajouts,
      } as unknown as { [K in keyof TypeRetour]: fc.Arbitrary<TypeRetour[K]> }),
    ) as fc.Arbitrary<TypeRetour>;

export const fabriqueArbSingleton = <T>(valeursPossibles: Readonly<T[]>) =>
  fc.subarray<T>([...valeursPossibles], {
    minLength: 1,
    maxLength: 1,
  });
const fabriqueArbSecteurSousSecteursTailleMini = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  minLength: number,
) =>
  fc
    .subarray(listeSecteursSousSecteurs, { minLength: minLength })
    .chain((couplesSecteurSousSecteur) =>
      fc.record<DonneesSectorielles>({
        secteurActivite: fc.constant(
          extraitCouplesAvecSecteurUniques(couplesSecteurSousSecteur),
        ),
        sousSecteurActivite: fc.constant(
          extraitSousSecteursDesCouples(couplesSecteurSousSecteur),
        ),
      }),
    );
export const fabriqueArbEnrSecteurSousSecteurs = (
  listeSecteursSousSecteurs: EnrSecteurSousSecteur[],
  { minLength } = { minLength: 0 },
): fc.Arbitrary<DonneesSectorielles> => {
  if (listeSecteursSousSecteurs.length === 0) {
    return arbSecteursEtSousSecteursVides;
  }
  return fabriqueArbSecteurSousSecteursTailleMini(
    listeSecteursSousSecteurs,
    minLength || 0,
  );
};
export const fabriqueArbContraintSurtrancheChiffreAffaire = <
  T extends DonneesFormulairesAvanttrancheChiffreAffaire,
>(
  base: T,
) =>
  fc.record({
    ...propageBase(base),
    trancheNombreEmployes: contrainteTranchesSansDoublonSurValeur(
      base,
      "petit",
    ),
  });
export const fabriqueArbTrancheSingleton = () =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand);
