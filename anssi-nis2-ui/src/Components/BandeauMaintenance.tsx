import { Fragment } from "react";

export function BandeauMaintenance() {
  const maintenanceEstPrevue = import.meta.env.VITE_MAINTENANCE_PREVUE;

  if (!maintenanceEstPrevue) return <Fragment />;

  return (
    <div className="fr-bandeau-maintenance">
      <div className="fr-container">
        MonEspaceNIS2 sera en maintenance {maintenanceEstPrevue}.
        <br />
        La plate-forme sera indisponible durant ce créneau.
      </div>
    </div>
  );
}
