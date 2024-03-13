import { SecteurActivite } from "./SecteurActivite.definitions";

export const transformeSecteurSimple_SecteurPeutEtreComposite = <
  T extends SecteurActivite,
>(
  secteur: T,
): [T, "PasDeSousSecteurActivite"] => [secteur, "PasDeSousSecteurActivite"];