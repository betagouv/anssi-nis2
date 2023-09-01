import {describe, it, expect} from 'vitest'
import {SimulateurEtape1} from "../../../src/Components/Simulateur"
import {render, screen} from '@testing-library/react'


describe('Simulateur', () => {
    it('affiche un libellé contenant "Union Européenne"', () => {
        render(<SimulateurEtape1/>)

        const searchResult = screen.getByText(/Dans quel état membre de l’Union Européenne êtes-vous implanté/i)

        expect(searchResult).toBeInTheDocument()
    })
})