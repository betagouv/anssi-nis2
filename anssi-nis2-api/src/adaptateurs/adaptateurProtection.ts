import { Express } from "express";

export interface AdaptateurProtection {
  initialise: (applicationExpress: Express) => void;
}
