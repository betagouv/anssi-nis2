import { useContext } from "react";

import {
  DefaultComponentExtensible,
  FormulaireRestezInformesProps,
} from "../Services/Props";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Input from "@codegouvfr/react-dsfr/Input";
import { AppContext } from "./AppContexte/AppContext.tsx";
import { InformationsEmail } from "../../../anssi-nis2-domain/src/Contact/InformationsEmail.definitions.ts";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";

export const FormRestezInformes: DefaultComponentExtensible<
  FormulaireRestezInformesProps
> = ({ setEmailEnregistre, mode }: FormulaireRestezInformesProps) => {
  const { enregistreInformationsEmail } = useContext(AppContext);

  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationParChamp: Record<keyof InformationsEmail, RegisterOptions> = {
    accepteInfolettreNis2: {},
    accepteInfolettreServicesDedies: {},
    nomOrganisation: {},
    email: {
      required: "L'adresse électronique doit être renseignée",
      pattern: {
        value: regexpEmail,
        message: "L'adresse électronique doit être valide",
      },
    },
  };

  const envoiDonnees: SubmitHandler<InformationsEmail> = async (donnees) => {
    enregistreInformationsEmail(donnees);
    setEmailEnregistre(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationsEmail>();
  const construitPropagationChangement = (nomChamp: keyof InformationsEmail) =>
    register(nomChamp, validationParChamp[nomChamp]);

  return (
    <form className="fr-mb-0" onSubmit={handleSubmit(envoiDonnees)}>
      <div className="fr-container fr-px-0">
        <div className="fr-grid-row">
          {mode === "complet" && (
            <div className="fr-col fr-mr-3w">
              <Input
                label="Nom de votre organisation"
                state="default"
                nativeInputProps={construitPropagationChangement(
                  "nomOrganisation",
                )}
              />
            </div>
          )}
          <div className="fr-mb-10v fr-col">
            <Input
              label="Adresse électronique"
              state="default"
              nativeInputProps={construitPropagationChangement("email")}
            />
            {errors.email && (
              <Alert
                severity="warning"
                small
                description={errors.email.message ?? ""}
                closable={false}
              />
            )}
          </div>
        </div>
      </div>
      <div className="fr-fieldset__element">
        <Checkbox
          options={[
            {
              label: (
                <>
                  J’accepte de recevoir des informations concernant la directive
                  NIS&nbsp;2
                </>
              ),
              nativeInputProps: construitPropagationChangement(
                "accepteInfolettreNis2",
              ),
            },
          ]}
        />
        {mode === "complet" && (
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
        )}
      </div>
      <div className="fr-fieldset__element">
        <Button type="submit">S&apos;inscrire</Button>
      </div>
    </form>
  );
};
