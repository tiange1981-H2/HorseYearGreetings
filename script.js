const greetings = [
    "马到成功，绿氢助力！",
    "龙马精神，净零未来！",
    "策马扬鞭，合成绿色新篇！",
    "马年大吉，绿电氢春！",
    "骏马奔腾，能源焕新！",
    "金马迎春，碳中和先行！",
    "一马当先，氢装上阵！",
    "万马奔腾，绿能无限！",
    "春风得意马蹄疾，绿色发展日日新！",
    "马踏祥云，氢启未来！"
];

'assets/bg_methane.svg',
    'assets/bg_methanol.svg',
    'assets/bg_liquid.svg',
    'assets/bg_h2power.svg'
];

document.getElementById('generateBtn').addEventListener('click', generateGreeting);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

function generateGreeting() {
    const name = document.getElementById('username').value.trim();
    if (!name) {
        alert("请输入您的名字！");
        return;
    }

    // UI State
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultArea').style.display = 'none';

    // Random Selection
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const bgSrc = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // IMPORTANT: Enable CORS to allow reading image data for canvas export
    img.crossOrigin = "Anonymous";

    img.onload = function () {
        try {
            // Draw Background
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Text Config
            ctx.textAlign = 'center';

            // --- Draw Name ---
            ctx.fillStyle = 'white';
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.font = 'bold 80px "Microsoft YaHei", "SimHei", sans-serif';
            // Position: Top 1/3
            ctx.fillText("祝 " + name, canvas.width / 2, 400);

            // --- Draw Greeting ---
            ctx.font = 'bold 60px "Microsoft YaHei", "SimHei", sans-serif';
            ctx.fillStyle = '#FFD700'; // Gold
            // Metrics for multi-line if needed, but keeping simple for now
            ctx.fillText(greeting, canvas.width / 2, 520);

            // --- Draw Brand ---
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '30px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText("电氢燃料化学品", canvas.width - 40, canvas.height - 40);

            // Output
            try {
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                document.getElementById('resultImage').src = dataUrl;
                document.getElementById('resultImage').style.display = 'block';
                document.getElementById('canvas').style.display = 'none'; // Hide canvas if image works
            } catch (e) {
                console.warn("Canvas export failed (likely due to CORS), showing canvas instead.", e);
                // Fallback: Show Canvas directly if CORS fails specifically at toDataURL step
                document.getElementById('resultImage').style.display = 'none';
                const canvasEl = document.getElementById('canvas');
                canvasEl.style.display = 'block';
                canvasEl.style.width = '100%';
                canvasEl.style.height = 'auto';

                const resultArea = document.getElementById('resultArea');
                if (!resultArea.contains(canvasEl)) {
                    resultArea.insertBefore(canvasEl, resultArea.firstChild);
                }
                alert("提示：由于图片跨域限制，请直接长按图片保存。");
            }

            // UI Update
            document.getElementById('loading').style.display = 'none';
            document.getElementById('resultArea').style.display = 'block';
        } catch (err) {
            console.error(err);
            alert("生成图片时发生错误：" + err.message);
            document.getElementById('loading').style.display = 'none';
        }
    };

    img.onerror = function () {
        alert("背景图片加载失败，请重试");
        document.getElementById('loading').style.display = 'none';
    };

    img.src = bgSrc;
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = '马年祝福.jpg';

    // Check if showing image or canvas
    const imgEl = document.getElementById('resultImage');
    if (imgEl.style.display !== 'none') {
        link.href = imgEl.src;
    } else {
        // Canvas fallback
        link.href = document.getElementById('canvas').toDataURL('image/jpeg', 0.9);
    }

    link.click();
}
