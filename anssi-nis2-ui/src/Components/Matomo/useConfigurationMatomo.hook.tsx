import { useState } from "react";

export const useConfigurationMatomo = (): [
  boolean,
  (estOptOut: boolean) => void,
] => {
  const [optOut, setOptOutState] = useState<boolean>(
    localStorage.getItem("optOutMatomo") === "true",
  );

  const setOptOut = (estOptOut: boolean) => {
    setOptOutState(estOptOut);
    localStorage.setItem("optOutMatomo", String(estOptOut));
    window.location.reload();
  };

  return [optOut, setOptOut];
};
