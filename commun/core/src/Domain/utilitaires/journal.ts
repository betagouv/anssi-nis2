import { OptionsJournal } from "./optionsJournal.declarations";

export const logAvecPrefix =
  (prefix: string) =>
  (...debugMessage: unknown[]) =>
    console.log(prefix, ...debugMessage);
export const logPipeAvecPrefix =
  (prefix: string, options: OptionsJournal = { logArgs: true }) =>
  <T>(...debugMessage: unknown[]) =>
  (arg: T): T => {
    const detailsArgs = options.logArgs ? [`\t--> `, arg] : [];
    logAvecPrefix(prefix)(...debugMessage, ...detailsArgs);

    return arg;
  };
