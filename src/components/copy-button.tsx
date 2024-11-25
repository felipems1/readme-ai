'use client'

import { useState } from 'react'

interface CopyButtonProps {
  markdown: string
}

export function CopyButton({ markdown }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {copied ? 'Copiado' : 'Copiar Markdown'}
    </button>
  )
}
