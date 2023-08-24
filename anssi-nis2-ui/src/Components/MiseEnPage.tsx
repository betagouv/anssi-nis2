import {DefaultComponent} from "../Props.ts"
import EnTete from "./EnTete.tsx"
import PiedDePage from "./PiedDePage.tsx"

const MiseEnPage: DefaultComponent = (
    {
        children,
        page,
    }) => {

    return <>
        <EnTete/>
        <main className={page} role="main">
            {children}
        </main>
        <PiedDePage/>
    </>
}

export default MiseEnPage