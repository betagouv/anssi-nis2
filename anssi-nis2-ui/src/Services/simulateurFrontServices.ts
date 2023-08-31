import {ValeursClePaysUnionEuropeenne} from "../Domaine/DomaineSimulateur.ts"

type TransformePaysUnionEuropeennePourSelect =
    (paysUnionEuropeenne: Record<ValeursClePaysUnionEuropeenne, string>)
        => { nativeInputProps: { name: string; value: string }; label: string }[]

export const transformePaysUnionEuropeennePourSelect: TransformePaysUnionEuropeennePourSelect =
    (paysUnionEuropeenne) => {
        const selectOptions: Array<{ nativeInputProps: { name: string; value: string }; label: string }>
            = []
        for (const clePays in paysUnionEuropeenne) {
            selectOptions.push( {
                label: paysUnionEuropeenne[clePays as ValeursClePaysUnionEuropeenne],
                nativeInputProps: {
                    name: "etatMembre",
                    value: clePays,
                }
            })
        }
        return selectOptions
    }