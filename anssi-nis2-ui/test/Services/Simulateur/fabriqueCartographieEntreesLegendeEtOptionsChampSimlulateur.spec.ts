import { describe, it, expect } from "vitest";
import { fc } from "@fast-check/vitest";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../src/Services/Simulateur/Transformateurs/FabriqueConstructeurOptionActivite";
import { IDonneesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import {
  ajouteMethodeAvec,
  fabriqueArbEnrSecteurSousSecteurs,
} from "../../utilitaires/manipulationArbitraires";
import { listeEnrSecteursAvecLeursSousSecteurs } from "./exemples/ListesEnrSecteursSousSecteur";

const donneesArbitrairesFormNonOSEPrivesMoyenneGrandeAutresActivites: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  fabriqueArbEnrSecteurSousSecteurs(listeEnrSecteursAvecLeursSousSecteurs, {
    minLength: 1,
  }).chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

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
