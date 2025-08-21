import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses, enrollments } from '../database/schema.ts'
import z from 'zod'
import { ilike, asc, count } from 'drizzle-orm'
import { eq } from "drizzle-orm";

// Exporta a rota como um plugin assíncrono do Fastify com validação Zod
export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  // Registra a rota GET /courses
  server.get('/courses', {
   schema: {
      // Tag para documentação (ex: Swagger)
      tags: ['courses'],
      // Resumo da rota para documentação
      summary: 'Get all courses',
      // Define e valida os parâmetros de query string
      querystring: z.object({
        search: z.string().optional(), // Parâmetro opcional para busca textual
        orderBy: z.enum(['id', 'title']).optional().default('id'), // Ordenação opcional, padrão 'id'
        page: z.coerce.number().optional().default(1) // Página opcional, padrão 1
      }),
      // Define o formato da resposta esperada (status 200)
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),      // Cada curso tem um id UUID
              title: z.string(),  // E um título string
              enrollments: z.number() // Número de matrículas no curso
            })
          ),
          total: z.number() // Total de cursos encontrados
        })
      }
    }
  }, async (request, reply) => {
    // Extrai os parâmetros de busca e ordenação da query string
    const { search, orderBy, page } = request.query


    const [result, total] = await Promise.all([
      db
      .select({
        id: courses.id,
        title: courses.title,
        enrollments: count(enrollments.id), // Conta o número de matrículas para cada curso
      }) // Seleciona apenas id e title dos cursos
      .from(courses) // Da tabela 'courses'
      .leftJoin(enrollments, eq(enrollments.courseId, (courses.id))) // Junta com 'enrollments' para garantir que o curso tenha pelo menos uma matrícula
      .orderBy(asc(courses[orderBy])) // Ordena pelo campo escolhido (id ou title)
      .offset((page - 1) * 2) // Implementa pagina
      .limit(10) // Limita o número de resultados a 20
      .where(
        // Se houver parâmetro de busca, filtra pelo título usando ilike (case-insensitive)
        search ? ilike(courses.title, `%${search}%`) : undefined 
      )
      .groupBy(courses.id), // Agrupa os resultados pelo id do curso
      // Conta o total de cursos encontrados, aplicando o mesmo filtro de busca
      db.$count(courses, search ? ilike(courses.title, `%${search}%`) : undefined )
    ])

    // Retorna a lista de cursos encontrados no formato esperado
    return reply.send({ courses: result, total })
  })
}