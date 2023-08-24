import React from "react"

export type Props = {
    className?: string
}


export type DefaultProps = {
    children?: React.ReactNode,
    className?: string,
    page?: string
}

export type DefaultComponent = (props: DefaultProps) => React.ReactNode