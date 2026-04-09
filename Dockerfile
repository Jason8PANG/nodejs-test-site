# NodeJS 测试网页 - Docker 镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package.json ./

# 安装依赖（本项目无外部依赖，但保留此步骤以便扩展）
RUN npm ci --only=production 2>/dev/null || true

# 复制项目文件
COPY server.js ./
COPY public/ ./public/

# 暴露默认端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]
