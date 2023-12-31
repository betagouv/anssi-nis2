import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeurStatiqueConfigurableModule } from "./intergiciels/serveur-statique-configurable/serveur-statique-configurable.module";
import { DataSource } from "typeorm";
import { SimulateurReponseModule } from "./simulateur-reponse/simulateur-reponse.module";
import { ConfigModule } from "@nestjs/config";
import { fabriqueAsynchroneOptionsServeurStatique } from "./Fabriques/fabriqueAsynchroneOptionsServeurStatique";
import {
  fabriqueAsynchroneOptionsTypeOrm,
  fabriqueAsynchroneOptionsTypeOrmJournal,
} from "./Fabriques/fabriqueAsynchroneOptionsTypeOrm";
import { ThrottlerModule } from "@nestjs/throttler";
import { optionsThrottlerModuleAsync } from "./configurationThrottler";
import { InformationsEmailsModule } from "./informations-emails/informations-emails.module";
import { JournalModule } from "./journal/journal.module";

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
