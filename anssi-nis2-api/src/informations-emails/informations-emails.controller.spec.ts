import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { datasourceKey } from "../constantes";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { espereEmailsInformationCorrespondASonDto } from "./helpers/testHelpers";
import { fabriqueConstructeurTestModule } from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";

describe("InformationsEmailsController", () => {
  beforeEach(async () => {});

  const moduleConstructeur = fabriqueConstructeurTestModule(
    [
      {
        provide: datasourceKey,
        useValue: mockInformationsEmailRepository,
      },
      InformationsEmailsService,
    ],
    [InformationsEmail],
    [InformationsEmailsController],
  );
  it("doit retourner l'identifiant", async () => {
    const informationsEmail: CreateInformationsEmailDto = {
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    };
    const module = await moduleConstructeur.compile();
    const controller = module.get<InformationsEmailsController>(
      InformationsEmailsController,
    );
    const valeurAjoutee = await controller.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(valeurAjoutee, informationsEmail);
  });
});
