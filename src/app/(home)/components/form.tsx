'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useDataStore } from '@/store/data'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'

const schema = z.object({
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

export type formData = z.infer<typeof schema>

export function CreateReadmeForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<formData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const setMarkdown = useDataStore((state) => state.setMarkdown)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const onSubmit = async (data: formData) => {
    setLoading(true)

    const response = await fetch(`${apiUrl}/api/create-readme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      alert('Ocorreu um erro ao gerar o README. Tente novamente mais tarde.')
      setLoading(false)
    }

    const result = await response.json()

    setMarkdown(result.readme.content.parts[0].text)

    router.replace('/readme')
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do projeto *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ex: Task Manager"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do projeto *</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Este aplicativo permite aos usuários gerenciar suas tarefas diárias de forma eficiente."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tecnologias utilizadas *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ex: React, Node.js, Express"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="installation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passos para instalação *</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: 1. Clone o repositório 2. Execute 'npm install' para instalar as dependências."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como usar *</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Execute 'npm start' para rodar o projeto e acesse http://localhost:3000 no navegador."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funcionalidades *</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Cadastro de usuários, envio de emails, etc."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Licença *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue
                    placeholder={field.value || 'Selecione uma licença'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Licenças</SelectLabel>
                    <SelectItem value="MIT">MIT</SelectItem>
                    <SelectItem value="Apache-2.0">Apache 2.0</SelectItem>
                    <SelectItem value="GPL-3.0">GPL 3.0</SelectItem>
                    <SelectItem value="BSD-3">BSD 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações de contato (opcional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ex: seu-email@exemplo.com"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="configuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Configurações necessárias (se houver)</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Crie um arquivo .env com sua chave de API."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Testes automatizados (se houver)</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Execute 'npm test' para rodar os testes automatizados."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contributing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como contribuir (se for permitido)</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Ex: Faça um fork, crie uma branch e envie um pull request."
                  rows={4}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : 'Gerar README'}
        </Button>
      </form>
    </Form>
  )
}
