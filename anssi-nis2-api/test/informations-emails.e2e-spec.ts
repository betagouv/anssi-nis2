import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";
import { informationsEmail } from "../src/informations-emails/example/informations.email.exemples";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("Ajoute une adresse email", () => {
    return request(app.getHttpServer())
      .post("/informations-emails")
      .send(informationsEmail)
      .set("Accept", "application/json")
      .expect(201);
  });
  it("Ajoute une adresse email avec peu d'informations", () => {
    const infoEmailPartielles = {
      email: "admin@admin.com",
      accepteInfolettreNis2: false,
    };
    return request(app.getHttpServer())
      .post("/informations-emails")
      .send(infoEmailPartielles)
      .set("Accept", "application/json")
      .expect(201);
  });
});
