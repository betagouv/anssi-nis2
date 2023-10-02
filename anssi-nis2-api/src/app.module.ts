import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeurStaticConfigurableModule } from "./serveur-static-configurable.module";
import { DataSource } from "typeorm";
import { SimulateurReponseModule } from "./simulateur-reponse/simulateur-reponse.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
// import { fabriqueAsynchroneOptionsTypeOrm } from "./Fabriques/fabriqueAsynchroneOptionsTypeOrm";
import { fabriqueAsynchroneOptionsServeurStatique } from "./Fabriques/fabriqueAsynchroneOptionsServeurStatique";
import { fabriqueAsynchroneOptionsTypeOrm } from "./Fabriques/fabriqueAsynchroneOptionsTypeOrm";

const optionsConnectionBaseDeDonnees = fabriqueAsynchroneOptionsTypeOrm();

@Module({
  imports: [
    TypeOrmModule.forRootAsync(optionsConnectionBaseDeDonnees),
    ServeurStaticConfigurableModule.forRootAsync(
      fabriqueAsynchroneOptionsServeurStatique,
    ),
    SimulateurReponseModule,
    DatabaseModule,
    ConfigModule.forRoot(),
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
