import { Fragment } from "react";
import "@lab-anssi/ui-kit/dist/webcomponents";

const estDansLeFutur = (dateString: string) =>
  new Date(dateString) > new Date();

export function BandeauDePromotionMSC() {
  const pasEncoreVisible =
    !import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT ||
    estDansLeFutur(import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT);

  if (pasEncoreVisible) return <Fragment />;

  return (
    <lab-anssi-mes-services-cyber-bandeau></lab-anssi-mes-services-cyber-bandeau>
  );
}
