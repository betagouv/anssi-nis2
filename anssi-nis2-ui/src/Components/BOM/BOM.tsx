import { DefaultComponent } from "../../Services/Props";
import { useState } from "react";

enum EtatBOM {
  Ouvert,
  Ferme,
}
const { Ouvert, Ferme } = EtatBOM;

export const BOM: DefaultComponent = () => {
  const [etat, changeEtat] = useState<EtatBOM>(Ferme);

  if (etat === Ferme)
    return (
      <div
        className="fr-nis2-bom bom-ferme"
        onClick={() => changeEtat(Ouvert)}
      ></div>
    );

  return (
    <div className="fr-nis2-bom bom-ouvert" onClick={() => changeEtat(Ferme)}>
      Accéder à la FAQ
    </div>
  );
};
