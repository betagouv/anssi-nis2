import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "./SecteurActivite.definitions";
import {
  ValeursSecteursActivites,
  ValeursSecteursAvecSousSecteurs,
} from "./SecteurActivite.valeurs";
import { fabriqueTuplesSecteurSousSecteur } from "./services/SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  estUnSecteurSansDesSousSecteurs,
} from "./services/SecteurActivite/SecteurActivite.predicats";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export const ValeursSecteursNecessitantLocalisationRepresentant = [
  "gestionServicesTic",
  "fournisseursNumeriques",
  "infrastructureNumerique",
] as const;

export const ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite = [
  "infrastructureNumerique",
] as const;
export const ValeursSecteursSansSousSecteur: SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);
export const listeTuplesSecteursSousSecteurs =
  ValeursSecteursAvecSousSecteurs.filter(estSecteurListe).reduce(
    (acc: [SecteursAvecSousSecteurs, SousSecteurActivite][], secteur) => [
      ...acc,
      ...fabriqueTuplesSecteurSousSecteur(secteur),
    ],
    [],
  );
export const estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite = <
  T extends SecteurActivite,
>(
  secteur: T,
) =>
  !ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite.includes(
    secteur as (typeof ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite)[number],
  );
export const estSecteurNecessitantLocalisationRepresentantPetiteEntite = (
  secteur: SecteurActivite,
) =>
  ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite.includes(
    secteur as (typeof ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite)[number],
  );
