import { it, expect, describe, afterAll, beforeAll, beforeEach } from "vitest"
import { randomUUID } from "node:crypto"
import { execSync } from "node:child_process"
import { app } from "../src/app"
import supertest from "supertest"

describe("Meals route", () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(() => {
    execSync("npx knex migrate:rollback --all")
    execSync("npx knex migrate:latest")
  })

  it("1. Should be able to add a meal.", async () => {
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

  it("2. Should be able to list meals.", async () => {
    const createRes = await supertest(app.server)
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

    const cookies = createRes.get("Set-Cookie")
    const mealsResponse = await supertest(app.server)
      .get("/meals")
      .set("Cookie", cookies)
      .expect(200)

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

  it("3. Should be able to retrieve a meal by ID or by Consumer ID.", async () => {
    const createUserRes = await supertest(app.server)
      .post("/users")
      .send({ name: "Bruno Peres", email: "bruno@gmail.com" })
      .expect(201)

    const cookies = createUserRes.get("Set-Cookie")

    await supertest(app.server)
      .post("/meals")
      .set("Cookie", cookies)
      .send({
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: true,
      })
      .expect(201)

    const mealsResponse = await supertest(app.server)
      .get("/meals")
      .set("Cookie", cookies)
    const { id, consumer_id } = mealsResponse.body.meals[0]
    const responseByID = await supertest(app.server)
      .get(`/meals/${id}`)
      .set("Cookie", cookies)
    const responseByConsumerID = await supertest(app.server)
      .get(`/meals/${consumer_id}`)
      .set("Cookie", cookies)

    expect(responseByID.body.meal).toEqual(
      expect.objectContaining({
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: 1,
      })
    )

    expect(responseByConsumerID.body.meal).toEqual(
      expect.objectContaining({
        name: "Macarronada",
        description: "Macarronada com carne moída",
        date: "2023-09-28",
        time: "12:02",
        in_diet: 1,
      })
    )
  })

  it("4. Should be able to delete a meal by ID.", async () => {
    const deleteRes = await supertest(app.server)
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

    const cookies = deleteRes.get("Set-Cookie")

    const mealsResponse = await supertest(app.server)
      .get("/meals")
      .set("Cookie", cookies)
      .expect(200)
    const { id } = mealsResponse.body.meals[0]

    await supertest(app.server)
      .delete(`/meals/${id}`)
      .set("Cookie", cookies)
      .expect(204)
  })
})
