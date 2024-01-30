export const chargeContenuMarkdown = <T>(
  nomFichier: string,
  fabriqueContenuDepuisMarkdown: (contenu: string) => T,
  contenuParDefaut: T,
) =>
  import(`../../References/Documents/${nomFichier}.md?url`).then((resultat) =>
    fetch(resultat.default)
      .then((res) => res.text())
      .then(fabriqueContenuDepuisMarkdown)
      .catch(() => contenuParDefaut),
  );
