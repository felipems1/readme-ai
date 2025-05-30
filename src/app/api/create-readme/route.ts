import { createReadmeSchema } from '@/schemas/create-readme-schema'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = createReadmeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos ou incompletos.',
          issues: parsed.error.format(),
        },
        { status: 400 },
      )
    }

    const data = parsed.data
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const readmePrompt = `
      Crie um arquivo README.md para o seguinte projeto, utilizando o formato Markdown:

      Nome do Projeto: ${data.projectName}
      Descrição: ${data.projectDescription}
      Tecnologias Utilizadas: ${data.technologies}
      Passos para Instalação: ${data.installation}
      Como Usar: ${data.usage}
      Funcionalidades Principais: ${data.features}
      Licença: ${data.license}
      Contato: ${data.contact}
      Contribuindo: ${data.contributing}
      Configurações Necessárias: ${data.configuration}
      Testes Automatizados: ${data.test}

      Instruções:
      1. Estruture o conteúdo no formato de um README padrão.
      2. Inclua as seguintes seções **apenas se as informações forem fornecidas**:
          - **Descrição**: Explique brevemente sobre o projeto.
          - **Tecnologias Utilizadas**: Liste as tecnologias ou frameworks usados.
          - **Passos para Instalação**: Explique como instalar e configurar o projeto.
          - **Como Usar**: Dê instruções claras de uso do projeto.
          - **Funcionalidades Principais**: Liste as principais funcionalidades do projeto.
          - **Exemplo de Uso**: Forneça exemplos de comandos ou funcionalidades em ação.
          - **Licença**: Informações sobre a licença do projeto.
          - **Contribuindo**: Explique como outros desenvolvedores podem contribuir.
          - **Contato**: Dados para contato com os desenvolvedores.
          - **Testes Automatizados**: Explique como rodar testes, se houver.
      3. **Campos vazios devem ser ignorados**: Se uma informação não for fornecida, **não inclua uma seção para ela no README**.
      4. Formate o texto corretamente em Markdown (com títulos, listas, links, etc.).
      5. Evite placeholders genéricos, como "Adicione informações aqui". Utilize exemplos reais, se possível.

      Output esperado: O conteúdo gerado deve ser completamente formatado em Markdown, pronto para uso em um arquivo README.md.
      `.trim()

    const response = await model.generateContent(readmePrompt)

    const generatedReadme =
      response.response.candidates?.[0] || 'README.md não foi gerado.'
    return NextResponse.json({ readme: generatedReadme })
  } catch (error) {
    console.error('Erro ao gerar README:', error)

    return NextResponse.json(
      {
        error: 'Erro interno ao gerar o README.',
      },
      { status: 500 },
    )
  }
}
