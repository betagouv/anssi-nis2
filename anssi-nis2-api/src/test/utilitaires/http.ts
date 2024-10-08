import * as request from "supertest";
import { Express } from "express";

export const POST = async (app: Express, path: string, body: object) =>
  await request(app).post(path).send(body).set("Accept", "application/json");
