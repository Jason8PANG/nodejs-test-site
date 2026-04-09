# NodeJS 测试网页

一个简单的 NodeJS HTTP 服务器演示项目。

## 🚀 功能特性

- ✅ 原生 NodeJS HTTP 服务器（无需 Express 等框架）
- ✅ 静态文件服务
- ✅ API 端点 (`/api/health`)
- ✅ 路由处理
- ✅ 请求日志记录
- ✅ 响应式网页设计

## 📦 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Jason8PANG/nodejs-test-site
cd nodejs-test-site
```

### 2. 启动服务器

```bash
node server.js
```

### 3. 访问网页

打开浏览器访问：http://localhost:3000

### 4. 健康检查 API

```bash
curl http://localhost:3000/api/health
```

## 📁 项目结构

```
nodejs-test-site/
├── package.json          # 项目配置
├── server.js             # HTTP 服务器主文件
├── README.md             # 项目说明
├── .gitignore            # Git 忽略文件
└── public/               # 静态文件目录
    ├── index.html        # 主页面
    ├── style.css         # 样式文件
    └── script.js         # 前端脚本
```

## 🔧 配置

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| PORT | 3000 | 服务器端口，可通过环境变量修改 |

### 修改端口

```bash
PORT=8080 node server.js
```

## 📡 API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 主页面 |
| `/index.html` | GET | 主页面 |
| `/style.css` | GET | CSS 样式 |
| `/script.js` | GET | JavaScript |
| `/api/health` | GET | 健康检查 |

## 🛠️ 开发

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 🐳 Docker 部署

### 方式一：使用 Dockerfile

#### 1. 构建镜像

```bash
docker build -t nodejs-test-site .
```

#### 2. 运行容器（默认端口 3000）

```bash
docker run -d -p 3000:3000 --name nodejs-test-site nodejs-test-site
```

#### 3. 访问服务

```bash
# 本地访问
http://localhost:3000

# 健康检查
curl http://localhost:3000/api/health
```

---

### 方式二：使用 Docker Compose（推荐）

#### 1. 启动服务

```bash
docker-compose up -d
```

#### 2. 查看日志

```bash
docker-compose logs -f
```

#### 3. 停止服务

```bash
docker-compose down
```

---

### 🔧 修改端口

#### 方法 1：环境变量（推荐）

```bash
# 使用 8080 端口
docker run -d -p 8080:3000 -e PORT=3000 --name nodejs-test-site nodejs-test-site

# 或使用 docker-compose
HOST_PORT=8080 docker-compose up -d
```

#### 方法 2：修改 docker-compose.yml

```yaml
ports:
  - "8080:3000"  # 主机端口：容器端口
```

#### 方法 3：修改 .env 文件

创建 `.env` 文件：

```bash
# .env
HOST_PORT=8080
```

然后运行：

```bash
docker-compose up -d
```

---

### 📋 Docker 部署常见问题

| 问题 | 解决方案 |
|------|----------|
| 端口被占用 | 修改 `-p` 参数的主机端口，如 `-p 8080:3000` |
| 容器无法启动 | 检查日志 `docker logs nodejs-test-site` |
| 健康检查失败 | 确认容器内端口为 3000，检查防火墙 |
| 需要持久化 | 添加 `-v` 挂载卷，如 `-v ./logs:/app/logs` |

---

### 🚀 生产环境部署建议

```bash
# 1. 使用特定版本 NodeJS
FROM node:18-alpine  # 或 node:20-alpine

# 2. 设置生产环境
ENV NODE_ENV=production

# 3. 使用非 root 用户运行
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# 4. 添加健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:3000/api/health || exit 1
```

---

## 📄 许可证

MIT License

---

**Created with ❤️ using NodeJS**
