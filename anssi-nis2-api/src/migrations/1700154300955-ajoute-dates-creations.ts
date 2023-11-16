import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AjouteDatesCreations1700154300955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dateMigration = `NOW()`;
    const simulateurReponse = "simulateur_reponse";
    const colonneTimeStamp = {
      name: "dateCreation",
      type: "timestamp",
      default: dateMigration,
    };
    if (!(await queryRunner.hasTable(simulateurReponse))) {
      await queryRunner.createTable(
        new Table({
          name: simulateurReponse,
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: "reponseJson",
              type: "varchar",
            },
            colonneTimeStamp,
          ],
        }),
      );
    } else {
      await queryRunner.addColumn(
        simulateurReponse,
        new TableColumn(colonneTimeStamp),
      );
    }

    const informationsEmail = "informations_email";
    if (!(await queryRunner.hasTable(informationsEmail))) {
      await queryRunner.createTable(
        new Table({
          name: informationsEmail,
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: "email",
              type: "varchar",
            },
            {
              name: "nomOrganisation",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "accepteInfolettreNis2",
              type: "bool",
              default: false,
            },
            {
              name: "accepteInfolettreServicesDedies",
              type: "bool",
              default: false,
            },
          ],
        }),
      );
    } else {
      await queryRunner.addColumn(
        informationsEmail,
        new TableColumn(colonneTimeStamp),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("simulateur_reponse", "dateCreation");
    await queryRunner.dropColumn("informations_email", "dateCreation");
  }
}
