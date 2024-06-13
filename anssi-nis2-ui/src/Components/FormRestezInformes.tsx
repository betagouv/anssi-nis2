import { useContext } from "react";
import { InformationsEmail } from "../../../commun/core/src/Domain/Contact/InformationsEmail.definitions.ts";

import {
  DefaultComponentExtensible,
  FormulaireRestezInformesProps,
} from "../Services/Props";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Input from "@codegouvfr/react-dsfr/Input";
import { AppContext } from "../Services/AppContexte/AppContext.definition.ts";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { libellesContact } from "../References/LibellesContact.ts";

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
      required: libellesContact.erreurAdresseElectroniqueRequise,
      pattern: {
        value: regexpEmail,
        message: libellesContact.erreurAdresseElectroniqueBonFormat,
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
    <form
      className="fr-nis2-formulaire-restez-informes"
      onSubmit={handleSubmit(envoiDonnees)}
    >
      <div className="fr-container fr-px-0">
        {mode === "complet" && (
          <Input
            label={libellesContact.nomOrganisation}
            state="default"
            nativeInputProps={construitPropagationChangement("nomOrganisation")}
          />
        )}
        <div>
          <Input
            label={libellesContact.adresseElectronique}
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
      <div className="fr-fieldset__element">
        <Checkbox
          options={[
            {
              label: libellesContact.optinAccepterNewsletter,
              nativeInputProps: construitPropagationChangement(
                "accepteInfolettreNis2",
              ),
            },
          ]}
        />
        <div>
          La politique RGPD de MonEspaceNIS2 est disponible{" "}
          <a href="/politique-confidentialite">ici</a>.
        </div>
      </div>
      <div className="fr-fieldset__element">
        <Button type="submit">S&apos;inscrire</Button>
      </div>
    </form>
  );
};
