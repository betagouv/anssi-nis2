import {
  ActionSurEtat,
  RemplitContenuMarkdownOperation,
} from "./RemplitContenuMarkdown.declarations.ts";

export const fabriqueAction = <TEtat, TAction extends ActionSurEtat<TEtat>>(
  typeChamp: keyof TEtat,
  valeur: string,
) => ({ type: typeChamp, value: valeur } as TAction);

export const remplitContenuMarkdown: RemplitContenuMarkdownOperation =
  <TEtat, TAction extends ActionSurEtat<TEtat>>(
    dispatch: React.Dispatch<TAction>,
  ) =>
  (typeChamp: keyof TEtat) =>
  (locationMarkdown: string) =>
    fetch(locationMarkdown)
      .then((reponse) => reponse.text())
      .then((t) => dispatch(fabriqueAction(typeChamp, t)));
