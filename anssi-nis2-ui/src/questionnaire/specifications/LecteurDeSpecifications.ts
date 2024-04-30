import {
  FabriqueDeSpecifications,
  Specifications,
  SpecificationTexte,
} from "./FabriqueDeSpecifications.ts";
import fs from "node:fs";
import { parse } from "papaparse";

export class LecteurDeSpecifications {
  private readonly fabrique = new FabriqueDeSpecifications();

  lis(fichier: string): Specifications {
    const texte = fs.readFileSync(fichier).toString("utf-8");

    const records = parse<SpecificationTexte>(texte, {
      header: true,
      skipEmptyLines: true,
    });

    return records.data.map((r) => this.fabrique.transforme(r));
  }
}
