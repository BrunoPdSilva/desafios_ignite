import { it, expect, describe, afterAll, beforeAll, beforeEach } from "vitest"
import { execSync } from "node:child_process"
import { app } from "../src/app"
import supertest from "supertest"
import { randomUUID } from "node:crypto"

describe("Meals route", () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(() => {
    execSync("pnpm dlx knex migrate:rollback --all")
    execSync("pnpm dlx knex migrate:latest")
  })

  it("should be able to list the meals", async () => {
    await supertest(app.server)
      .post("/meals")
      .send({
        id: randomUUID(),
        consumer_id: randomUUID(),
        consumer_session_id: randomUUID(),
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: true,
      })
      .expect(201)

    const mealsResponse = await supertest(app.server).get("/meals").expect(200)

    expect(mealsResponse.body.meals).toEqual([
      expect.objectContaining({
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: 1,
      }),
    ])
  })

  it("should be able to add a meal", async () => {
    await supertest(app.server)
      .post("/meals")
      .send({
        id: randomUUID(),
        consumer_id: randomUUID(),
        consumer_session_id: randomUUID(),
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: true,
      })
      .expect(201)
  })
})
