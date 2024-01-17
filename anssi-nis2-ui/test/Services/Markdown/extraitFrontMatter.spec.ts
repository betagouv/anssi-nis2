import { describe, it, expect } from "vitest";
import {
  extraitFrontMatter,
  extraitFrontMatterBrute,
  extraitFrontMatterSectionsBrute,
} from "../../../src/Services/Markdown/TransformeMarkdown.operations";

describe(extraitFrontMatterSectionsBrute, () => {
  it("retourne le contenu simple", () => {
    const texteMarkdown = `
---
champ: contenu
---
# titre
    `;
    expect(extraitFrontMatterSectionsBrute(texteMarkdown)).toEqual([
      ["champ: contenu", "titre"],
    ]);
  });
  it("retourne le contenu simple", () => {
    const texteMarkdown = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore
        
        ---
        champA1: contenu A1
        champA2: contenu A2
        ---
        ## Titre de section A
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        
        ---
        champB1: contenu B1
        champB2: contenu B2
        ---
        ## Titre de section B
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        `;
    expect(extraitFrontMatterSectionsBrute(texteMarkdown)).toEqual([
      [
        "champA1: contenu A1\n        champA2: contenu A2",
        "Titre de section A",
      ],
      [
        "champB1: contenu B1\n        champB2: contenu B2",
        "Titre de section B",
      ],
    ]);
  });
});

describe(extraitFrontMatterBrute, () => {
  it("retourne le contenu simple", () => {
    const texteMarkdown = `
---
champ: contenu
---
    `;
    expect(extraitFrontMatterBrute(texteMarkdown)).toEqual("champ: contenu");
  });
  it("retourne le contenu simple, insensible à l'indentation", () => {
    const texteMarkdown = `
    ---
    champ: contenu
    ---
    `;
    expect(extraitFrontMatterBrute(texteMarkdown)).toEqual("champ: contenu");
  });
});

describe(extraitFrontMatter, () => {
  describe("seul dans le document", () => {
    it("n'extrait rien pour un Front Matter vide", () => {
      expect(extraitFrontMatter("")).toStrictEqual({});
    });
    it("extrait pour un champ simple", () => {
      const texteMarkdown = `
        ---
        champ: contenu
        ---
        `;
      expect(extraitFrontMatter(texteMarkdown)).toStrictEqual({
        champ: "contenu",
      });
    });
    it("extrait pour un champ simple", () => {
      const texteMarkdown = `
        ---
        champ: contenu
        champ2: contenu 2
        ---
        `;
      expect(extraitFrontMatter(texteMarkdown)).toStrictEqual({
        champ: "contenu",
        champ2: "contenu 2",
      });
    });
  });
  describe("Au milieu d'un document, inclue le titre qui suit", () => {
    it("front matter d'un titre", () => {
      const texteMarkdown = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore
        ---
        champ: contenu
        champ2: contenu 2
        ---
        ## Titre de section
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        
        `;
      expect(extraitFrontMatter(texteMarkdown)).toStrictEqual({
        sections: [
          {
            titre: "Titre de section",
            champ: "contenu",
            champ2: "contenu 2",
          },
        ],
      });
    });
    it("front matter de 2 titres", () => {
      const texteMarkdown = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore
        ---
        champA1: contenu A1
        champA2: contenu A2
        ---
        ## Titre de section A
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        
        ---
        champB1: contenu B1
        champB2: contenu B2
        ---
        ## Titre de section B
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        `;
      expect(extraitFrontMatter(texteMarkdown)).toStrictEqual({
        sections: [
          {
            titre: "Titre de section A",
            champA1: "contenu A1",
            champA2: "contenu A2",
          },
          {
            titre: "Titre de section B",
            champB1: "contenu B1",
            champB2: "contenu B2",
          },
        ],
      });
    });
  });
});
