export type EtatPrecisionsResultat = {
  principal: string;
  annexe: string;
  estAfficheAnnexe: boolean;
};
export type ActionPrecisionsResultat = {
  type: keyof EtatPrecisionsResultat;
  value: string | boolean;
};
export type ContenuAffichagePlus = {
  affichePlus: string;
  libelleBouton: string;
};
