/**
 * 网站配置信息库
 * 所有外链、版本信息等统一管理
 * 修改此文件后，相关信息会自动同步到页面
 */

const SITE_CONFIG = {
  // ========== 版本信息 ==========
  version: "2.4",  // 页面版本号，会显示在footer底部

  // ========== 域名和基础URL ==========
  domain: {
    // 网站主域名（用于SEO和社交媒体预览）
    main: "https://YOUR_DOMAIN.com",
    // 项目页面路径
    projectPage: "/YOUR_PROJECT_PAGE",
    // 完整项目URL
    get fullUrl() {
      return this.main + this.projectPage;
    }
  },

  // ========== 论文相关链接 ==========
  paper: {
    // ArXiv论文链接（PDF版本）
    arxivPdf: "https://arxiv.org/pdf/<ARXIV PAPER ID>.pdf",
    // ArXiv论文链接（摘要页面）
    arxivAbs: "https://arxiv.org/abs/<ARXIV PAPER ID>",
    // 论文PDF本地路径
    pdfLocal: "static/pdfs/paper.pdf",
    // 补充材料PDF路径
    supplementaryPdf: "static/pdfs/supplementary_material.pdf",
    // 论文海报PDF路径
    posterPdf: "static/pdfs/sample.pdf"
  },

  // ========== 代码和数据仓库 ==========
  repositories: {
    // GitHub代码仓库
    github: "https://github.com/YOUR REPO HERE",
    // 数据集仓库
    dataset: "https://github.com/tu4nzii/VisHintPrompt_datasets"
  },

  // ========== 视频链接 ==========
  videos: {
    // YouTube视频ID（用于嵌入）
    youtubeId: "JkaxUblCGz0",
    // YouTube完整URL
    get youtubeUrl() {
      return `https://www.youtube.com/embed/${this.youtubeId}`;
    },
    // 本地视频文件路径
    banner: "static/videos/banner_video.mp4",
    carousel1: "static/videos/carousel1.mp4",
    carousel2: "static/videos/carousel2.mp4",
    carousel3: "static/videos/carousel3.mp4"
  },

  // ========== 作者个人主页 ==========
  authors: {
    yongWang: "http://yong-wang.org"
    // 可以在这里添加其他作者的个人主页
    // authorName: "https://author-homepage.com"
  },

  // ========== 社交媒体 ==========
  social: {
    // Twitter账号（实验室/机构）
    twitterSite: "@YOUR_TWITTER_HANDLE",
    // Twitter账号（第一作者）
    twitterCreator: "@AUTHOR_TWITTER_HANDLE"
  },

  // ========== 相关论文链接（More Works部分）==========
  relatedWorks: {
    work1: {
      title: "Paper Title 1",
      description: "Brief description of the work and its main contribution.",
      venue: "Conference/Journal 2025",
      link: "https://arxiv.org/abs/PAPER_ID_1"
    },
    work2: {
      title: "Paper Title 2",
      description: "Brief description of the work and its main contribution.",
      venue: "Conference/Journal 2025",
      link: "https://arxiv.org/abs/PAPER_ID_2"
    },
    work3: {
      title: "Paper Title 3",
      description: "Brief description of the work and its main contribution.",
      venue: "Conference/Journal 2025",
      link: "https://arxiv.org/abs/PAPER_ID_3"
    }
  },

  // ========== 机构链接 ==========
  institutions: {
    // 杭州电子科技大学官网
    hdu: "https://www.hdu.edu.cn"
  },

  // ========== 外部资源CDN ==========
  cdn: {
    // Google Fonts
    googleFonts: "https://fonts.googleapis.com",
    googleFontsStatic: "https://fonts.gstatic.com",
    // Google APIs (jQuery等)
    googleApis: "https://ajax.googleapis.com",
    // Adobe Document Cloud
    adobe: "https://documentcloud.adobe.com",
    // jsDelivr CDN
    jsdelivr: "https://cdn.jsdelivr.net",
    // Academicons图标库
    academicons: "https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css",
    // Google Fonts CSS
    interFont: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
    // jQuery库
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    // Adobe View SDK
    adobeViewSdk: "https://documentcloud.adobe.com/view-sdk/main.js"
  },

  // ========== 模板和许可证链接 ==========
  template: {
    // 使用的模板来源
    academicTemplate: "https://github.com/eliahuhorwitz/Academic-project-page-template",
    nerfies: "https://nerfies.github.io",
    // 许可证链接
    license: "http://creativecommons.org/licenses/by-sa/4.0/",
    // Schema.org许可证
    schemaLicense: "https://creativecommons.org/licenses/by/4.0/"
  },

  // ========== 图片资源路径 ==========
  images: {
    // 社交媒体预览图
    socialPreview: "static/images/social_preview.png",
    // Favicon
    favicon: "static/images/favicon.ico"
  }
};

// 注意：版本号和链接的更新由 index.js 中的 updateLinksFromConfig() 函数处理
// 该函数会在页面加载完成后自动调用

// 导出配置供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
