import { describe, it, expect } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../../src/questionnaire/reducerQuestionnaire";
import { RegleTaille } from "../../../../src/questionnaire/specifications/regles/RegleTaille";

describe("La règle de « Taille »", () => {
  it("considère comme « Petite » une entité de 1 à 49 salariés et CA < 10m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["petit"],
      trancheChiffreAffaire: ["petit"],
    };
    const spec = new RegleTaille("petit");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Moyenne » une entité de 1 à 49 salariés et CA de 10 à 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["petit"],
      trancheChiffreAffaire: ["moyen"],
    };
    const spec = new RegleTaille("moyen");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Grande » une entité de 1 à 49 salariés et CA > 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["petit"],
      trancheChiffreAffaire: ["grand"],
    };
    const spec = new RegleTaille("grand");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Moyenne » une entité de 50 à 249 salariés et CA < 10m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["moyen"],
      trancheChiffreAffaire: ["petit"],
    };
    const spec = new RegleTaille("moyen");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Moyenne » une entité de 50 à 249 salariés et CA de 10 à 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["moyen"],
      trancheChiffreAffaire: ["moyen"],
    };
    const spec = new RegleTaille("moyen");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Grande » une entité de 50 à 249 salariés et CA > 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["moyen"],
      trancheChiffreAffaire: ["grand"],
    };
    const spec = new RegleTaille("grand");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Grande » une entité > 250 salariés et CA < 10m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["grand"],
      trancheChiffreAffaire: ["petit"],
    };
    const spec = new RegleTaille("grand");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Grande » une entité > 250 salariés et CA de 10 à 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["grand"],
      trancheChiffreAffaire: ["moyen"],
    };
    const spec = new RegleTaille("grand");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });

  it("considère comme « Grande » une entité > 250 salariés et CA > 50m€", () => {
    const entite: EtatQuestionnaire = {
      ...etatParDefaut,
      trancheNombreEmployes: ["grand"],
      trancheChiffreAffaire: ["grand"],
    };
    const spec = new RegleTaille("grand");

    const resultat = spec.evalue(entite);

    expect(resultat).toBe(true);
  });
});
