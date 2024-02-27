import { OptionsJournal } from "./optionsJournal.declarations";

export const journalise =
  (fonctionJournal: (...data: unknown[]) => void) =>
  (prefix: string) =>
  (...debugMessage: unknown[]) =>
    fonctionJournal(prefix, ...debugMessage);

export const journalisePipe =
  (fonctionJournal: (...data: unknown[]) => void) =>
  (prefix: string, options: OptionsJournal = { logArgs: true }) =>
  <T>(...debugMessage: unknown[]) =>
  (arg: T): T => {
    const detailsArgs = options.logArgs ? [`\t--> `, arg] : [];
    journalise(fonctionJournal)(prefix)(...debugMessage, ...detailsArgs);

    return arg;
  };

export const logAvecPrefix = journalise(console.log);

export const logPipeAvecPrefix = journalisePipe(console.log);
