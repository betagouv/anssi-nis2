export type ValeursClePaysUnionEuropeenne = "france" | "autre" | "horsue"
export const paysUnionEuropeenneLocalisation: Record<ValeursClePaysUnionEuropeenne, string> = {
    france: "France",
    autre: "Autre état membre",
    horsue: "Hors Union Européenne",
}

export type ValeursTypeStructure = "publique" | "privee" | "association"
export const typesStructure: Record<ValeursTypeStructure, string> = {
    publique: "Publique",
    privee: "Privée",
    association: "Association",
}