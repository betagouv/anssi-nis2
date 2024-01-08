import { Icon } from "@mui/material";
import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../../../Services/Props";

export const IconeResultat: DefaultComponentExtensible<
  DefaultProps & { classIcone: string }
> = ({ classIcone }: { classIcone: string }) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col fr-nis2-icone">
        <Icon className={[classIcone, "fr-icon--xl"].join(" ")} />
      </div>
    </div>
  </>
);
