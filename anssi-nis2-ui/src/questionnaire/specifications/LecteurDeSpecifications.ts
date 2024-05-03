import fs from "node:fs";
import { parse } from "papaparse";
import { Specifications } from "./Specifications.ts";
import { FabriqueDeSpecifications } from "./FabriqueDeSpecifications.ts";
import {
  SpecificationTexte,
  valideColonnesDuCSV,
} from "./FormatDesSpecificationsCSV.ts";

export class LecteurDeSpecifications {
  private readonly fabrique = new FabriqueDeSpecifications();

  lis(fichier: string): Specifications[] {
    const texte = fs.readFileSync(fichier).toString("utf-8");

    const lignes = parse<SpecificationTexte>(texte, {
      header: true,
      skipEmptyLines: true,
    });

    valideColonnesDuCSV(lignes.meta.fields!);

    return lignes.data.map((ligne) => this.fabrique.transforme(ligne));
  }
}
