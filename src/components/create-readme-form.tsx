'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  createReadmeSchema,
  CreateReadmeType,
} from '@/schemas/create-readme-schema'
import { useDataStore } from '@/store/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createReadme } from '../services/create-readme'

export function CreateReadmeForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<CreateReadmeType>({
    resolver: zodResolver(createReadmeSchema),
  })

  const router = useRouter()

  const setMarkdown = useDataStore((state) => state.setMarkdown)

  const onSubmit = async (data: CreateReadmeType) => {
    setLoading(true)

    const result = await createReadme(data)

    if (!result.success) {
      toast.error(
        'Ocorreu um erro ao gerar o README. Tente novamente mais tarde.',
      )
      setLoading(false)
      return
    }

    setMarkdown(result.data!)
    router.replace('/readme')
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
