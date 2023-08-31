
type ValeursClePaysUnionEuropeenne = "france" | "autre" | "horsue"
// Useless ?
// type LibellePaysUnionEuropeene = "France" | "Autre état membre" | "Hors Union Européenne"

const paysUnionEuropeenneLocalisation: Record<ValeursClePaysUnionEuropeenne, string> = {
    france: "France",
    autre: "Autre état membre",
    horsue: "Hors Union Européenne",
}