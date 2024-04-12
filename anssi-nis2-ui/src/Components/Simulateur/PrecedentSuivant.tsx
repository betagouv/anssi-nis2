import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { centreSurHautFormulaire } from "./scroll.ts";

export function PrecedentSuivant(props: {
  message: string;
  onSuivant: () => void;
  suivantDisabled: boolean;
  onPrecedent?: () => void;
}) {
  return (
    <div id="stepper-navigation">
      <p className="message-validation">{props.message}</p>
      <div className="conteneur-actions">
        <ButtonsGroup
          alignment="right"
          buttons={[
            {
              children: "Précédent",
              onClick: () => {
                centreSurHautFormulaire();

                if (!props.onPrecedent) return;

                props.onPrecedent();
              },
              priority: "secondary",
              disabled: !props.onPrecedent,
            },
            {
              children: "Suivant",
              onClick: () => {
                centreSurHautFormulaire();
                props.onSuivant();
              },
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
