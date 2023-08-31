import {ValeursClePaysUnionEuropeenne, ValeursTypeStructure} from "../Domaine/DomaineSimulateur.ts"

type TransformeRecordToSelect<ValeursCles extends string> =
    (valeurs: Record<ValeursCles, string>)
        => {
        nativeInputProps: {
            name: string;
            value: string
        };
        label: string
    }[]

type GenerateurOptions<T extends string> = (valeursMetier: Record<T, string>, value: string, name: string) => {
    nativeInputProps: {
        name: string;
        value: string
    };
    label: string
}

function genereTransformateurValeursVersOptions<T extends string>(generateurOption: GenerateurOptions<T>, name: string): TransformeRecordToSelect<T> {
    return (valeursMetier) => {
        const selectOptions: Array<{
            nativeInputProps: {
                name: string;
                value: string
            };
            label: string
        }>
            = []
        for (const key in valeursMetier) {
            selectOptions.push(generateurOption(valeursMetier, key, name))
        }
        return selectOptions
    }
}

const createOptionPaysUnionEuropeenne: GenerateurOptions<ValeursClePaysUnionEuropeenne> = (paysUnionEuropeenne: Record<ValeursClePaysUnionEuropeenne, string>, value: string, name: string) => ({
    label: paysUnionEuropeenne[value as ValeursClePaysUnionEuropeenne],
    nativeInputProps: {
        name: name,
        value: value,
    },
})

export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<ValeursClePaysUnionEuropeenne> = genereTransformateurValeursVersOptions(createOptionPaysUnionEuropeenne, "etatMembre")

const createOptionTypeStructure: GenerateurOptions<ValeursTypeStructure> = (paysUnionEuropeenne: Record<ValeursTypeStructure, string>, value: string, name: string) => ({
    label: paysUnionEuropeenne[value as ValeursTypeStructure],
    nativeInputProps: {
        name: name,
        value: value,
    },
})

export const transformeTypeStructureVersOptions: TransformeRecordToSelect<ValeursTypeStructure> = genereTransformateurValeursVersOptions(createOptionTypeStructure, "typeStructure")

