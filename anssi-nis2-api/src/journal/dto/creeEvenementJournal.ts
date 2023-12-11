import { Evenements } from "../entites/evenements.entite-journal";

export type CreeEvenementsJournalDto = Pick<Evenements, "donnees" | "type">;
