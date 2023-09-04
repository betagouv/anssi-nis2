import {DefaultComponent, DefaultProps} from "../../Props.ts"

const FormSimulateur: DefaultComponent = ({children}: DefaultProps) =>         <form className="fr-mb-0" id="login-1797">
    <fieldset
        className="fr-mb-0 fr-fieldset"
        id="login-1797-fieldset"
        aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages"
    >
        {children}
    </fieldset>
</form>

export default FormSimulateur