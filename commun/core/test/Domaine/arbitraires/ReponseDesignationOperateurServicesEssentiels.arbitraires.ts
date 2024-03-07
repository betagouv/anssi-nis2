import { fc } from "@fast-check/vitest";
import { ReponseDesignationOperateurServicesEssentiels } from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  arbDesignationOperateurServicesEssentiels_ToujoursNeSaitPas,
  arbDesignationOperateurServicesEssentiels_ToujoursNon,
  arbDesignationOperateurServicesEssentiels_ToujoursOui,
} from "./ResultatEvaluationRegulation.champs.arbitraire";

export const arbReponseDesignationOperateurServicesEssentiels_ToujoursOui =
  fc.record<ReponseDesignationOperateurServicesEssentiels>({
    designationOperateurServicesEssentiels:
      arbDesignationOperateurServicesEssentiels_ToujoursOui,
  });
export const arbReponseDesignationOperateurServicesEssentiels_ToujoursNon =
  fc.record<ReponseDesignationOperateurServicesEssentiels>({
    designationOperateurServicesEssentiels:
      arbDesignationOperateurServicesEssentiels_ToujoursNon,
  });
export const arbReponseDesignationOperateurServicesEssentiels_ToujoursNeSaitPas =
  fc.record<ReponseDesignationOperateurServicesEssentiels>({
    designationOperateurServicesEssentiels:
      arbDesignationOperateurServicesEssentiels_ToujoursNeSaitPas,
  });
