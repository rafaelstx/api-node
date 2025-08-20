import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      body: z.object({
        title: z.string().min(5, 'Título precisa ter 5 caracteres'),
        // 1. Adicione a validação para o description
        description: z.string().nullable(), // .nullable() torna o campo opcional
      }),
      response: {
        201: z.object({ courseId: z.string() }).describe('Curso criado com sucesso!') // Ajustado para z.string() se o ID for texto
      }
    },
  }, async (request, reply) => {
    // 2. Extraia o title E o description do corpo da requisição
    const { title, description } = request.body
  
    const result = await db
      .insert(courses)
      // 3. Passe ambos os valores para o banco de dados
      .values({ 
        title, 
        description 
      })
      .returning()
  
    return reply.status(201).send({ courseId: result[0].id })
  })
}