import { TypeEtape } from "../../../../../commun/core/src/Domain/Simulateur/InformationsEtape.ts";
import EtapeLocalisationsEtablissementPrincipal from "../../../Components/Simulateur/Etapes/EtapeLocalisationsEtablissementPrincipal.tsx";
import EtapeLocalisationsServices from "../../../Components/Simulateur/Etapes/EtapeLocalisationsServices.tsx";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import {
  EtapeActivites,
  EtapeLocalisation,
  EtapeOSE,
  EtapeSecteursActivite,
  EtapeSousSecteursActivite,
  EtapeTaille,
  EtapeTaillePublique,
  EtapeTypeStructure,
} from "../../../Components/Simulateur/Etapes";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "../Props/component";
import { SimulateurEtapeForm } from "../../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { elementVide } from "../../Echaffaudages/AssistantsEchaffaudages.tsx";

type RepresentationEtape = {
  conteneur: SimulateurEtapeRenderedComponent;
  composant: SimulateurEtapeNodeComponent;
};
export const cartoComposants: Record<TypeEtape, RepresentationEtape> = {
  designationOperateurServicesEssentiels: {
    composant: EtapeOSE,
    conteneur: SimulateurEtapeForm,
  },
  appartenanceUnionEuropeenne: {
    composant: EtapeLocalisation,
    conteneur: SimulateurEtapeForm,
  },
  typeStructure: {
    composant: EtapeTypeStructure,
    conteneur: SimulateurEtapeForm,
  },
  tailleEntitePublique: {
    composant: EtapeTaillePublique,
    conteneur: SimulateurEtapeForm,
  },
  tailleEntitePrivee: {
    composant: EtapeTaille,
    conteneur: SimulateurEtapeForm,
  },
  secteursActivite: {
    composant: EtapeSecteursActivite,
    conteneur: SimulateurEtapeForm,
  },
  sousSecteursActivite: {
    composant: EtapeSousSecteursActivite,
    conteneur: SimulateurEtapeForm,
  },
  activites: { composant: EtapeActivites, conteneur: SimulateurEtapeForm },
  localisationFournitureServicesNumeriques: {
    composant: EtapeLocalisationsServices,
    conteneur: SimulateurEtapeForm,
  },
  localisationEtablissementPrincipal: {
    composant: EtapeLocalisationsEtablissementPrincipal,
    conteneur: SimulateurEtapeForm,
  },
  prealable: {
    composant: elementVide,
    conteneur: SimulateurEtapePrealable,
  },
  resultat: {
    composant: elementVide,
    conteneur: SimulateurEtapeResult,
  },
  inexistante: {
    composant: elementVide,
    conteneur: elementVide,
  },
  variante: {
    composant: elementVide,
    conteneur: SimulateurEtapeForm,
  },
};
