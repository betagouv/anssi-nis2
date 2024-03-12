import { DefaultComponent } from "../../Services/Props";
import { Fragment, useState } from "react";

enum EtatBOM {
  Ouvert,
  Ferme,
}
const { Ouvert, Ferme } = EtatBOM;

export const BOM: DefaultComponent = () => {
  const [etat, changeEtat] = useState<EtatBOM>(Ferme);

  const urlFAQ = import.meta.env.VITE_CRISP_URL_FAQ;
  if (!urlFAQ) return <Fragment />;

  if (etat === Ferme)
    return (
      <div
        className="fr-nis2-bom bom-ferme"
        onClick={() => changeEtat(Ouvert)}
      ></div>
    );

  return (
    <div className="fr-nis2-bom bom-ouvert" onClick={() => changeEtat(Ferme)}>
      <a href={urlFAQ} target="_blank" rel="noreferrer">
        Accéder à la FAQ
      </a>
    </div>
  );
};
