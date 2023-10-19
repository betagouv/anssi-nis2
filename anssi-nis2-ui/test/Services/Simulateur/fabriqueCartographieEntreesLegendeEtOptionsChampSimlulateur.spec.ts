import { describe, it, expect } from "vitest";
import { fc } from "@fast-check/vitest";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../src/Services/Simulateur/Transformateurs/FabriqueConstructeurOptionActivite";
import { IDonneesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteMethodeAvec,
  fabriqueArbSecteurSousSecteurs,
} from "../../utilitaires/manipulationArbitraires";
import { listeEnrSecteursAvecLeursSousSecteurs } from "../../../src/Domaine/Simulateur/ListesEnrSecteursSousSecteur";

const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbSecteurSousSecteurs(listeEnrSecteursAvecLeursSousSecteurs, {
    minLength: 1,
  }).chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

describe(fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur, () => {
  it("Renvoie des tuples correctes", () => {
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
