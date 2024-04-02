import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

export function PrecedentSuivant(props: {
  message: string;
  onSuivant: () => void;
  suivantDisabled: boolean;
}) {
  return (
    <div id="stepper-navigation">
      <p className="message-validation">{props.message}</p>
      <div className="conteneur-actions">
        <ButtonsGroup
          alignment="right"
          buttons={[
            {
              children: "Suivant",
              onClick: props.onSuivant,
              type: "submit",
              disabled: props.suivantDisabled,
            },
          ]}
          inlineLayoutWhen="sm and up"
        />
      </div>
    </div>
  );
}
