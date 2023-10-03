import { Logger } from "@nestjs/common";
import * as path from "path";

export const fabriqueCheminVersFrontStatique: () => Promise<string> = async (
  sousDossier = ["anssi-nis2-ui", "dist"],
) => {
  const journal = new Logger(fabriqueCheminVersFrontStatique.name);
  const partieDossierCourant = __dirname.split(path.sep);
  const positionRacine = partieDossierCourant.indexOf("anssi-nis2-api");
  const dossierCible = [
    ...partieDossierCourant.slice(0, positionRacine),
    ...sousDossier,
  ].join(path.sep);

  journal.log(`Site statique depuis : ${__dirname} --> ${dossierCible}`);
  return path.resolve(dossierCible);
};
