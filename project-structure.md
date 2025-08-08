# 專案開發偏好設定

## 技術棧偏好

- **模板引擎**: PUG (Jade)
- **CSS 預處理器**: STYLUS
- **資料結構**: 現代化資料結構
- **編譯工具**: 預編譯流程

## 專案結構標準

```
project/
├── src/
│   ├── templates/     # PUG 模板檔案
│   ├── styles/        # STYLUS 樣式檔案
│   ├── scripts/       # JavaScript 檔案
│   └── data/          # 資料檔案 (JSON/YAML)
├── dist/              # 編譯後檔案
├── package.json       # 專案配置
└── README.md          # 專案說明
```

## 編譯指令

```bash
# 編譯 PUG 模板
pug src/templates/*.pug -o dist/

# 編譯 STYLUS 樣式
stylus src/styles/*.styl -o dist/css/

# 完整編譯
npm run build
```

## 開發偏好

- 使用 PUG 進行模板編寫
- 使用 STYLUS 進行樣式編寫
- 採用現代化資料結構
- 所有專案都需要預編譯流程
