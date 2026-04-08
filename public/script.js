// 页面加载时更新时间
document.getElementById('updateTime').textContent = new Date().toLocaleString('zh-CN');

// 检查服务器健康状态
async function checkHealth() {
  const statusEl = document.getElementById('status');
  
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    
    if (data.status === 'ok') {
      statusEl.innerHTML = `
        <span class="ok">✅ 运行正常</span>
        <br><small>服务器时间：${new Date(data.timestamp).toLocaleString('zh-CN')}</small>
      `;
      statusEl.className = 'status ok';
    } else {
      throw new Error('状态异常');
    }
  } catch (error) {
    statusEl.innerHTML = `<span class="error">❌ 连接失败：${error.message}</span>`;
    statusEl.className = 'status error';
  }
}

// 页面加载时检查健康状态
checkHealth();

// 点击计数器
let clickCount = 0;
const clickBtn = document.getElementById('clickBtn');
const countEl = document.getElementById('count');

clickBtn.addEventListener('click', () => {
  clickCount++;
  countEl.textContent = clickCount;
  
  // 添加点击动画效果
  clickBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    clickBtn.style.transform = '';
  }, 100);
});

// 定时刷新健康状态（每 30 秒）
setInterval(checkHealth, 30000);

console.log('🎯 页面已加载，点击计数器已就绪');
