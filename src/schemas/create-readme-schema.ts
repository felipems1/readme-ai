import { z } from 'zod'

export const createReadmeSchema = z.object({
  projectName: z.string(),
  projectDescription: z.string(),
  technologies: z.string(),
  installation: z.string(),
  usage: z.string(),
  features: z.string(),
  license: z.string(),
  contact: z.string().optional(),
  contributing: z.string().optional(),
  configuration: z.string().optional(),
  test: z.string().optional(),
})

export type CreateReadmeType = z.infer<typeof createReadmeSchema>
