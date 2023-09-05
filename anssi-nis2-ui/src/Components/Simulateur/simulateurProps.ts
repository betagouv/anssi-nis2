import { DefaultComponentExtensible, DefaultProps } from "../../Props.ts";
import { SimulateurEtapeResult } from "./SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "./SimulateurEtapeForm.tsx";
import { SimulateurFormData } from "../../Services/simulateurFrontServices.ts";

export interface SimulateurContenuEtapeProps extends DefaultProps {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  formData: SimulateurFormData;
}

export type SimulateurEtapeNodeComponent =
  DefaultComponentExtensible<SimulateurContenuEtapeProps>;

export interface SimulateurEtapeRenderedProps extends SimulateurEtapeProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  formData: SimulateurFormData;
  handleSendFormData: (formData: SimulateurFormData) => Promise<string>;
}

export type SimulateurEtapeRenderedComponent =
  DefaultComponentExtensible<SimulateurEtapeRenderedProps>;

export type InformationsEtape = {
  titre: string;
  elementToRender: SimulateurEtapeRenderedComponent;
};

export class InformationEtapeForm implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly indicationReponses: string,
    public readonly contenu: SimulateurEtapeNodeComponent,
  ) {}
}

export class InformationEtapeResult implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}

export interface SimulateurEtapeProps extends DefaultProps {
  etapeCourante: number;
  etapePrecedenteHandler: (e: React.MouseEvent) => void;
  etapeSuivanteHandler: (e: React.MouseEvent) => void;
  listeEtapes: InformationsEtape[];
}
