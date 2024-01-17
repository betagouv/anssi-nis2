import { describe, it, expect } from "vitest";
import {
  extraitFrontMatter,
  extraitFrontMatterBrute,
} from "../../../src/Services/Markdown/TransformeMarkdown.operations";

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
