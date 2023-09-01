import React from 'react'
import Input from "@codegouvfr/react-dsfr/Input";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

const SimulateurAvantDebuter = () => (
  <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
    <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
      <h2 className="fr-text-action-high--blue-france">Avant de débuter</h2>
      <p className="fr-text">
        Avec votre accord, nous souhaiterions enregistrer le nom de votre
        organisation ainsi que votre adresse électronique dans le cadre des
        travaux de conception de cet outil et à des fins d’amélioration du
        service.
      </p>
      <p className="fr-text">
        Si vous le souhaitez, ces informations nous permettrons ausssi de vous
        tenir informé des évolutions de la directive NIS2.
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
                    "J’autorise l’ANSSI à me tenir informé des évolutions de la directive NIS2",
                  nativeInputProps: {
                    name: "checkboxInfolettre",
                    value: "value1",
                  },
                },
                {
                  label:
                    "J’autorise l’ANSSI à conserver ces information à des fins d’amélioration du service",
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
              alignment="right"
              buttons={[
                {
                  children: "Ignorer cette étape",
                  linkProps: {
                    href: "#",
                  },
                  priority: "secondary",
                },
                {
                  children: "Enregistrer",
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
  </div>
);

export default SimulateurAvantDebuter;
