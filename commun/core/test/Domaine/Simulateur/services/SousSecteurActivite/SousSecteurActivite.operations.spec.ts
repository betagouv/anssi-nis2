import { describe, expect, it } from "vitest";
import {
  secteurDe,
} from "../../../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.operations";

describe("Les opérations sur les sous-secteurs d'activités", () => {
  it("permettent de retrouver le secteur associé à un sous-secteur", () => {
    expect(secteurDe("hydrogene")).toBe("energie");
    expect(secteurDe("transportsRoutiers")).toBe("transports");
    expect(secteurDe("fabricationMachinesEquipements")).toBe("fabrication");
  });
});
