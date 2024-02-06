import { ConfigModule, ConfigService } from "@nestjs/config";
import { SentryModuleAsyncOptions } from "@ntegral/nestjs-sentry";

export const optionsSentryModule: SentryModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (cfg: ConfigService) => ({
    dsn: cfg.get("SENTRY_DSN"),
    // debug: true,
    environment: cfg.get("SENTRY_ENVIRONNEMENT"),
    logLevels: ["error", "fatal", "warn"],
  }),
  inject: [ConfigService],
};
