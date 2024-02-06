import { HttpException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import {
  SentryInterceptor,
  SentryModuleAsyncOptions,
} from "@ntegral/nestjs-sentry";

export const optionsSentryModule: SentryModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (cfg: ConfigService) => ({
    dsn: cfg.get("SENTRY_DSN"),
    environment: cfg.get("SENTRY_ENVIRONNEMENT"),
    logLevels: ["error", "fatal", "warn"],
  }),
  inject: [ConfigService],
};
export const sentryIntercepteur = {
  provide: APP_INTERCEPTOR,
  useFactory: () =>
    new SentryInterceptor({
      filters: [
        {
          type: HttpException,
          filter: (exception: HttpException) => 500 > exception.getStatus(), // Only report 500 errors
        },
      ],
    }),
};
