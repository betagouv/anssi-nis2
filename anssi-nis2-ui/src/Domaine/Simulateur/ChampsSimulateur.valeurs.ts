export const ValeursOuiNon = ["oui", "non"] as const;
export const ValeursDesignationOperateurServicesEssentiels = [
  ...ValeursOuiNon,
  "nsp",
] as const;
export const ValeursAppartenancePaysUnionEuropeenne = [
  "france",
  "autre",
  "horsue",
] as const;
export const ValeursTypeStructure = ["publique", "privee"] as const;
export const ValeursTypeEntitePublique = [
  "administrationCentrale",
  "collectiviteTerritoriale",
  "autreStructurePublique",
] as const;
export const ValeursPetitMoyenGrand = ["petit", "moyen", "grand"] as const;
