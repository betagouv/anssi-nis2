import { describe, it } from "vitest";
import { prop } from "../../../utils/services/objects.operations";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import {
  PredicatResultatRegulationEntite,
  Regulation,
  ResultatRegulationEntite,
  ResultatRegulationPositif,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import { auMoinsUneActiviteInfraNumConcernee } from "../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { et } from "../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import { predicatDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";

import { calculeRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { V } from "./verificationAvecRaison";
import { flow } from "fp-ts/lib/function";

const estRegule = (
  resultat: ResultatRegulationEntite,
): resultat is ResultatRegulationPositif =>
  resultat.decision === Regulation.Regule;

describe(calculeRegulationEntite, () => {
  describe("Régulé", () => {
    describe("Entité OSE pour NIS1", () => {
      it("petite entité", () => {
        V.estRegule(arbForm.designeOSE.petit)?.car({
          designeOperateurServicesEssentiels: ["oui"],
        });
      });
      it("moyenne/grande entité", () => {
        V.estRegule(arbForm.designeOSE.moyenGrand)?.car({
          designeOperateurServicesEssentiels: ["oui"],
        });
      });
    });
    describe("Entite non OSE pour NIS 1", () => {
      describe("Privée", () => {
        describe("Secteur Infrasctructure Numérique", () => {
          it("petite entité, activites concernées", () => {
            const validationInfranum = flow(
              prop("causes"),
              et(
                predicatDonneesFormulaire
                  .champs("secteurActivite")
                  .contient("infrastructureNumerique"),
                predicatDonneesFormulaire
                  .champs("activites")
                  .verifie(auMoinsUneActiviteInfraNumConcernee),
              ),
            ) as PredicatResultatRegulationEntite;
            V.estRegule(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.activitesConcernes,
            )?.car(validationInfranum);
          });
        });
      });
    });
  });
  describe("NonRegulé", () => {
    describe("Privée", () => {
      it("uniquement activités autres", () => {
        V.estNonRegule(arbForm.nonDesigneOSE.privee.activitesAutres)?.car({});
      });
    });
  });
  describe("Incertain", () => {
    // it("manque données designeOperateurServicesEssentiels", () => {
    //   V.estIncertain(
    //     arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels,
    //   );
    // });
  });
});
