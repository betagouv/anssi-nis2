import React from "react"

export type Props = {
    className?: string
}


export type DefaultProps = {
    children?: React.ReactNode,
    className?: string,
    page?: string
}

export type DefaultComponentExtensible<AdditionalProps extends DefaultProps> = (props: AdditionalProps) => React.ReactNode
export type DefaultComponent = DefaultComponentExtensible<DefaultProps>
export type InformationsEtape = { titre: string }

export interface SimulateurEtapeProps extends DefaultProps {
    numero: number,
    total: number,
    etape: InformationsEtape,
    suivante: InformationsEtape,
    indicationReponses: string
}