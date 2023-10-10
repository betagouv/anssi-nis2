import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { LigneReseauxSociaux } from "./Resultats/LigneReseauxSociaux.tsx";
import { LigneBienDebuter } from "./Resultats/LigneBienDebuter.tsx";
import { LigneResultat } from "./Resultats/LigneResultat.tsx";
import { LigneResterInformer } from "./Resultats/LigneResterInformer.tsx";

export const SimulateurEtapeResult: SimulateurEtapeRenderedComponent = (
  props,
) => {
  return (
    <>
      <LigneResultat {...props} />
      <LigneResterInformer />
      <LigneBienDebuter />
      <LigneReseauxSociaux />
    </>
  );
};
