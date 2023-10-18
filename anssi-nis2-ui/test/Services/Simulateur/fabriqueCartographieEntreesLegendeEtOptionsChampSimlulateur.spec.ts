import { describe, it, expect } from "vitest";
import { fc } from "@fast-check/vitest";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../src/Services/Simulateur/Transformateurs/FabriqueConstructeurOptionActivite";
import {
  arbForm,
  arbTrancheSingleton,
  fabriqueArbContraintSurTrancheCA,
} from "../../Domaine/arbitraires/arbitrairesSimulateur";
import { IDonneesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteArbitraireActivites,
  ajouteMethodeAvec,
  DonneesSansActivite,
  fabriqueArbSecteurSousSecteurs,
  propageBase,
} from "../../utilitaires/manipulationArbitraires";
import { listeEnrSecteursAvecLeursSousSecteurs } from "../../../src/Domaine/Simulateur/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "../../Domaine/arbitraires/arbitraireChampFormulaire";
import { estActiviteAutre } from "../../../src/Domaine/Simulateur/Operations/FiltreActivites";

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
