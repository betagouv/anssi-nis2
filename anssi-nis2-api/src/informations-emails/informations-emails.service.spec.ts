import { InformationsEmailsService } from "./informations-emails.service";
import { mockInformationsEmailRepository } from "./informations-emails.repository.mock";
import { informationsEmail } from "./example/informations.email.exemples";
import { espereEmailsInformationCorrespondASonDto } from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Test, TestingModuleBuilder } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Crm } from "./crm";
import { CrmInMemory } from "./crm.InMemory";

describe("InformationsEmailsService", () => {
  let testingModuleBuilder: TestingModuleBuilder;
  let crmInMemory: CrmInMemory;

  beforeEach(() => {
    crmInMemory = new CrmInMemory({ activeLeLog: false });

    testingModuleBuilder = Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(InformationsEmail),
          useValue: mockInformationsEmailRepository,
        },
        { provide: Crm, useValue: crmInMemory },
        InformationsEmailsService,
      ],
    });
  });

  const fabriqueService = async () => {
    const module = await testingModuleBuilder.compile();
    return module.get(InformationsEmailsService);
  };

  it("ajoute les données dans la base mockée", async () => {
    const service = await fabriqueService();

    const reponse = await service.ajoute(informationsEmail);

    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });

  it("ajoute le nouvel inscrit au CRM", async () => {
    const service = await fabriqueService();

    await service.ajoute({
      ...informationsEmail,
      email: "utilisateur@societe.fr",
    });

    expect(crmInMemory.inscrits).toContain("utilisateur@societe.fr");
  });

  it.todo(
    "enregistre le nom de l'organisation s'il est présent (cas de l'inscription après le test)",
  );
});
