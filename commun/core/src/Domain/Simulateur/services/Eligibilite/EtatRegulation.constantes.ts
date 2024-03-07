import { isMatching } from "ts-pattern";

export const resultatEstDefinitif: Parameters<
  typeof isMatching<{
    _resultatEvaluationRegulation: "Definitif";
  }>
>[0] = {
  _resultatEvaluationRegulation: "Definitif",
};