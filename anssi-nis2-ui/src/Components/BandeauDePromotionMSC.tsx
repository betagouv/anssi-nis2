import { Fragment } from "react";
import { bandeauMscPasEncoreVisible } from "./bandeauMscPasEncoreVisible.tsx";

export function BandeauDePromotionMSC() {
  if (bandeauMscPasEncoreVisible()) return <Fragment />;

  return (
    <lab-anssi-mes-services-cyber-bandeau></lab-anssi-mes-services-cyber-bandeau>
  );
}
