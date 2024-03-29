import { PrecisionsResultatProps } from "../../../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export type EtatPrecisionsResultat = PrecisionsResultatProps & {
  estAfficheAnnexe: boolean;
};

export type ActionPrecisionsResultat = {
  type: keyof EtatPrecisionsResultat;
  value: string | boolean;
};

export type ContenuAffichagePlus = {
  affichePlus: string;
  libelleBouton: string;
  directionIcone: "up" | "down";
};
