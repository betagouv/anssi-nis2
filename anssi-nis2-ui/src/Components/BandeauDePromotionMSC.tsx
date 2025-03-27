import { Fragment } from "react";
import "@lab-anssi/ui-kit/dist/webcomponents";
import { bandeauMscPasEncoreVisible } from "./bandeauMscPasEncoreVisible.tsx";

export function BandeauDePromotionMSC() {
  if (bandeauMscPasEncoreVisible()) return <Fragment />;

  return (
    <lab-anssi-mes-services-cyber-bandeau></lab-anssi-mes-services-cyber-bandeau>
  );
}
