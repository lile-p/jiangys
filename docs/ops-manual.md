# 姜云升主题程序运维手册

## 项目概述
本项目是一个基于 Next.js 13 (App Router) 构建的说唱歌手姜云升主题展示站，包含首页、音乐播放器、时间轴、留言板及后台管理系统。

## 技术栈
- **Frontend**: Next.js 13, React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Audio Engine**: Howler.js
- **Testing**: Jest, React Testing Library
- **Styling**: Tailwind CSS (Dark Mode supported)

## 环境要求
- **Node.js**: v18.17.0 或更高版本
- **NPM**: v9.0.0 或更高版本

## 环境变量配置
在项目根目录创建 `.env.local` 文件并配置以下变量：
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_TOKEN=your_secret_admin_token
```
*注意：`ADMIN_TOKEN` 用于后台资讯发布及审计日志查看的权限校验。*

## 部署流程 (Vercel)
1. 将项目推送至 GitHub 仓库。
2. 在 Vercel 中导入该仓库。
3. 在 Vercel 项目设置中配置 `Environment Variables`：
   - `ADMIN_TOKEN`: 设置你的管理员口令。
   - `NEXT_PUBLIC_BASE_URL`: 设置为你的 Vercel 部署域名（如 `https://jys-planet.vercel.app`）。
4. 开启自动部署 (CI/CD)。

## CI/CD 配置
GitHub Actions 已配置在 `.github/workflows/ci.yml` 中，每次推送至 `main` 分支都会自动运行：
- 代码规范检查 (`npm run lint`)
- 类型检查 (`npx tsc --noEmit`)
- 单元测试及覆盖率报告 (`npm run test`)
- 项目构建 (`npm run build`)

## 回滚流程
若部署出现问题，可在 Vercel 控制台选择上一个成功的 `Deployment` 并点击 `Promote to Production` 进行快速回滚。

## 监控与告警
1. **性能监控**: 建议使用 Vercel Analytics 查看首屏加载时长及 Lighthouse 评分。
2. **错误监控**: 推荐接入 Sentry 进行前端及 API 报错实时监控。
3. **审计日志**: 管理员可在 `/admin` 页面查看所有敏感操作日志。

## 常见问题排查
- **音频无法播放**: 检查 `public/audio` 目录下资源是否存在，或检查 Howler.js 是否被浏览器拦截自动播放。
- **验证码不刷新**: 检查 `/api/comments` 路由是否正常工作。
- **样式未更新**: 尝试清除 Next.js 缓存目录 `.next` 并重启开发服务器。
