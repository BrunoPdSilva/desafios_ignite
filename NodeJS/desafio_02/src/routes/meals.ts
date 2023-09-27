import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function meals(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const bodySchema = z.object({
      
    })
  })
}