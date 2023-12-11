import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as process from "process";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.UTILISATEUR_BASIC_AUTH = "ValeurUtilisateur";
    process.env.MOT_DE_PASSE_BASIC_AUTH = "ValeurMotDePasse";

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("Authentification à la racine", () => {
    it("/ (GET - unauthentified)", () => {
      return (
        request(app.getHttpServer())
          .get("/")
          .send()
          // .expect(401)
          .expect("")
      );
    });
    it("/ (GET - with Auth)", () => {
      return request(app.getHttpServer())
        .get("/")
        .auth("ValeurUtilisateur", "ValeurMotDePasse")
        .send()
        .expect(200)
        .expect("Content-Type", /html/);
    });
  });
});
