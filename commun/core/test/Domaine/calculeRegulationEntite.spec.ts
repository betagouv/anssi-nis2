import { describe, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { ValeursActivitesConcernesInfrastructureNumerique } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import {
  Regulation,
  ResultatRegulationEntite,
  ResultatRegulationPositif,
} from "../../src/Domain/Simulateur/Regulation.definitions";

import { calculeRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { V } from "./verificationAvecRaison";

const estRegule = (
  resultat: ResultatRegulationEntite,
): resultat is ResultatRegulationPositif =>
  resultat.decision === Regulation.Regule;

const causeContient =
  <TypeNom extends NomsChampsSimulateur>(
    champ: TypeNom,
    valeur: DonneesFormulaireSimulateur[TypeNom][number],
  ) =>
  (resultat: ResultatRegulationEntite) =>
    estRegule(resultat) && !!resultat.causes[champ]?.includes(valeur as never);

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
            V.estRegule(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.activitesConcernes,
            )?.car(
              (res) =>
                causeContient(
                  "secteurActivite",
                  "infrastructureNumerique",
                )(res) &&
                ValeursActivitesConcernesInfrastructureNumerique.some((a) =>
                  causeContient("activites", a),
                ),
            );
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
