import Input from "@codegouvfr/react-dsfr/Input";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { AppContext } from "./AppContexte/AppContext.tsx";
import { FormEvent, useContext, useState } from "react";
import { InformationsEmail } from "../Domaine/Contact/InformationsEmail.definitions";
import { Button } from "@mui/material";

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
      {!emailEnregistre && (
        <form className="fr-mb-0" onSubmit={envoiDonnees}>
          <div className="fr-container fr-px-0">
            <div className="fr-grid-row">
              <div className="fr-col fr-mr-3w">
                <Input label="Nom de votre organisation" state="default" />
              </div>
              <div className="fr-mb-10v fr-col">
                <Input label="Adresse électronique" state="default" />
              </div>
            </div>
          </div>
          <div className="fr-fieldset__element">
            <Checkbox
              options={[
                {
                  label:
                    "J’accepte de recevoir des informations concernant la directive NIS2",
                  nativeInputProps: {
                    name: "checkboxInfolettre",
                  },
                },
              ]}
            />
            <Checkbox
              options={[
                {
                  label:
                    "Je souhaite m’enregistrer auprès de l’ANSSI afin de bénéficier des futurs services dédiés aux organisations concernées",
                  nativeInputProps: {
                    name: "checkboxConsentementInfo",
                  },
                },
              ]}
            />
          </div>
          <div className="fr-fieldset__element">
            <Button type="submit">S&apos;inscrire</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RestezInformes;
