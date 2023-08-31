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
export type InformationsEtape = {
    titre: string,
    indicationReponses: string,
    contenu: React.ReactNode,
}

export interface SimulateurEtapeProps extends DefaultProps {
    etapeCourante: number,
    nombreEtapes: number,
    etape: InformationsEtape,
    suivante: InformationsEtape,
    etapePrecedente: (e: React.MouseEvent) => void,
    etapeSuivante: (e: React.MouseEvent) => void
}