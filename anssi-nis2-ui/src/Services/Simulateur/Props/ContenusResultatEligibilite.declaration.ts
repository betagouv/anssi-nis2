export const ValeursLigneResultatSpecifique = [
  "etMaintenant",
  "enSavoirPlus",
  "bienDebuter",
] as const;

export type BlocResultatSpecifiques =
  (typeof ValeursLigneResultatSpecifique)[number];

export type PrecisionsResultatProps = {
  principal: string;
  annexe: string;
};

export type BlocsAffiches = Set<BlocResultatSpecifiques>;
