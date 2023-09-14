import { DefaultComponentExtensible } from "../../Props.ts";
import { useContext, useEffect, useReducer, useState } from "react";
import { SimulateurEtapeSwitcherProps } from "./props.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "./component.ts";
import { prepareGestionBoutonsNavigation } from "./boutonsNavigation.ts";

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = ({ listeEtapes }: SimulateurEtapeSwitcherProps) => {
  const {
    simulateur: { reducerFormData, reducerBoutons },
  } = useContext(AppContext);
  const [inputsState, propageActionSimulateur] = useReducer(
    reducerFormData,
    donneesFormulaireSimulateurVide,
  );
  const [numeroEtapeCourante, setNumeroEtapeCourante] = useState(0);

  const [gestionClicBoutons, propageGestionClicBoutons] = useReducer(
    reducerBoutons,
    {
      suivant: noRefClick,
      precedent: noRefClick,
    },
  );

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[numeroEtapeCourante].elementToRender;

  useEffect(() => {
    prepareGestionBoutonsNavigation(
      listeEtapes,
      numeroEtapeCourante,
      (val: number) => setNumeroEtapeCourante(val),
      propageGestionClicBoutons,
    );
  }, [listeEtapes, numeroEtapeCourante]);

  return (
    <ElementRendered
      numeroEtapeCourante={numeroEtapeCourante}
      listeEtapes={listeEtapes}
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      informationsBoutonsNavigation={gestionClicBoutons}
    />
  );
};
