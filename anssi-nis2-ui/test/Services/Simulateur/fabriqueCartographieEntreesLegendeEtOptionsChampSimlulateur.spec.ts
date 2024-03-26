import { describe, it, expect } from "vitest";
import { fc } from "@fast-check/vitest";
import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { fabriqueArbEnrSecteurSousSecteurs } from "../../../../commun/core/test/utilitaires/manipulationArbitraires.fabriques";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../src/Services/fabriques/ConstructeurOptionActivite.fabrique";
import { ajouteArbitraireActivites } from "../../../../commun/core/test/utilitaires/manipulationArbitraires.DonneesFormulaireExtensibles";
import { listeEnrSecteursAvecLeursSousSecteurs } from "../../../../commun/core/test/Domaine/exemples/ListesEnrSecteursSousSecteur";

const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<
  DonneesSectorielles & Pick<DonneesFormulaireSimulateur, "activites">
> = fabriqueArbEnrSecteurSousSecteurs(listeEnrSecteursAvecLeursSousSecteurs, {
  minLength: 1,
}).chain(ajouteArbitraireActivites);

describe(fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur, () => {
  it("Renvoie des tuples correctes", () => {
    fc.assert(
      fc.property(
        donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites,
        (donnees) => {
          const propageActionSimulateur = () => {};
          const cartographieurEntreesLegendeEtOptionsChampSimlulateur =
            fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur(
              donnees,
              propageActionSimulateur,
            );
          expect(
            cartographieurEntreesLegendeEtOptionsChampSimlulateur,
          ).not.toBeUndefined();
        },
      ),
    );
  });
  it("Ne devrait pas retourner les activités pour les secteurs et sous secteurs 'autre'", () => {
    fc.assert(
      fc.property(
        donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites,
        (donnees) => {
          const propageActionSimulateur = () => {};
          const data =
            fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur(
              donnees,
              propageActionSimulateur,
            );
          expect(data).not.toBeUndefined();
        },
      ),
    );
  });
});
