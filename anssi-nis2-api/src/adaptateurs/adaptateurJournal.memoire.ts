import {
  AdaptateurJournal,
  EvenementJournal,
  TypeEvenement,
} from "./adaptateurJournal";

export class AdaptateurJournalMemoire implements AdaptateurJournal {
  private readonly reponses: EvenementJournal<TypeEvenement>[] = [];

  async consigneEvenement<T extends TypeEvenement>(
    evenement: EvenementJournal<T>,
  ) {
    this.reponses.push(evenement);
  }
}
