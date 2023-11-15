import React, { useContext, useState } from "react";

import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { AppContext } from "./AppContexte/AppContext.tsx";
import { InformationsEmail } from "../Domaine/Contact/InformationsEmail.definitions.ts";

type FormulaireRestezInformesProps = DefaultProps & {
  setEmailEnregistre: React.Dispatch<boolean>;
};
export const FormRestezInformes: DefaultComponentExtensible<
  FormulaireRestezInformesProps
> = ({ setEmailEnregistre }: FormulaireRestezInformesProps) => {
  const { enregistreInformationsEmail } = useContext(AppContext);
  const [informationsEmail, setInformationsEmail] = useState<InformationsEmail>(
    {
      accepteInfolettreNis2: false,
      accepteInfolettreServicesDedies: false,
      email: "",
      nomOrganisation: "",
    },
  );

  const envoiDonnees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enregistreInformationsEmail(informationsEmail);
    setEmailEnregistre(true);
  };

  const construitPropagationChangement = (
    nomChamp: keyof InformationsEmail,
  ) => ({
    name: nomChamp,
    value: informationsEmail[nomChamp] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const nomChamp = e.target.name as keyof InformationsEmail;
      const nouvelleValeur =
        typeof informationsEmail[nomChamp] === "boolean"
          ? !informationsEmail[nomChamp]
          : e.target.value;
      return setInformationsEmail({
        ...informationsEmail,
        [nomChamp]: nouvelleValeur,
      });
    },
  });

  return (
    <form className="fr-mb-0" onSubmit={envoiDonnees}>
      <div className="fr-container fr-px-0">
        <div className="fr-grid-row">
          <div className="fr-col fr-mr-3w">
            <Input
              label="Nom de votre organisation"
              state="default"
              nativeInputProps={construitPropagationChangement(
                "nomOrganisation",
              )}
            />
          </div>
          <div className="fr-mb-10v fr-col">
            <Input
              label="Adresse électronique"
              state="default"
              nativeInputProps={construitPropagationChangement("email")}
            />
          </div>
        </div>
      </div>
      <div className="fr-fieldset__element">
        <Checkbox
          options={[
            {
              label:
                "J’accepte de recevoir des informations concernant la directive NIS2",
              nativeInputProps: construitPropagationChangement(
                "accepteInfolettreNis2",
              ),
            },
          ]}
        />
        <Checkbox
          options={[
            {
              label:
                "Je souhaite m’enregistrer auprès de l’ANSSI afin de bénéficier des futurs services dédiés aux organisations concernées",
              nativeInputProps: construitPropagationChangement(
                "accepteInfolettreServicesDedies",
              ),
            },
          ]}
        />
      </div>
      <div className="fr-fieldset__element">
        <Button type="submit">S&apos;inscrire</Button>
      </div>
    </form>
  );
};
