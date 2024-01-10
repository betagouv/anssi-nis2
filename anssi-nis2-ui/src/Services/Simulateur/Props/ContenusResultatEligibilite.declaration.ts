export type BlocResultatSpecifiques =
  | "etMaintenant"
  | "enSavoirPlus"
  | "bienDebuter";

export type PrecisionsResultatProps = {
  principal: string;
  annexe: string;
};

export type BlocsAffiches = Set<BlocResultatSpecifiques>;
