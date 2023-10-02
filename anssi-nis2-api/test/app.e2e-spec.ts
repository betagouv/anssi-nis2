import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

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

  describe("Authentification à la racine", () => {
    it("/ (GET - unauthentified)", () => {
      return request(app.getHttpServer())
        .get("/")
        .send()
        .expect(401)
        .expect("");
    });
    it("/ (GET - with Auth)", () => {
      return request(app.getHttpServer())
        .get("/")
        .auth("NIS2", "toto")
        .send()
        .expect(200)
        .expect("Content-Type", /html/);
    });
  });
});
