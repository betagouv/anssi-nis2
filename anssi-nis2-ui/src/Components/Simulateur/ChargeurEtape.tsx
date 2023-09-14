import { DefaultComponentExtensible } from "../../Props.ts";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { SimulateurEtapeSwitcherProps } from "./props.ts";
import { etapesQuestionnaire } from "./EtapesQuestionnaire.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "./component.ts";
import { GenerateurSoumissionEtape } from "./gestionnaires.ts";

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
    const soumissionEtape: GenerateurSoumissionEtape = (
      limiteConditions,
      nouvelleEtape,
    ) => {
      return (e: React.MouseEvent) => {
        const valeur = nouvelleEtape(numeroEtapeCourante);
        e.preventDefault();
        if (limiteConditions(valeur)) {
          setNumeroEtapeCourante(valeur);
        }
      };
    };
    const gestionSuivantParDefaut = soumissionEtape(
      (etape) => etape < etapesQuestionnaire.length,
      (etape) => etape + 1,
    );

    const gestionPrecedentParDefaut = soumissionEtape(
      (etape) => etape >= 0,
      (etape) => etape - 1,
    );
    propageHandlerClickBouton({
      bouton: "suivant",
      newHandler: gestionSuivantParDefaut,
    });
    propageHandlerClickBouton({
      bouton: "precedent",
      newHandler: gestionPrecedentParDefaut,
    });
  }, [numeroEtapeCourante]);

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
