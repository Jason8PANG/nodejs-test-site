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

## 📄 许可证

MIT License

---

**Created with ❤️ using NodeJS**
