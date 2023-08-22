import Footer from "@codegouvfr/react-dsfr/Footer"

const PiedDePage = () => <>
    <Footer
        contentDescription={<>
            MonParcoursNIS2 aide les entités publiques et privées à sécuriser et homologuer leurs services numériques au
            prisme des obligations de la directive européenne NIS2.
            <br/>
            <br/>
            Il est développé par l’Agence nationale de la sécurité des systèmes d’information, en lien avec BetaGouv de
            la Direction interministérielle du numérique.
        </>}
        websiteMapLinkProps={{href: '#'}}
        accessibility="partially compliant"
        accessibilityLinkProps={{href: '#'}}
        termsLinkProps={{href: '#'}}
    /></>
export default PiedDePage
