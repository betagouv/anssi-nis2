export const remplitContenuMarkdown =
  <TEtat, TAction extends { type: keyof TEtat; value: string | boolean }>(
    dispatch: React.Dispatch<TAction>,
  ) =>
  (typeChamp: keyof TEtat) =>
  (locationMarkdown: string) =>
    fetch(locationMarkdown)
      .then((reponse) => reponse.text())
      .then((t) => dispatch({ type: typeChamp, value: t } as TAction));
