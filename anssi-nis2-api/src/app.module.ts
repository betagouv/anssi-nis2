import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SentryModule } from "@ntegral/nestjs-sentry";
import { DataSource } from "typeorm";
import { optionsThrottlerModuleAsync } from "./configurationThrottler";
import { fabriqueAsynchroneOptionsServeurStatique } from "./Fabriques/fabriqueAsynchroneOptionsServeurStatique";
import {
  fabriqueAsynchroneOptionsTypeOrm,
  fabriqueAsynchroneOptionsTypeOrmJournal,
} from "./Fabriques/fabriqueAsynchroneOptionsTypeOrm";
import { InformationsEmailsModule } from "./informations-emails/informations-emails.module";
import { ServeurStatiqueConfigurableModule } from "./intergiciels/serveur-statique-configurable/serveur-statique-configurable.module";
import { JournalModule } from "./journal/journal.module";
import { optionsSentryModule } from "./optionsSentryModule";
import { SimulateurReponseModule } from "./simulateur-reponse/simulateur-reponse.module";

const optionsConnectionBaseDeDonnees = fabriqueAsynchroneOptionsTypeOrm();

@Module({
  imports: [
    ThrottlerModule.forRootAsync(optionsThrottlerModuleAsync),
    TypeOrmModule.forRootAsync(optionsConnectionBaseDeDonnees),
    TypeOrmModule.forRootAsync(fabriqueAsynchroneOptionsTypeOrmJournal()),
    ServeurStatiqueConfigurableModule.forRootAsync(
      fabriqueAsynchroneOptionsServeurStatique,
    ),
    SimulateurReponseModule,
    JournalModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InformationsEmailsModule,
    SentryModule.forRootAsync(optionsSentryModule),
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private dataSource: DataSource) {
    this.logger.log(
      `Démarrage du serveur sur base de données ${dataSource.options.type}`,
    );
  }
}
