# 运维手册

## 环境变量
- ADMIN_TOKEN：后台管理 Token

## 部署
- 绑定 GitHub 仓库，Vercel 自动构建
- vercel.json 指定 Next 构建

## 回滚
- Vercel 控制台 → Deployments → 选择历史部署 → Promote

## 监控与告警
- Lighthouse ≥ 90：开启 Vercel Analytics，对比趋势
- 错误监控：接入 Sentry（推荐），DSN 通过环境变量配置
- 资源告警：设置 5xx 比例与响应时间阈值报警

## 内容持久化（生产）
- 新闻/留言/审计 → Vercel KV 或 Postgres
- 音频/封面 → 对象存储（Vercel Blob/S3/R2）