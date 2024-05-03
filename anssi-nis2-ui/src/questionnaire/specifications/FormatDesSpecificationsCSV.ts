export enum ClesDuCSV {
  "Designation OSE",
  "Localisation",
  "Resultat: statut",
  "Resultat: type entite",
}

// Type créé à partir des clés du CSV.
// Les clés sont une enum pour pouvoir vérifier qu'elles sont toutes dans le header du CSV.
export type SpecificationTexte = Record<keyof typeof ClesDuCSV, string>;

export function valideColonnesDuCSV(colonnes: string[]) {
  // isNaN car `keys()` sur une enum renvoie un amalgame de clés et de valeurs.
  const attendues = Object.keys(ClesDuCSV).filter((k) => isNaN(Number(k)));

  const manquantes = attendues.filter((a) => !colonnes.includes(a));

  if (manquantes.length > 0)
    throw new Error(
      `Il manque des colonnes dans le CSV : ${manquantes.join(",")}`,
    );
}
