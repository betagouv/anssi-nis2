import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { informationsEmail } from "./example/informations.email.exemples";
import { Test } from "@nestjs/testing";
import { espereEmailsInformationCorrespondASonDto } from "../test/utilitaires/facilitateurs";

const mockInformationsEmailsService = {
  ajoute: jest.fn().mockReturnValue({ ...informationsEmail, id: 1 }),
};
describe("InformationsEmailsController", () => {
  const moduleConstructeur = Test.createTestingModule({
    providers: [
      {
        provide: InformationsEmailsService,
        useValue: mockInformationsEmailsService,
      },
    ],
    controllers: [InformationsEmailsController],
  });
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
