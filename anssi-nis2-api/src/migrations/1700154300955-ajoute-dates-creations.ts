import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AjouteDatesCreations1700154300955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dateMigration = `NOW()`;
    await queryRunner.addColumn(
      "simulateur_reponse",
      new TableColumn({
        name: "dateCreation",
        type: "timestamp",
        default: dateMigration,
      }),
    );
    await queryRunner.addColumn(
      "informations_email",
      new TableColumn({
        name: "dateCreation",
        type: "timestamp",
        default: dateMigration,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("simulateur_reponse", "dateCreation");
    await queryRunner.dropColumn("informations_email", "dateCreation");
  }
}
