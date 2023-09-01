import {
    ValeursClePaysUnionEuropeenne, ValeursSecteurActivite, ValeursTrancheCA, ValeursTrancheNombreEmployes,
    ValeursTypeStructure,
} from "../Domaine/DomaineSimulateur.ts"

type TransformeRecordToSelect<ValeursCles extends string> =
    (valeurs: Record<ValeursCles, string>)
        => {
        nativeInputProps: {
            name: string;
            value: string
        };
        label: string
    }[]

export const genereTransformateurValeursVersOptions = <T extends string>(generateurLabel: (value: string, valeursMetier: Record<T, string>) => string, name: string): TransformeRecordToSelect<T> => (valeursMetier) => {
    const selectOptions: Array<{
        nativeInputProps: {
            name: string;
            value: string
        };
        label: string
    }>
        = []
    for (const key in valeursMetier) {
        selectOptions.push()
        selectOptions.push({
                label: generateurLabel(key, valeursMetier),
                nativeInputProps: {
                    name: name,
                    value: key,
                },
            }
        )
    }
    return selectOptions
}

const getPaysUnionEuropeenneElement =
    (value: string, paysUnionEuropeenne: Record<ValeursClePaysUnionEuropeenne, string>) => paysUnionEuropeenne[value as ValeursClePaysUnionEuropeenne]
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<ValeursClePaysUnionEuropeenne> = genereTransformateurValeursVersOptions(getPaysUnionEuropeenneElement, "etatMembre")


const getTypesStructureElement = (value: string, typesStructure: Record<ValeursTypeStructure, string>) => typesStructure[value as ValeursTypeStructure]
export const transformeTypeStructureVersOptions: TransformeRecordToSelect<ValeursTypeStructure> = genereTransformateurValeursVersOptions(getTypesStructureElement, "typeStructure")

const getNombreEmployesElement = (value: string, tranchesNombreEmployes: Record<ValeursTrancheNombreEmployes, string>) => tranchesNombreEmployes[value as ValeursTrancheNombreEmployes]
export const transformeTranchesNombreEmployesVersOptions: TransformeRecordToSelect<ValeursTrancheNombreEmployes> = genereTransformateurValeursVersOptions(getNombreEmployesElement, "trancheNombreEmployes")

const getCALabel = (value: string, tranchesCA: Record<ValeursTrancheCA, string>) => tranchesCA[value as ValeursTrancheCA]
export const transformeTranchesCAVersOptions: TransformeRecordToSelect<ValeursTrancheCA> = genereTransformateurValeursVersOptions(getCALabel, "trancheCA")


const getSecteurActiviteLabel = (value: string, tranchesCA: Record<ValeursSecteurActivite, string>) => tranchesCA[value as ValeursSecteurActivite]
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<ValeursSecteurActivite> = genereTransformateurValeursVersOptions(getSecteurActiviteLabel, "secteurActivite")
