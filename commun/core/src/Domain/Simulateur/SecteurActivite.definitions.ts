import { UnionDe } from "../../../../utils/types/UnionDe";
import { ValeursSecteursActivites, ValeursSecteursComposites } from "./SecteurActivite.valeurs";

export type SecteurActivite = UnionDe<typeof ValeursSecteursActivites>;

export type SecteurComposite = UnionDe<typeof ValeursSecteursComposites>;

export type SecteurSimple = Exclude<SecteurActivite, SecteurComposite>;
