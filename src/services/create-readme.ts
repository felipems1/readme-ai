import { CreateReadmeType } from '../schemas/create-readme-schema'

export async function createReadme(data: CreateReadmeType): Promise<{
  success: boolean
  data?: string
  error?: string
}> {
  try {
    const response = await fetch('/api/create-readme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return {
        success: false,
        error: 'Falha ao gerar README',
      }
    }

    const result = await response.json()
    return {
      success: true,
      data: result.readme.content.parts[0].text,
    }
  } catch {
    return {
      success: false,
      error: 'Erro de conexão com o servidor',
    }
  }
}
