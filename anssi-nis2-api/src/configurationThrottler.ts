import { ConfigModule, ConfigService } from "@nestjs/config";
import { seconds } from "@nestjs/throttler";

type ClesConfigurationThrottler = {
  LIMITATION_REQUETES_COURTE_DUREE: number;
  LIMITATION_REQUETES_COURTE_NOMBRE: number;
  LIMITATION_REQUETES_MOYENNE_DUREE: number;
  LIMITATION_REQUETES_MOYENNE_NOMBRE: number;
  LIMITATION_REQUETES_LONGUE_DUREE: number;
  LIMITATION_REQUETES_LONGUE_NOMBRE: number;
};
const fabriqueThrottlerConfigService = (
  configService: ConfigService<ClesConfigurationThrottler>,
) => [
  {
    name: "short",
    ttl: seconds(configService.get("LIMITATION_REQUETES_COURTE_DUREE")),
    limit: configService.get("LIMITATION_REQUETES_COURTE_NOMBRE"),
  },
  {
    name: "medium",
    ttl: seconds(configService.get("LIMITATION_REQUETES_MOYENNE_DUREE")),
    limit: configService.get("LIMITATION_REQUETES_MOYENNE_NOMBRE"),
  },
  {
    name: "long",
    ttl: seconds(configService.get("LIMITATION_REQUETES_LONGUE_DUREE")),
    limit: configService.get("LIMITATION_REQUETES_LONGUE_NOMBRE"),
  },
];

/*
Envoir des exceptions: {
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
 */

export const optionsThrottlerModuleAsync = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: fabriqueThrottlerConfigService,
};
