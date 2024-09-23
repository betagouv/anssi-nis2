export type ServeurMonEspaceNIS2 = {
  ecoute: () => void;
  arrete: () => void;
};

export enum ImplementationDuServeur {
  Nest,
  Express,
}
