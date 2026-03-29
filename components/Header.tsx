'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/music', label: '音乐作品' },
  { href: '/timeline', label: '个人故事' },
  { href: '/comments', label: '留言板' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand">
          JYS <span className="text-gray-400 font-normal">PLANET</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-brand',
                pathname === link.href ? 'text-brand' : 'text-gray-500'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/admin"
            className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            后台管理
          </Link>
        </div>
      </div>
    </header>
  )
}
