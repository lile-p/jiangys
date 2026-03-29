import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'

export const metadata = {
  title: 'JYS Planet',
  description: '姜云升主题站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header />
            <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
              {children}
            </main>
            <footer className="max-w-6xl mx-auto w-full px-4 py-10 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800 mt-10">
              本站为粉丝自建社区平台，与艺人及团队无直接关联。内容仅用于交流与学习。
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
