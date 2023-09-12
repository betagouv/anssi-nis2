import { describe, it } from "vitest";
import { SimulateurEtape1 } from "../../../src/Components/Simulateur";
import { render, screen } from "@testing-library/react";
import { expect } from "../../testUtils";

import { emptySimulateurFormData } from "../../../src/Services/Simulateur/FormData";

describe("Simulateur", () => {
  it('affiche un libellé contenant "Union Européenne"', () => {
    render(<SimulateurEtape1 formData={emptySimulateurFormData} />);

    const searchResult = screen.getByText(
      /Dans quel état membre de l’Union Européenne êtes-vous implanté/i,
    );

    expect(searchResult).toBeInTheDocument();
  });
});
