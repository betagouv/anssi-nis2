import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

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
                if (!props.onPrecedent) return;

                props.onPrecedent();
                centreSurHautFormulaire();
              },
              priority: "secondary",
              disabled: !props.onPrecedent,
            },
            {
              children: "Suivant",
              onClick: () => {
                props.onSuivant();
                centreSurHautFormulaire();
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

const centreSurHautFormulaire = () =>
  window.scrollTo({ top: document.getElementById("debutForm")?.offsetTop });
