import { AppContext } from "./AppContexte/AppContext.tsx";
import { FormEvent, useContext, useState } from "react";
import { InformationsEmail } from "../Domaine/Contact/InformationsEmail.definitions";
import { FormRestezInformes } from "./FormRestezInformes.tsx";

const RestezInformes = () => {
  const [emailEnregistre, setEmailEnregistre] = useState(false);
  const { enregistreInformationsEmail } = useContext(AppContext);
  const informationsEmail: InformationsEmail = {
    accepteInfolettreNis2: false,
    accepteInfolettreServicesDedies: false,
    email: "",
    nomOrganisation: "",
  };

  const envoiDonnees = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enregistreInformationsEmail(informationsEmail);
    setEmailEnregistre(true);
  };

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
          nouvelles à propos de NIS 2
        </p>
      )}
      {!emailEnregistre && <FormRestezInformes envoiDonnees={envoiDonnees} />}
    </div>
  );
};

export default RestezInformes;
