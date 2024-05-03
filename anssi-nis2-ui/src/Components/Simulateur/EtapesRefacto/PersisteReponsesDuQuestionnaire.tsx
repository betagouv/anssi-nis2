import { EnvoieDonneesFormulaire } from "../../../Services/Simulateur/Operations/appelsApi";
import { EtatQuestionnaire } from "../../../questionnaire/reducerQuestionnaire.ts";
import { ReactNode, useEffect } from "react";

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
