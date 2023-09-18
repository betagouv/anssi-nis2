import { useContext, useEffect, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Services/Props.ts";
import { SimulateurEtapeSwitcherProps } from "../../Services/Simulateur/props.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/component.ts";
import {
  prepareGestionBoutonPrecedent,
  prepareGestionBoutonSuivant,
} from "../../Services/Simulateur/boutonsNavigation.ts";

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = ({ etatEtapes }: SimulateurEtapeSwitcherProps) => {
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
    etatEtapes.collectionEtapes.recupereElement(numeroEtapeCourante); //, inputsState); //.elementToRender;

  useEffect(() => {
    propageGestionClicBoutons(
      prepareGestionBoutonSuivant(
        etatEtapes.collectionEtapes,
        numeroEtapeCourante,
        setNumeroEtapeCourante,
      ),
    );
    propageGestionClicBoutons(
      prepareGestionBoutonPrecedent(
        etatEtapes.collectionEtapes,
        numeroEtapeCourante,
        setNumeroEtapeCourante,
      ),
    );
  }, [etatEtapes.collectionEtapes, numeroEtapeCourante]);

  return (
    <ElementRendered
      numeroEtapeCourante={numeroEtapeCourante}
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      informationsBoutonsNavigation={gestionClicBoutons}
      etatEtapes={etatEtapes}
    />
  );
};
