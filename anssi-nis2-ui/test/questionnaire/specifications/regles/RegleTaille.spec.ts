import { describe, it, expect } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../../src/questionnaire/reducerQuestionnaire";
import { RegleTaille } from "../../../../src/questionnaire/specifications/regles/RegleTaille";
import { UnionPetitMoyenGrand } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions";

describe("La règle de « Taille »", () => {
  const tailles: Record<string, UnionPetitMoyenGrand> = {
    Petite: "petit",
    Moyenne: "moyen",
    Grande: "grand",
  };
  const nbSalaries: Record<string, UnionPetitMoyenGrand> = {
    "< 50": "petit",
    ">= 50 et < 250": "moyen",
    ">= 250": "grand",
  };
  const tranchesCa: Record<string, UnionPetitMoyenGrand> = {
    "< 10M€": "petit",
    ">= 10M€ et < 50M€": "moyen",
    ">= 50M€": "grand",
  };
  const tranchesBilan: Record<string, UnionPetitMoyenGrand> = {
    "< 10M€": "petit",
    ">= 10M€ et < 43M€": "moyen",
    ">= 43M€": "grand",
  };

  describe("lorsque seuls « nombre de salariés » et « chiffre d'affaires annuel » importent", () => {
    const casDeTest: {
      tailleAttendue: string;
      salaries: string;
      ca: string;
    }[] = [
      { tailleAttendue: "Petite", salaries: "< 50", ca: "< 10M€" },
      { tailleAttendue: "Moyenne", salaries: ">= 50 et < 250", ca: "< 10M€" },
      {
        tailleAttendue: "Moyenne",
        salaries: ">= 50 et < 250",
        ca: ">= 10M€ et < 50M€",
      },
      { tailleAttendue: "Grande", salaries: ">= 250", ca: "< 10M€" },
      { tailleAttendue: "Grande", salaries: ">= 250", ca: ">= 10M€ et < 50M€" },
      { tailleAttendue: "Grande", salaries: ">= 250", ca: ">= 50M€" },
    ];

    it.each(casDeTest)(
      "Nombre de salariés : $salaries . Chiffre d'affaires : $ca . Taille : $tailleAttendue ",
      ({ tailleAttendue, salaries, ca }) => {
        const entite: EtatQuestionnaire = {
          ...etatParDefaut,
          trancheNombreEmployes: [nbSalaries[salaries]],
          trancheChiffreAffaire: [tranchesCa[ca]],
        };

        const spec = new RegleTaille(tailles[tailleAttendue]);

        const resultat = spec.evalue(entite);

        expect(resultat).toBe(true);
      },
    );
  });

  describe("lorsque tous les critères importent", () => {
    const casDeTest: {
      tailleAttendue: string;
      salaries: string;
      ca: string;
      bilanFinancier: string;
    }[] = [
      {
        tailleAttendue: "Petite",
        salaries: "< 50",
        ca: ">= 10M€ et < 50M€",
        bilanFinancier: "< 10M€",
      },
      {
        tailleAttendue: "Moyenne",
        salaries: "< 50",
        ca: ">= 10M€ et < 50M€",
        bilanFinancier: ">= 10M€ et < 43M€",
      },
      {
        tailleAttendue: "Moyenne",
        salaries: "< 50",
        ca: ">= 10M€ et < 50M€",
        bilanFinancier: ">= 43M€",
      },
      {
        tailleAttendue: "Petite",
        salaries: "< 50",
        ca: ">= 50M€",
        bilanFinancier: "< 10M€",
      },
      {
        tailleAttendue: "Moyenne",
        salaries: "< 50",
        ca: ">= 50M€",
        bilanFinancier: ">= 10M€ et < 43M€",
      },
      {
        tailleAttendue: "Grande",
        salaries: "< 50",
        ca: ">= 50M€",
        bilanFinancier: ">= 43M€",
      },
      {
        tailleAttendue: "Moyenne",
        salaries: ">= 50 et < 250",
        ca: ">= 50M€",
        bilanFinancier: "< 10M€",
      },
      {
        tailleAttendue: "Moyenne",
        salaries: ">= 50 et < 250",
        ca: ">= 50M€",
        bilanFinancier: ">= 10M€ et < 43M€",
      },
      {
        tailleAttendue: "Grande",
        salaries: ">= 50 et < 250",
        ca: ">= 50M€",
        bilanFinancier: ">= 43M€",
      },
    ];

    it.each(casDeTest)(
      "Nombre de salariés : $salaries . Chiffre d'affaires : $ca . Bilan: $bilanFinancier . Taille : $tailleAttendue ",
      ({ tailleAttendue, salaries, ca, bilanFinancier }) => {
        const entite: EtatQuestionnaire = {
          ...etatParDefaut,
          trancheNombreEmployes: [nbSalaries[salaries]],
          trancheChiffreAffaire: [tranchesCa[ca]],
          trancheBilanFinancier: [tranchesBilan[bilanFinancier]],
        };

        const spec = new RegleTaille(tailles[tailleAttendue]);

        const resultat = spec.evalue(entite);

        expect(resultat).toBe(true);
      },
    );
  });
});
