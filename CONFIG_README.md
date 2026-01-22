# 网站配置信息库使用说明

## 概述

所有外链、版本信息等统一管理在 `static/js/config.js` 文件中。修改此文件后，相关信息会自动同步到页面。

## 配置文件位置

```
static/js/config.js
```

## 主要配置项

### 1. 版本信息
```javascript
version: "2.2"  // 修改这里会自动更新footer中的版本号
```

### 2. 域名和基础URL
```javascript
domain: {
  main: "https://YOUR_DOMAIN.com",  // 网站主域名
  projectPage: "/YOUR_PROJECT_PAGE",  // 项目页面路径
}
```

### 3. 论文相关链接
```javascript
paper: {
  arxivPdf: "https://arxiv.org/pdf/<ARXIV PAPER ID>.pdf",
  arxivAbs: "https://arxiv.org/abs/<ARXIV PAPER ID>",
  pdfLocal: "static/pdfs/paper.pdf",
  supplementaryPdf: "static/pdfs/supplementary_material.pdf",
  posterPdf: "static/pdfs/sample.pdf"
}
```

### 4. 代码和数据仓库
```javascript
repositories: {
  github: "https://github.com/YOUR REPO HERE",
  dataset: "https://github.com/tu4nzii/VisHintPrompt_datasets"
}
```

### 5. 视频链接
```javascript
videos: {
  youtubeId: "JkaxUblCGz0",  // 只需修改视频ID
}
```

### 6. 作者个人主页
```javascript
authors: {
  yongWang: "http://yong-wang.org"
  // 可以添加其他作者的主页
}
```

### 7. 社交媒体
```javascript
social: {
  twitterSite: "@YOUR_TWITTER_HANDLE",
  twitterCreator: "@AUTHOR_TWITTER_HANDLE"
}
```

### 8. 相关论文链接（More Works部分）
```javascript
relatedWorks: {
  work1: {
    title: "Paper Title 1",
    description: "Brief description...",
    venue: "Conference/Journal 2025",
    link: "https://arxiv.org/abs/PAPER_ID_1"
  },
  // work2, work3...
}
```

### 9. 外部资源CDN
```javascript
cdn: {
  // 各种CDN链接，通常不需要修改
  googleFonts: "https://fonts.googleapis.com",
  // ...
}
```

## 使用方法

### 更新版本号
1. 打开 `static/js/config.js`
2. 找到 `version: "2.2"`
3. 修改为你想要的版本号，如 `"2.3"`
4. 保存文件，刷新页面即可看到更新

### 更新论文链接
1. 打开 `static/js/config.js`
2. 找到 `paper` 部分
3. 修改对应的链接
4. 保存文件，刷新页面

### 更新GitHub仓库
1. 打开 `static/js/config.js`
2. 找到 `repositories.github`
3. 修改为你的仓库地址
4. 保存文件，刷新页面

### 更新YouTube视频
1. 打开 `static/js/config.js`
2. 找到 `videos.youtubeId`
3. 修改为你的视频ID（只需ID，不需要完整URL）
4. 保存文件，刷新页面

### 更新相关论文
1. 打开 `static/js/config.js`
2. 找到 `relatedWorks` 部分
3. 修改对应论文的 `title`、`description`、`venue`、`link`
4. 保存文件，刷新页面

## 注意事项

1. **修改后需要刷新页面**：配置文件的更改需要刷新浏览器页面才能生效
2. **保持格式一致**：修改时请保持JSON格式正确，注意逗号和引号
3. **链接格式**：确保链接格式正确，包含 `http://` 或 `https://`
4. **中文注释**：配置文件中的中文注释说明了每个配置项的用途

## 自动同步机制

页面加载时会自动执行 `updateLinksFromConfig()` 函数，该函数会：
- 更新所有Meta标签中的URL
- 更新JSON-LD结构化数据
- 更新页面中的所有链接
- 更新版本号显示
- 更新相关论文信息

## 常见问题

### Q: 修改配置文件后页面没有更新？
A: 请确保：
1. 文件已保存
2. 浏览器已刷新（建议使用 Ctrl+F5 强制刷新）
3. 浏览器控制台没有JavaScript错误

### Q: 如何添加新的作者主页？
A: 在 `authors` 对象中添加新项：
```javascript
authors: {
  yongWang: "http://yong-wang.org",
  newAuthor: "https://new-author-homepage.com"  // 添加新作者
}
```
然后在HTML中对应的链接添加 `data-config="authors.newAuthor"` 属性（需要手动修改HTML）

### Q: 如何添加更多相关论文？
A: 在 `relatedWorks` 对象中添加新项：
```javascript
relatedWorks: {
  work1: { ... },
  work2: { ... },
  work3: { ... },
  work4: {  // 添加新论文
    title: "New Paper Title",
    description: "Description",
    venue: "Conference 2025",
    link: "https://arxiv.org/abs/NEW_ID"
  }
}
```
然后在HTML中添加对应的 `<a>` 元素（需要手动修改HTML）

## 文件结构

```
VisHintPrompt/
├── static/
│   └── js/
│       ├── config.js      # 配置文件（修改这里）
│       └── index.js        # 自动更新函数
├── index.html             # 主页面
└── CONFIG_README.md       # 本说明文件
```

## 技术支持

如有问题，请检查：
1. 浏览器控制台的错误信息
2. 配置文件格式是否正确
3. 链接是否可访问
