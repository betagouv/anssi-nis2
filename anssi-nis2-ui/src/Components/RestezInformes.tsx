import { useState } from "react";
import { FormRestezInformes } from "./FormRestezInformes.tsx";
import {
  DefaultComponentExtensible,
  RestezInformesProps,
} from "../Services/Props";

const RestezInformes: DefaultComponentExtensible<RestezInformesProps> = ({
  mode = "simple",
}: RestezInformesProps) => {
  const [emailEnregistre, setEmailEnregistre] = useState(false);

  return (
    <div className="fr-container fr-nis2-page-restez-informe">
      <h2 className="fr-text-action-high--blue-france fr-h1">
        Restez informés
      </h2>
      <p className="fr-text">
        Nous déploierons dans les mois à venir un panel d&apos;outils pour
        faciliter l&apos;accompagnement des organisations régulées, à commencer
        par les évolutions du contexte réglementaire et ce que devra faire votre
        entité pour se protéger des cyber-menaces.
      </p>
      {emailEnregistre && (
        <p>
          Nous avons pris en compte votre demande. Vous recevrez bientôt des
          nouvelles à propos de NIS&nbsp;2.
        </p>
      )}
      {!emailEnregistre && (
        <FormRestezInformes
          setEmailEnregistre={setEmailEnregistre}
          mode={mode}
        />
      )}
    </div>
  );
};

export default RestezInformes;
