import {
  ContenuAffichagePlus,
  EtatPrecisionsResultat,
} from "./PrecisionsResultat.declarations.ts";

export const initialState: EtatPrecisionsResultat = {
  principal: "",
  annexe: "",
  estAfficheAnnexe: false,
};
export const statusAffichePlus: Record<`${boolean}`, ContenuAffichagePlus> = {
  false: {
    affichePlus: "fr-nis2-hidden",
    libelleBouton: "Plus d'informations",
    directionIcone: "down",
  },
  true: {
    affichePlus: "",
    libelleBouton: "Moins d'informations",
    directionIcone: "up",
  },
};
