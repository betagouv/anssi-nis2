import { ReactNode, useEffect } from "react";
import { EnvoieDonneesFormulaire } from "../../../Services/Simulateur/Operations/appelsApi";
import { EtatQuestionnaire } from "../../../../../commun/core/src/Domain/Questionnaire/EtatQuestionnaire";

export function PersisteReponsesDuQuestionnaire(props: {
  persistance: EnvoieDonneesFormulaire;
  reponses: EtatQuestionnaire;
  children: ReactNode;
}) {
  useEffect(() => {
    props.persistance(props.reponses);
  }, [props.persistance, props.reponses]);

  return props.children;
}
