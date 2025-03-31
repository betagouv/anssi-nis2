import { DefaultComponent } from "../../Services/Props";
import { SommaireSynchroAvecScroll } from "../General/SommaireSynchoAvecScroll.tsx";

export const Sommaire: DefaultComponent = () => (
  <SommaireSynchroAvecScroll
    liens={[
      { id: "mot-du-directeur", titre: "Le mot du Directeur Général" },
      { id: "explication-nis2", titre: "Qu’est-ce que NIS 2 ?" },
      {
        id: "entites",
        titre: "Les entités essentielles (EE) et entités importantes (EI)",
      },
      {
        id: "secteurs-activite",
        titre:
          "Plusieurs milliers d'entités concernées sur 18 secteurs d'activité",
      },
      { id: "secteurs-concernes", titre: "Les secteurs concernés" },
      { id: "obligations", titre: "Quelles obligations pour les entités ?" },
      {
        id: "demarche",
        titre: "L’ANSSI vous accompagne dans cette démarche",
      },
      { id: "en-savoir-plus", titre: "En savoir plus" },
    ]}
  />
);
