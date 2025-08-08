const fs = require('fs');
const path = require('path');
const pug = require('pug');

// 讀取簡報資料
const presentationData = JSON.parse(
  fs.readFileSync('./src/data/presentation.json', 'utf8')
);

// 編譯 PUG 模板
function compilePug() {
  try {
    // 讀取 PUG 模板
    const pugTemplate = fs.readFileSync('./src/templates/index.pug', 'utf8');

    // 編譯模板並注入資料
    const compiledHtml = pug.render(pugTemplate, {
      presentation: presentationData.presentation,
      slides: presentationData.presentation.slides,
      pretty: true,
    });

    // 確保 dist 目錄存在
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist', { recursive: true });
    }

    // 寫入編譯後的 HTML
    fs.writeFileSync('./dist/index.html', compiledHtml);
    console.log('✅ PUG 模板編譯完成');
  } catch (error) {
    console.error('❌ PUG 編譯錯誤:', error.message);
    process.exit(1);
  }
}

// 複製 JavaScript 檔案
function copyScripts() {
  try {
    if (!fs.existsSync('./dist/js')) {
      fs.mkdirSync('./dist/js', { recursive: true });
    }

    fs.copyFileSync('./src/scripts/script.js', './dist/js/script.js');
    console.log('✅ JavaScript 檔案複製完成');
  } catch (error) {
    console.error('❌ JavaScript 複製錯誤:', error.message);
    process.exit(1);
  }
}

// 主編譯流程
function build() {
  console.log('🚀 開始編譯專案...');

  compilePug();
  copyScripts();

  console.log('🎉 編譯完成！');
  console.log('📁 輸出目錄: ./dist/');
}

// 執行編譯
build();
