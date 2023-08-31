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

export type ValeursTrancheNombreEmployes = "petit" | "moyen" | "grand"
export const tranchesNombreEmployes: Record<ValeursTrancheNombreEmployes, string> = {
    petit: "1 à 49",
    moyen: "50 à 249",
    grand: "≥ 250",
}

export type ValeursTrancheCA = "petit" | "moyen" | "grand"
export const tranchesCA: Record<ValeursTrancheCA, string> = {
    petit: "< 10 millions €",
    moyen: "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
    grand: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
}