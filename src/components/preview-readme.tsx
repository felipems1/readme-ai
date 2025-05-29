'use client'

import { CopyButton } from '@/components/copy-button'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'github-markdown-css/github-markdown.css'
import { useDataStore } from '@/store/data'
import { redirect } from 'next/navigation'

export function PreviewReadme() {
  const markdown = useDataStore((state) => state.markdown)

  if (markdown === '') {
    return redirect('/')
  }

  return (
    <>
      <div className="flex justify-between pb-10 items-center">
        <h2>Preview Readme</h2>
        <CopyButton markdown={markdown} />
      </div>

      <div className="mt-4 p-5 lg:p-10 rounded shadow-lg markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </>
  )
}
