import { useContext, useEffect, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Props.ts";
import { SimulateurEtapeSwitcherProps } from "./props.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "./component.ts";
import {
  prepareGestionBoutonPrecedent,
  prepareGestionBoutonSuivant,
} from "./boutonsNavigation.ts";

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
    listeEtapes.recupereEtapeCourante(numeroEtapeCourante).elementToRender;

  useEffect(() => {
    propageGestionClicBoutons(
      prepareGestionBoutonSuivant(
        listeEtapes,
        numeroEtapeCourante,
        setNumeroEtapeCourante,
      ),
    );
    propageGestionClicBoutons(
      prepareGestionBoutonPrecedent(
        listeEtapes,
        numeroEtapeCourante,
        setNumeroEtapeCourante,
      ),
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
