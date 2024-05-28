import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { useConfigurationMatomo } from "./useConfigurationMatomo.hook.tsx";

export function MatomoOptOut() {
  const [optOut, setOptOut] = useConfigurationMatomo();

  return (
    <Checkbox
      legend="Toutefois, vous pouvez, à tout moment, refuser d'être suivi de manière anonyme en décochant la case ci-dessous :"
      options={[
        {
          label: optOut
            ? "Vous n'êtes actuellement pas suivi(e). Cochez cette case pour réactiver le suivi."
            : "Vous êtes suivi(e) de manière anonyme. Décochez cette case pour vous exclure du suivi.",
          nativeInputProps: {
            checked: !optOut,
            onChange: () => setOptOut(!optOut),
          },
        },
      ]}
    />
  );
}
