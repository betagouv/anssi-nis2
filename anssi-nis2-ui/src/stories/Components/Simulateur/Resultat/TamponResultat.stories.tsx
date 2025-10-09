import { Meta } from "@storybook/react-vite";
import { TamponResultat } from "../../../../Components/Simulateur/Resultats/TamponResultat.tsx";
import {
  Regulation,
  TypeEntite,
} from "../../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

const { Incertain, Regule, NonRegule } = Regulation;
const {
  AutreEtatMembreUE,
  EnregistrementUniquement,
  EntiteImportante,
  EntiteEssentielle,
} = TypeEntite;

const meta: Meta<typeof TamponResultat> = {
  component: TamponResultat,
  title: "Composants/Résultat/Tampon de résultat",
};
export default meta;

export const ReguleeEE = {
  args: {
    resultat: { regulation: Regule, typeEntite: EntiteEssentielle },
  },
};

export const ReguleeEI = {
  args: {
    resultat: { regulation: Regule, typeEntite: EntiteImportante },
  },
};

export const ReguleeSansPrecisions = {
  args: {
    resultat: { regulation: Regule, typeEntite: AutreEtatMembreUE },
  },
};

export const ReguleeEnregistrementUniquement = {
  args: {
    resultat: { regulation: Regule, typeEntite: EnregistrementUniquement },
  },
};

export const NonRegulee = {
  args: {
    resultat: { regulation: NonRegule, typeEntite: EnregistrementUniquement },
  },
};

export const NeSaitPas = {
  args: {
    resultat: { regulation: Incertain, typeEntite: EnregistrementUniquement },
  },
};
