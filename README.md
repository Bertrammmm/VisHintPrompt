# 学术论文网页定制指南

这是一个用于创建学术论文项目页面的模板。本指南将帮助你逐步定制这个网页，使其成为你论文的专属展示页面。

## 📋 目录

- [快速开始](#快速开始)
- [详细定制步骤](#详细定制步骤)
  - [1. 基础信息（Meta 标签）](#1-基础信息meta-标签)
  - [2. 页面标题和作者信息](#2-页面标题和作者信息)
  - [3. 论文链接](#3-论文链接)
  - [4. 视频内容](#4-视频内容)
  - [5. 摘要部分](#5-摘要部分)
  - [6. 图片轮播](#6-图片轮播)
  - [7. YouTube 视频](#7-youtube-视频)
  - [8. 视频轮播](#8-视频轮播)
  - [9. 论文海报](#9-论文海报)
  - [10. BibTeX 引用](#10-bibtex-引用)
  - [11. 更多作品下拉菜单](#11-更多作品下拉菜单)
- [文件结构说明](#文件结构说明)
- [图片和视频准备](#图片和视频准备)
- [常见问题](#常见问题)

---

## 快速开始

1. **克隆或下载**这个模板到你的本地
2. **打开 `index.html`** 文件
3. **查找所有 `TODO` 注释**，这些标记了需要替换的内容
4. **按照本指南逐步替换**各个部分的内容

---

## 详细定制步骤

### 1. 基础信息（Meta 标签）

在 `index.html` 文件的 `<head>` 部分（第 8-60 行），你需要替换以下内容：

#### 1.1 主要 Meta 标签（第 8-16 行）

```html
<!-- 替换这些占位符 -->
<meta name="title" content="你的论文标题 - 作者姓名">
<meta name="description" content="150-160字的论文描述，概括你的研究贡献和发现">
<meta name="keywords" content="关键词1, 关键词2, 关键词3, 机器学习, 计算机视觉">
<meta name="author" content="第一作者, 第二作者">
```

**操作说明：**
- `title`: 填写完整的论文标题
- `description`: 写一段吸引人的描述，用于搜索引擎和社交媒体分享
- `keywords`: 列出 5-10 个相关关键词，用逗号分隔
- `author`: 列出所有作者姓名

#### 1.2 Open Graph 标签（第 19-38 行）

用于 Facebook、LinkedIn 等社交媒体的分享预览：

```html
<meta property="og:site_name" content="你的机构或实验室名称">
<meta property="og:title" content="你的论文标题">
<meta property="og:description" content="论文描述（与上面相同）">
<meta property="og:url" content="https://你的域名.com/项目页面路径">
<meta property="og:image" content="https://你的域名.com/static/images/social_preview.png">
```

**操作说明：**
- 创建一张 **1200x630 像素**的预览图片，保存为 `static/images/social_preview.png`
- 替换 `YOUR_DOMAIN.com` 为你的实际网站域名
- 如果还没有网站，可以先保留占位符，稍后更新

#### 1.3 Twitter 标签（第 40-52 行）

```html
<meta name="twitter:site" content="@你的实验室推特账号">
<meta name="twitter:creator" content="@第一作者推特账号">
```

**操作说明：**
- 如果有 Twitter 账号，替换为实际账号（格式：`@username`）
- 如果没有，可以删除这些行或留空

#### 1.4 学术引用标签（第 54-60 行）

```html
<meta name="citation_title" content="论文标题">
<meta name="citation_author" content="第一作者姓, 第一作者名">
<meta name="citation_author" content="第二作者姓, 第二作者名">
<meta name="citation_publication_date" content="2024">
<meta name="citation_conference_title" content="会议或期刊名称">
<meta name="citation_pdf_url" content="https://你的域名.com/static/pdfs/paper.pdf">
```

**操作说明：**
- 按照格式填写作者信息（姓在前，名在后）
- 更新发表年份和会议/期刊名称
- 确保论文 PDF 文件放在 `static/pdfs/paper.pdf`

#### 1.5 结构化数据（第 113-179 行）

这部分用于搜索引擎更好地理解你的论文。需要更新：

- `headline`: 论文标题
- `description`: 论文描述
- `author`: 作者信息（包括姓名和机构）
- `datePublished`: 发表日期（格式：YYYY-MM-DD）
- `publisher`: 会议或期刊名称
- `url`: 网页 URL
- `image`: 预览图片 URL
- `keywords`: 关键词数组
- `abstract`: 完整摘要文本
- `citation`: BibTeX 引用格式

---

### 2. 页面标题和作者信息

#### 2.1 浏览器标题（第 77 行）

```html
<title>你的论文标题 - 作者姓名 | 学术研究</title>
```

#### 2.2 主标题和作者（第 243-261 行）

```html
<h1 class="title is-1 publication-title">你的论文标题</h1>
```

**作者信息部分：**

```html
<span class="author-block">
  <a href="第一作者个人主页链接" target="_blank">第一作者姓名</a><sup>*</sup>,
</span>
<span class="author-block">
  <a href="第二作者个人主页链接" target="_blank">第二作者姓名</a><sup>*</sup>,
</span>
```

**操作说明：**
- 替换作者姓名为实际姓名
- 添加作者的个人主页链接（可以是个人网站、Google Scholar、机构主页等）
- 如果有共同第一作者，保留 `<sup>*</sup>` 标记
- 如果没有共同第一作者，删除 `<sup>*</sup>` 和下面的 "Equal Contribution" 说明

**机构信息：**

```html
<span class="author-block">你的机构名称<br>会议名称和年份</span>
```

**操作说明：**
- 第一行：填写机构名称
- 第二行：填写会议/期刊名称和年份（例如：CVPR 2024）

---

### 3. 论文链接

在第 264-308 行，有多个链接按钮需要更新：

#### 3.1 论文 PDF 链接

```html
<a href="https://arxiv.org/pdf/你的arXiv论文ID.pdf" target="_blank">
```

**操作说明：**
- 如果论文已上传到 arXiv，替换 `<ARXIV PAPER ID>` 为实际的 arXiv ID（例如：`2301.12345`）
- 如果论文在其他地方，替换整个 URL

#### 3.2 补充材料链接（可选）

```html
<a href="static/pdfs/supplementary_material.pdf" target="_blank">
```

**操作说明：**
- 如果有补充材料，将 PDF 文件放在 `static/pdfs/supplementary_material.pdf`
- 如果没有补充材料，删除整个 `<span class="link-block">...</span>` 块（第 276-285 行）

#### 3.3 GitHub 代码链接

```html
<a href="https://github.com/你的GitHub用户名/仓库名" target="_blank">
```

**操作说明：**
- 如果有代码仓库，替换为实际的 GitHub 链接
- 如果没有代码，可以删除这个链接块（第 287-296 行）

#### 3.4 arXiv 链接

```html
<a href="https://arxiv.org/abs/你的arXiv论文ID" target="_blank">
```

**操作说明：**
- 替换 `<ARXIV PAPER ID>` 为实际的 arXiv ID

---

### 4. 视频内容

#### 4.1 顶部宣传视频（第 317-333 行）

```html
<video poster="" id="tree" autoplay controls muted loop height="100%">
  <source src="static/videos/banner_video.mp4" type="video/mp4">
</video>
```

**操作说明：**
- 将你的宣传视频文件放在 `static/videos/banner_video.mp4`
- 如果需要视频封面图，在 `poster=""` 中添加图片路径（例如：`poster="static/images/banner_poster.jpg"`）
- 更新视频下方的描述文字（第 327-329 行）

**视频建议：**
- 格式：MP4
- 分辨率：1920x1080 或更高
- 时长：30-60 秒
- 文件大小：尽量压缩，建议小于 10MB

---

### 5. 摘要部分

在第 336-350 行，替换摘要内容：

```html
<p>
  在这里粘贴你的论文摘要全文。
  摘要应该清楚地说明研究问题、方法、主要贡献和结果。
</p>
```

**操作说明：**
- 直接替换 `<p>` 标签内的文本
- 保持段落格式，可以使用多个 `<p>` 标签分段

---

### 6. 图片轮播

在第 354-392 行，有一个图片轮播组件。默认有 4 张图片，你可以：

#### 6.1 替换现有图片

```html
<div class="item">
  <img src="static/images/carousel1.jpg" alt="第一张结果图片描述" loading="lazy"/>
  <h2 class="subtitle has-text-centered">
    第一张图片的说明文字。
  </h2>
</div>
```

**操作说明：**
- 替换 `src` 中的图片路径为你的图片
- 更新 `alt` 属性（用于无障碍访问）
- 更新图片下方的说明文字

#### 6.2 添加或删除图片

- **添加图片**：复制一个 `<div class="item">...</div>` 块，修改图片路径和描述
- **删除图片**：删除不需要的 `<div class="item">...</div>` 块

**图片建议：**
- 格式：JPG 或 PNG
- 分辨率：建议 1920x1080 或更高
- 文件大小：使用 [TinyPNG](https://tinypng.com) 压缩，建议每张小于 500KB

---

### 7. YouTube 视频

在第 397-415 行，可以嵌入 YouTube 视频：

```html
<iframe src="https://www.youtube.com/embed/你的YouTube视频ID" frameborder="0"></iframe>
```

**操作说明：**
- 将你的视频上传到 YouTube
- 获取视频 ID（URL 中 `v=` 后面的部分，例如：`JkaxUblCGz0`）
- 替换 `JkaxUblCGz0` 为你的视频 ID

**如何获取 YouTube 视频 ID：**
- 视频 URL：`https://www.youtube.com/watch?v=JkaxUblCGz0`
- 视频 ID 就是 `JkaxUblCGz0`

---

### 8. 视频轮播

在第 418-449 行，有一个视频轮播组件。默认有 3 个视频：

```html
<div class="item item-video1">
  <video poster="" id="video1" controls muted loop>
    <source src="static/videos/carousel1.mp4" type="video/mp4">
  </video>
</div>
```

**操作说明：**
- 将视频文件放在 `static/videos/` 目录下
- 替换 `src` 中的视频路径
- 可选：添加 `poster` 属性设置视频封面图
- 更新视频 ID（`video1`, `video2`, `video3`）确保唯一

**如果没有视频轮播：**
- 可以删除整个 `<section>` 块（第 418-449 行）

---

### 9. 论文海报

在第 456-469 行，可以嵌入 PDF 海报：

```html
<iframe src="static/pdfs/sample.pdf" width="100%" height="550"></iframe>
```

**操作说明：**
- 将你的海报 PDF 文件放在 `static/pdfs/` 目录下
- 替换 `sample.pdf` 为你的实际文件名
- 调整 `height` 值以适应你的海报尺寸

**如果没有海报：**
- 可以删除整个 `<section>` 块（第 456-469 行）

---

### 10. BibTeX 引用

在第 473-491 行，更新 BibTeX 引用：

```html
<pre id="bibtex-code"><code>@article{你的论文关键词2024,
  title={你的论文标题},
  author={第一作者 and 第二作者 and 第三作者},
  journal={会议或期刊名称},
  year={2024},
  url={https://你的域名.com/项目页面}
}</code></pre>
```

**操作说明：**
- 替换为你的实际 BibTeX 格式
- 确保格式正确（注意逗号、大括号等）
- 可以复制你论文的完整 BibTeX 引用

**BibTeX 格式示例：**

```bibtex
@inproceedings{yourpaper2024,
  title={Your Paper Title},
  author={Author1, First and Author2, Second and Author3, Third},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  year={2024}
}
```

---

### 11. 更多作品下拉菜单

在第 189-235 行，有一个"More Works"下拉菜单，展示实验室的其他工作：

```html
<a href="https://arxiv.org/abs/论文ID" class="work-item" target="_blank">
  <div class="work-info">
    <h5>论文标题</h5>
    <p>论文的简要描述和主要贡献。</p>
    <span class="work-venue">会议/期刊 2024</span>
  </div>
  <i class="fas fa-external-link-alt"></i>
</a>
```

**操作说明：**
- 替换每个 `<a>` 块中的内容：
  - `href`: 论文链接（arXiv、项目页面等）
  - `<h5>`: 论文标题
  - `<p>`: 简要描述
  - `<span class="work-venue">`: 发表会议/期刊和年份
- 添加更多相关作品：复制整个 `<a>` 块
- 删除不需要的作品：删除对应的 `<a>` 块

**如果不需要这个功能：**
- 可以删除整个 `<div class="more-works-container">...</div>` 块（第 189-235 行）

---

## 文件结构说明

```
VisHintPrompt/
├── index.html              # 主 HTML 文件（需要编辑）
├── README.md              # 本指南文件
└── static/
    ├── css/               # 样式文件（通常不需要修改）
    │   ├── bulma.min.css
    │   ├── index.css
    │   └── ...
    ├── images/            # 图片文件（需要添加你的图片）
    │   ├── favicon.ico    # 网站图标（必须替换）
    │   ├── carousel1.jpg  # 轮播图片
    │   ├── carousel2.jpg
    │   └── social_preview.png  # 社交媒体预览图（需要创建）
    ├── js/                # JavaScript 文件（通常不需要修改）
    ├── pdfs/              # PDF 文件（需要添加你的 PDF）
    │   ├── paper.pdf      # 论文 PDF
    │   └── sample.pdf     # 海报 PDF（可选）
    └── videos/            # 视频文件（需要添加你的视频）
        ├── banner_video.mp4
        └── carousel1.mp4
```

---

## 图片和视频准备

### 必须准备的文件

1. **favicon.ico**（网站图标）
   - 位置：`static/images/favicon.ico`
   - 尺寸：32x32 或 64x64 像素
   - 格式：ICO 或 PNG

2. **social_preview.png**（社交媒体预览图）
   - 位置：`static/images/social_preview.png`
   - 尺寸：**1200x630 像素**（重要！）
   - 内容：包含论文标题、主要结果图、机构 logo 等

3. **论文 PDF**
   - 位置：`static/pdfs/paper.pdf`
   - 确保文件大小合理（建议小于 10MB）

### 可选文件

- 宣传视频：`static/videos/banner_video.mp4`
- 轮播图片：`static/images/carousel1.jpg`, `carousel2.jpg` 等
- 轮播视频：`static/videos/carousel1.mp4` 等
- 海报 PDF：`static/pdfs/sample.pdf`
- 补充材料：`static/pdfs/supplementary_material.pdf`

### 文件优化建议

- **图片压缩**：使用 [TinyPNG](https://tinypng.com) 压缩图片
- **视频压缩**：使用 HandBrake 或类似工具压缩视频
- **PDF 优化**：使用 Adobe Acrobat 或其他工具优化 PDF 文件大小

---

## 常见问题

### Q1: 如何测试网页？

**A:** 
1. 直接在浏览器中打开 `index.html` 文件
2. 或者使用本地服务器：
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - 然后访问 `http://localhost:8000`

### Q2: 如何部署到 GitHub Pages？

**A:**
1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为源
4. 访问 `https://你的用户名.github.io/仓库名/`

### Q3: 某些部分不需要，如何删除？

**A:** 
- 找到对应的 `<section>` 标签
- 删除从 `<section class="...">` 到 `</section>` 之间的所有内容
- 例如：删除视频轮播部分，删除第 418-449 行

### Q4: 如何修改颜色和样式？

**A:**
- 编辑 `static/css/index.css` 文件
- 查找对应的 CSS 类名
- 修改颜色、字体、间距等属性

### Q5: 视频太大怎么办？

**A:**
- 使用 YouTube：将视频上传到 YouTube，然后使用嵌入代码（见第 7 节）
- 压缩视频：使用 HandBrake 等工具压缩
- 降低分辨率：如果不需要高清，可以降低分辨率

### Q6: 如何添加更多作者？

**A:**
- 在作者信息部分（第 246-253 行）添加新的 `<span class="author-block">` 块
- 在 Meta 标签中添加新的 `citation_author` 标签
- 在结构化数据中添加新的作者对象

### Q7: 如何更改网站语言？

**A:**
- 修改 `<html lang="en">` 为 `<html lang="zh-CN">`（中文）
- 更新所有文本内容为对应语言

### Q8: 如何添加更多链接按钮？

**A:**
- 复制现有的 `<span class="link-block">...</span>` 块
- 修改链接地址和图标
- 可用的图标类：`fa-file-pdf`, `fab fa-github`, `ai ai-arxiv` 等

---

## 完成检查清单

定制完成后，请检查以下项目：

- [ ] 所有 `TODO` 注释都已处理
- [ ] 论文标题和作者信息已更新
- [ ] 所有链接（arXiv、GitHub 等）都已更新
- [ ] favicon.ico 已替换
- [ ] social_preview.png 已创建（1200x630 像素）
- [ ] 论文 PDF 已放置在正确位置
- [ ] 摘要内容已更新
- [ ] 图片和视频已替换或删除不需要的部分
- [ ] BibTeX 引用已更新
- [ ] Meta 标签中的 URL 已更新（如果有域名）
- [ ] 在浏览器中测试所有功能
- [ ] 检查移动端显示效果

---

## 获取帮助

如果遇到问题：

1. 检查浏览器控制台是否有错误（按 F12）
2. 确保所有文件路径正确
3. 确保图片和视频文件格式正确
4. 参考示例项目页面（见原 README）

---

## 许可证

本模板基于 [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/) 许可。

---

**祝你定制顺利！** 🎉
