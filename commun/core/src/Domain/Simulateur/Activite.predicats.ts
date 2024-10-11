import { Activite } from "./Activite.definitions";

const prefixeAutreActivite = "autreActivite";


export const estActiviteListee = (activite: Activite) =>
  !activite.startsWith(prefixeAutreActivite);

export const auMoinsUneActiviteCommuneAvec =
  (activitesCherchees: Activite[]) => (listeTesteeActivites: Activite[]) =>
    activitesCherchees.some((activite) =>
      listeTesteeActivites.includes(activite),
    );

export const auMoinsUneActiviteInfraNumConcernee =
  auMoinsUneActiviteCommuneAvec([
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfianceQualifie",
    "prestataireServiceConfianceNonQualifie",
  ]);

