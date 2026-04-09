const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

// 简单的内存用户存储
const users = [
    { username: 'admin', password: 'admin123', name: '管理员' }
];

// 简单的 token 存储
const tokens = new Map();

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // 路由处理
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    serveFile(res, filePath, 'text/html');
  } else if (req.url === '/login.html') {
    const filePath = path.join(__dirname, 'public', 'login.html');
    serveFile(res, filePath, 'text/html');
  } else if (req.url === '/dashboard.html') {
    const filePath = path.join(__dirname, 'public', 'dashboard.html');
    serveFile(res, filePath, 'text/html');
  } else if (req.url === '/style.css') {
    const filePath = path.join(__dirname, 'public', 'style.css');
    serveFile(res, filePath, 'text/css');
  } else if (req.url === '/script.js') {
    const filePath = path.join(__dirname, 'public', 'script.js');
    serveFile(res, filePath, 'application/javascript');
  } else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
  } else if (req.url === '/api/login' && req.method === 'POST') {
    // 登录 API
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          // 生成 token
          const token = crypto.randomBytes(32).toString('hex');
          tokens.set(token, { username: user.username, name: user.name, loginTime: new Date() });
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            token, 
            user: { username: user.username, name: user.name }
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '用户名或密码错误' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '无效的请求格式' }));
      }
    });
  } else if (req.url === '/api/logout' && req.method === 'POST') {
    // 登出 API
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.replace('Bearer ', '');
    
    if (token && tokens.has(token)) {
      tokens.delete(token);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: '未登录' }));
    }
  } else if (req.url === '/api/me' && req.method === 'GET') {
    // 获取当前用户信息
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.replace('Bearer ', '');
    
    if (token && tokens.has(token)) {
      const user = tokens.get(token);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: '未登录' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查：http://localhost:${PORT}/api/health`);
});
