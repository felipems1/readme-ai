import Link from 'next/link'
import { ModeToggle } from './toggle-mode'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <header className="w-full">
      <div className="max-w-2xl mx-auto flex justify-between items-center py-5 px-5 md:px-0">
        <Link href="/" className="font-bold">
          Readme.Ai
        </Link>
        <ModeToggle />
      </div>
      <Separator />
    </header>
  )
}
