// 提交网址表单的处理逻辑
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    
    try {
        const response = await fetch('https://wailian-2p3.pages.dev/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const result = await response.json();
        document.getElementById('response').textContent = result.message;

        // 提交成功后，刷新网址列表
        fetchUrls();
    } catch (error) {
        console.error('提交失败', error);
    }
});

// 获取已收录的网址列表
async function fetchUrls() {
    try {
        const response = await fetch('https://wailian-2p3.pages.dev/urls');
        const urls = await response.json();
        
        const urlList = document.getElementById('url-list');
        urlList.innerHTML = '';  // 清空当前列表
        urls.forEach(url => {
            const li = document.createElement('li');
            li.textContent = url;
            urlList.appendChild(li);
        });
    } catch (error) {
        console.error('获取网址列表失败', error);
    }
}

// 页面加载时获取网址列表
window.onload = fetchUrls;
