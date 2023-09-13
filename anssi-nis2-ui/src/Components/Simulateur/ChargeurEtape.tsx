import { DefaultComponentExtensible } from "../../Props.ts";
import { useContext, useEffect, useReducer } from "react";
import {
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeSwitcherProps,
} from "./props.ts";
import { etapesQuestionnaire } from "./EtapesQuestionnaire.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { emptySimulateurFormData } from "../../Services/Simulateur/FormData.ts";
import { AppContext } from "../../AppContext.tsx";

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = ({
  etapeCourante,
  listeEtapes,
  soumissionEtape,
}: SimulateurEtapeSwitcherProps) => {
  const {
    simulateur: { reducerFormData, reducerBoutons },
  } = useContext(AppContext);
  const [inputsState, propageActionSimulateur] = useReducer(
    reducerFormData,
    emptySimulateurFormData,
  );

  const [gereClickBouton, propageHandlerClickBouton] = useReducer(
    reducerBoutons,
    {
      suivant: noRefClick,
      precedent: noRefClick,
    },
  );

  useEffect(() => {
    propageHandlerClickBouton({
      bouton: "suivant",
      newHandler: soumissionEtape(
        (etape) => etape < etapesQuestionnaire.length,
        (etape) => etape + 1,
      ),
    });
    propageHandlerClickBouton({
      bouton: "precedent",
      newHandler: soumissionEtape(
        (etape) => etape >= 0,
        (etape) => etape - 1,
      ),
    });
  }, [etapeCourante, soumissionEtape]);

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[etapeCourante].elementToRender;

  return (
    <ElementRendered
      listeEtapes={listeEtapes}
      etapeCourante={etapeCourante}
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      gereClickBouton={gereClickBouton}
    />
  );
};
