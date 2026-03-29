import AdminForm from '@/components/AdminForm'
import AuditLogList from '@/components/AuditLogList'

export default function AdminPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">后台管理</h1>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-2xl">
          管理站点内容、查看系统审计日志。
          请妥善保管管理员口令。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full">
        <div className="space-y-10">
          <AdminForm />
        </div>
        <div className="space-y-10">
          <AuditLogList />
        </div>
      </div>
    </div>
  )
}
