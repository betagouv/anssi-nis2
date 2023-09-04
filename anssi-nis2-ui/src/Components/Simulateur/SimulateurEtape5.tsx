import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { detailsDesSecteurs } from "../../Domaine/DomaineSimulateur.ts";
import {
    genereTransformateurValeursVersOptions,
    SimulateurContenuEtapeProps,
} from "../../Services/simulateurFrontServices.ts";

const SimulateurEtape5 = ({
                              handleChange,
                              formData,
                          }: SimulateurContenuEtapeProps) => {
  const valeursActivites =
    detailsDesSecteurs.energie.sousSecteurs?.electricite.activites || {};
  const transformateurSecteurActivite =
    genereTransformateurValeursVersOptions<string>(
      (cle: string, valeurs: Record<string, string>) => valeurs[cle],
      "secteurActivite",
    );
  const optionsSecteurActivite =
    transformateurSecteurActivite(
        valeursActivites,
        handleChange,
        formData,
        "energie",
        );
  return (
    <div className="fr-fieldset__element">
      <p>
        Quelles sont les activités pratiquées dans les secteurs sélectionnés ?
      </p>
      <p className="fr-text-mention--grey fr-text--sm">
        Cliquez sur les info-bulles pour obtenir plus d’informations sur les
        définitions des activités.
      </p>

      <Checkbox
        legend="Énergie / Électricité"
        options={optionsSecteurActivite}
      />
    </div>
  );
};

export default SimulateurEtape5;
