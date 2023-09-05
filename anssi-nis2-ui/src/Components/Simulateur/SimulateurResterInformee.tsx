import Input from "@codegouvfr/react-dsfr/Input";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

const SimulateurResterInformee = () => (
  <div>
    <h2 className="fr-text-action-high--blue-france fr-h1">Restez informé·e</h2>
    <p className="fr-text">
      Nous déploierons dans les mois à venir un panel d’outils pour faciliter
      l’accompagnement des organisations régulées, à commencer par des
      informations sur les bonnes pratiques et évolutions de la directive.
    </p>

    <form className="fr-mb-0" id="login-1797">
      <fieldset
        className="fr-mb-0 fr-fieldset"
        id="login-1797-fieldset"
        aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages"
      >
        <div className="fr-fieldset__element">
          <Input label="Nom de votre organisation" state="default" />
        </div>
        <div className="fr-fieldset__element fr-mb-10v">
          <Input
            hintText="Format attendu : nom@domaine.fr"
            label="Adresse électronique"
            state="default"
          />
        </div>
        <div className="fr-fieldset__element">
          <Checkbox
            options={[
              {
                label:
                  "J’accepte de recevoir des informations de l’ANSSI concernant la directive NIS2",
                nativeInputProps: {
                  name: "checkboxInfolettre",
                  value: "value1",
                },
              },
              {
                label:
                  "Je souhaite m’enregistrer auprès de l’ANSSI afin de bénéficier des futurs services dédiés aux organisations concernées",
                nativeInputProps: {
                  name: "checkboxConsentementInfo",
                  value: "value1",
                },
              },
            ]}
            className="fr-checkbox-group--sm"
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
      </fieldset>
    </form>
  </div>
);

export default SimulateurResterInformee;
