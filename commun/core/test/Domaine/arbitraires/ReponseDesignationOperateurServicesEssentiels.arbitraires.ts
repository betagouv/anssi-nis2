import { fc } from "@fast-check/vitest";
import { ReponseDesignationOperateurServicesEssentiels } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseDesignationOperateurServicesEssentiels.definitino";
import {
  arbDesignationOperateurServicesEssentiels_ToujoursNeSaitPas,
  arbDesignationOperateurServicesEssentiels_ToujoursNon,
} from "./ValeursChampsSimulateur.arbitraire";

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

export const arbReponseDesignationOperateurServicesEssentiels_JamaisOui =
  fc.oneof(
    arbReponseDesignationOperateurServicesEssentiels_ToujoursNon,
    arbReponseDesignationOperateurServicesEssentiels_ToujoursNeSaitPas,
  );
