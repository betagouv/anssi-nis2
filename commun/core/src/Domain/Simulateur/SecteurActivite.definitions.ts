import { ValeursSecteursActivites } from "./SecteurActivite.valeurs";

export type SecteurActivite = (typeof ValeursSecteursActivites)[number];

export type SecteurActiviteDecoupe = Extract<
  SecteurActivite,
  "energie" | "fabrication" | "transports"
>;

export type SecteurActiviteSimple = Omit<
  SecteurActivite,
  "energie" | "fabrication" | "transports"
>;
