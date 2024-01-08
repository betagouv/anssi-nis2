export type ActionSurEtat<TEtat> = {
  type: keyof TEtat;
  value: string | boolean;
};

export type RemplitContenuMarkdownOperation = <
  TEtat,
  TAction extends ActionSurEtat<TEtat>,
>(
  dispatch: React.Dispatch<TAction>,
) => (
  typeChamp: keyof TEtat,
) => (locationMarkdown: string) => Promise<string | void>;
