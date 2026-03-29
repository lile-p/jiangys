import CommentForm from '@/components/CommentForm'

export default function CommentsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">留言板</h1>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-2xl">
          分享你对姜云升音乐的感受，或者在这里留下你的故事。
          支持原创内容，共同营造温暖的社区氛围。
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <CommentForm />
      </div>
    </div>
  )
}
