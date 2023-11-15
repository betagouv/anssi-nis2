import { FormEvent } from "react";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";

type FormulaireRestezInformesProps = DefaultProps & {
  envoiDonnees: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};
export const FormRestezInformes: DefaultComponentExtensible<
  FormulaireRestezInformesProps
> = ({ envoiDonnees }: FormulaireRestezInformesProps) => (
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
);
