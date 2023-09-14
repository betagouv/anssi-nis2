import { DefaultComponentExtensible } from "../../Props.ts";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { SimulateurEtapeSwitcherProps } from "./props.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "./component.ts";
import { ActionsBoutonNavigation } from "./reducers.ts";
import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";

const prepareGestionBoutonsNavigation = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
  propageHandlerClickBouton: React.Dispatch<ActionsBoutonNavigation>,
) => {
  const gestionSuivantParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape + 1, (val) => action(val));
  };

  const gestionPrecedentParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape - 1, (val) => action(val));
  };
  propageHandlerClickBouton({
    bouton: "suivant",
    newHandler: gestionSuivantParDefaut,
  });
  propageHandlerClickBouton({
    bouton: "precedent",
    newHandler: gestionPrecedentParDefaut,
  });
};

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

  const [gereClickBouton, propageHandlerClickBouton] = useReducer(
    reducerBoutons,
    {
      suivant: noRefClick,
      precedent: noRefClick,
    },
  );

  useEffect(() => {
    prepareGestionBoutonsNavigation(
      listeEtapes,
      numeroEtapeCourante,
      (val: number) => setNumeroEtapeCourante(val),
      propageHandlerClickBouton,
    );
  }, [listeEtapes, numeroEtapeCourante]);

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[numeroEtapeCourante].elementToRender;

  return (
    <ElementRendered
      numeroEtapeCourante={numeroEtapeCourante}
      listeEtapes={listeEtapes}
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      gereClickBouton={gereClickBouton}
    />
  );
};
