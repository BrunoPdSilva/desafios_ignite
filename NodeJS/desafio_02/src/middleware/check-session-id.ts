import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionID(req: FastifyRequest, res: FastifyReply) {
  const { sessionID } = req.cookies

  if (!sessionID) {
    return res.status(403).send({ error: "Unauthorized." })
  }
}
