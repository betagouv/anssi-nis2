import { Activite } from "./Activite.definitions";

export const auMoinsUneActiviteCommuneAvec =
  (activitesCherchees: Activite[]) => (listeTesteeActivites: Activite[]) =>
    activitesCherchees.some((activite) =>
      listeTesteeActivites.includes(activite)
    );

export const auMoinsUneActiviteInfraNumConcernee =
  auMoinsUneActiviteCommuneAvec([
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfianceQualifie",
    "prestataireServiceConfianceNonQualifie",
  ]);
