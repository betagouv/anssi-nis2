import { OptionsJournal } from "./optionsJournal.declarations";

export const journalise =
  (fonctionJournal: (...data: unknown[]) => void) =>
  (prefix: string) =>
  (...debugMessage: unknown[]) =>
    fonctionJournal(prefix, ...debugMessage);

export const journalisePipe = (
  fonctionJournal: (...data: unknown[]) => void,
) => {
  const journal = journalise(fonctionJournal);
  return (prefix: string, options: OptionsJournal = { logArgs: true }) => {
    const journalPrefixe = journal(prefix);
    return <T>(...debugMessage: unknown[]) =>
      (arg: T): T => {
        const detailsArgs = options.logArgs ? [`\t--> `, arg] : [];
        journalPrefixe(...debugMessage, ...detailsArgs);

        return arg;
      };
  };
};

export const logAvecPrefix = journalise(console.log);

export const logPipeAvecPrefix = journalisePipe(console.log);
