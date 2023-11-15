import Input from "@codegouvfr/react-dsfr/Input";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { AppContext } from "./AppContexte/AppContext.tsx";
import { FormEvent, useContext } from "react";
import { InformationsEmail } from "../Domaine/Contact/InformationsEmail.definitions.ts";

const ResterInformee = () => {
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
          <ButtonsGroup
            buttons={[
              {
                children: "S'inscrire",
                linkProps: {
                  href: "#",
                },
              },
            ]}
            inlineLayoutWhen="sm and up"
          />
        </div>
      </form>
    </div>
  );
};

export default ResterInformee;
