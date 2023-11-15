import { useState } from "react";
import { FormRestezInformes } from "./FormRestezInformes.tsx";

const RestezInformes = () => {
  const [emailEnregistre, setEmailEnregistre] = useState(false);

  return (
    <div className="fr-container fr-nis2-restez-informes">
      <h2 className="fr-text-action-high--blue-france fr-h1">
        Restez informés
      </h2>
      <p className="fr-text">
        Nous déploierons dans les mois à venir un panel d’outils pour faciliter
        l’accompagnement des organisations régulées, à commencer par évolutions
        du contexte réglementaire et ce que devra faire votre entité pour se
        protéger des cyber-menaces.
      </p>
      {emailEnregistre && (
        <p>
          Nous avons pris en compte votre demande, vous recevrez bientôt des
          nouvelles à propos de NIS&nbsp;2
        </p>
      )}
      {!emailEnregistre && (
        <FormRestezInformes setEmailEnregistre={setEmailEnregistre} />
      )}
    </div>
  );
};

export default RestezInformes;
