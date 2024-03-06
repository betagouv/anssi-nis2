import { flow } from "fp-ts/lib/function";
import { match, P } from "ts-pattern";
import {
  et,
  non,
  ou,
} from "../../../../../../utils/services/predicats.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation } from "../../Activite.valeurs";
import {
  fabriqueIncertain,
  fabriqueRegule,
} from "../../fabriques/ResultatRegulation.fabrique";
import {
  resultatIncertain,
  resultatIncertainAutrePaysUE,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { TypeEntite } from "../../Regulation.definitions";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
  EtatEvaluationEnSuspens,
  EtapeEvaluationActive,
} from "./EtatRegulation.definitions";
import {
  fabriqueResultatEnSuspensOse,
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationReguleOse,
} from "./EtatRegulation.fabriques";
import { propReponseEtat } from "./StructuresReponse.operations";
import {
  auMoinsUneActiviteListee,
  contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  contientDesActivitesInfrastructureNumeriqueEssentielles,
  estInformationSecteurAvecActivitesEssentielles,
  estInformationSecteurImportantAvecBesoinLocalisation,
  estInformationSecteurSecteurAutre,
  estInformationSecteurSousSecteurAutre,
  estInformationsSecteurEligibleSansBesoinLocalisation,
  estSecteurBienLocaliseGrand,
  estSecteurBienLocaliseHorsFrance,
  estSecteurAvecActivitesEssentiellesBienLocalisees,
  estInformationsPourSecteur,
  auMoinsUneActiviteEstDans,
  estSecteurAnnexe1,
  estSecteurBienLocaliseUE,
} from "./StructuresReponse.predicats";

const propageDonneesEvaluees =
  (etape: EtapeEvaluationActive) => (reponse: EtatRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });
export const evalueRegulationEtatReponseOse = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("DesignationOperateurServicesEssentiels"),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      },
      fabriqueResultatEvaluationReguleOse,
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      },
      fabriqueResultatEnSuspensOse(reponse),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "nsp",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "DesignationOperateurServicesEssentiels",
          resultatIncertain,
        ),
    )
    .otherwise(fabriqueResultatEnSuspensOse(reponse));
export const evalueRegulationEtatReponseLocalisation = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("AppartenancePaysUnionEuropeenne"),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "autre",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          fabriqueIncertain({ _tag: "DefiniDansUnAutreEtatMembre" }),
        ),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: "horsue",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          fabriqueIncertain({
            _tag: "ConstructionTestEnCours",
            typeConstructionEnCours: "HorsUnionEuropeenne",
          }),
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "AppartenancePaysUnionEuropeenne",
        resultatIncertain,
        reponse as EtatEvaluationEnSuspens,
      ),
    );
export const evalueRegulationEtatReponseStructure = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("Structure"),
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
        Structure: { typeStructure: "publique" },
      },
      () => fabriqueResultatEvaluationDefinitif("Structure", resultatIncertain),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "Structure",
        resultatIncertain,
        reponse as EtatEvaluationEnSuspens,
      ),
    );

const fabriqueResultatEvaluationDefinitifCarSecteur = (
  reponse: EtatEvaluationEnSuspens,
  typeEntite: TypeEntite,
) =>
  fabriqueResultatEvaluationDefinitif(
    "InformationsSecteur",
    fabriqueRegule(
      {
        ...propReponseEtat(reponse)("Structure"),
        ...propReponseEtat(reponse)("InformationsSecteur"),
      },
      typeEntite,
    ),
  );

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit = (
  reponse: EtatEvaluationEnSuspens,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(estSecteurAvecActivitesEssentiellesBienLocalisees),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurAvecActivitesEssentielles,
                contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(tous(estSecteurBienLocaliseHorsFrance)),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(estInformationSecteurAvecActivitesEssentielles),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
      ),
    );
export const evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand = (
  reponse: EtatEvaluationEnSuspens,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
                estSecteurBienLocaliseGrand,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                auMoinsUneActiviteEstDans(
                  ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation,
                ),
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurImportantAvecBesoinLocalisation,
                estSecteurBienLocaliseGrand,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurImportantAvecBesoinLocalisation,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsSecteurEligibleSansBesoinLocalisation,
                estSecteurAnnexe1,
                non(estInformationSecteurSousSecteurAutre),
                auMoinsUneActiviteListee,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsSecteurEligibleSansBesoinLocalisation,
                non(estInformationSecteurSousSecteurAutre),
                auMoinsUneActiviteListee,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
      ),
    );
export const evalueRegulationEtatReponseInformationsSecteurEnSuspens = (
  reponse: EtatEvaluationEnSuspens,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        Structure: {
          _categorieTaille: "Petit",
        },
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit,
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand,
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
      ),
    );

export const evalueRegulationEtatReponseInformationsSecteur = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("InformationsSecteur"),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(
              ou(
                estInformationSecteurSecteurAutre,
                estInformationSecteurSousSecteurAutre,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        _tag: "InformationsSecteur",
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspens,
    )
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatIncertain,
      ),
    );

export const evalueEtatRegulation: (
  reponse: EtatRegulation,
) => EtatRegulationDefinitif = flow(
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseStructure,
  evalueRegulationEtatReponseInformationsSecteur,
) as (reponse: EtatRegulation) => EtatRegulationDefinitif;
