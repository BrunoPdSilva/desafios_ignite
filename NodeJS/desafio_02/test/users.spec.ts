import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { execSync } from "node:child_process"
import { app } from "../src/app"
import supertest from "supertest"

describe("Users Route", () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(() => {
    execSync("pnpm dlx knex migrate:rollback --all")
    execSync("pnpm dlx knex migrate:latest")
  })

  it("should be able to register users", async () => {
    await supertest(app.server)
      .post("/users")
      .send({ name: "Bruno Peres", email: "bruno@gmail.com" })
      .expect(201)
  })

  it("should be able to fetch a user", async () => {
    await supertest(app.server)
      .post("/users")
      .send({ name: "Bruno Peres", email: "bruno@gmail.com" })
      .expect(201)

    const usersResponse = await supertest(app.server).get("/users").expect(200)
    const { id } = usersResponse.body.users[0]

    const userResponse = await supertest(app.server)
      .get(`/users/${id}`)
      .expect(200)

    expect(userResponse.body.user).toEqual(
      expect.objectContaining({ name: "Bruno Peres", email: "bruno@gmail.com" })
    )
  })

  it("should be able to fetch multiple users", async () => {
    await supertest(app.server)
      .post("/users")
      .send({ name: "Bruno Peres", email: "bruno@gmail.com" })
      .expect(201)

    const usersResponse = await supertest(app.server).get("/users").expect(200)

    expect(usersResponse.body.users).toEqual([
      expect.objectContaining({
        name: "Bruno Peres",
        email: "bruno@gmail.com",
      }),
    ])
  })

  it("should be able to delete a user", async () => {
    await supertest(app.server)
      .post("/users")
      .send({ name: "Bruno Peres", email: "bruno@gmail.com" })
      .expect(201)

    const userResponse = await supertest(app.server).get("/users").expect(200)
    const { id } = userResponse.body.users[0]

    await supertest(app.server).delete(`/users/${id}`).expect(204)
  })
})
