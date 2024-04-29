import { Fragment, useState } from "react";
import { DefaultComponent } from "../../Services/Props";
import chevron from "../../assets/forme-chevron-blanc.svg";

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
      <button
        className="fr-nis2-bom bom-ferme"
        onClick={() => changeEtat(Ouvert)}
        aria-label="Menu d'assitance"
      >
        Aide
        <img src={chevron} alt="" />
      </button>
    );

  return (
    <div className="fr-nis2-bom bom-ouvert" onClick={() => changeEtat(Ferme)}>
      <h4>
        Bienvenue sur <br /> <span className="plus-grand">MonEspaceNIS2</span>
      </h4>
      <div className="contenu">
        Vous souhaitez :
        <ul>
          <li>
            <a href={urlFAQ} target="_blank" rel="noreferrer">
              Nous contacter
            </a>
          </li>
          <li>
            <a href={urlFAQ} target="_blank" rel="noreferrer">
              Consulter la FAQ
            </a>
          </li>
        </ul>
      </div>
      <div className="fermeture-bom">
        <button onClick={() => changeEtat(Ferme)}>Fermer</button>
      </div>
    </div>
  );
};
