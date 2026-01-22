window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Language switching functionality
let currentLanguage = localStorage.getItem('language') || 'en'; // Default to English

function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLanguage === 'zh' ? 'English' : '中文';
    }
    
    // Update all elements with data-en and data-zh attributes
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
        const content = currentLanguage === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        
        // Check if element has title attributes
        if (element.hasAttribute('data-en-title') || element.hasAttribute('data-zh-title')) {
            const titleContent = currentLanguage === 'zh' ? element.getAttribute('data-zh-title') : element.getAttribute('data-en-title');
            if (titleContent) {
                element.setAttribute('title', titleContent);
            }
        }
        
        // For elements that should use innerHTML (contain HTML tags)
        if (element.tagName === 'P' || element.tagName === 'LI' || 
            (element.tagName === 'SPAN' && content.includes('<')) ||
            content.includes('<strong>') || content.includes('<em>') || 
            content.includes('<sub>') || content.includes('<sup>') ||
            content.includes('<ul>') || content.includes('<li>')) {
            element.innerHTML = content;
        } else {
            // For simple text elements
            element.textContent = content;
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage();
});

// Grid tab switching functionality
function switchGridTab(tabName) {
    // Hide all tab contents
    const cartesianDemo = document.getElementById('cartesian-grid-demo');
    const polarDemo = document.getElementById('polar-grid-demo');
    const tabItems = document.querySelectorAll('.tabs ul li');
    
    // Remove active class from all tabs
    tabItems.forEach(item => item.classList.remove('is-active'));
    
    // Show selected tab content and activate corresponding tab
    if (tabName === 'cartesian') {
        if (cartesianDemo) cartesianDemo.style.display = 'block';
        if (polarDemo) polarDemo.style.display = 'none';
        if (tabItems[0]) tabItems[0].classList.add('is-active');
    } else if (tabName === 'polar') {
        if (cartesianDemo) cartesianDemo.style.display = 'none';
        if (polarDemo) polarDemo.style.display = 'block';
        if (tabItems[1]) tabItems[1].classList.add('is-active');
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// 从配置文件更新所有链接和版本信息
function updateLinksFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('SITE_CONFIG not found. Make sure config.js is loaded.');
        return;
    }

    const config = SITE_CONFIG;

    // 更新版本号
    const versionElement = document.querySelector('.version-number');
    if (versionElement) {
        versionElement.textContent = 'V' + config.version;
    }

    // 更新Meta标签中的URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', config.domain.fullUrl);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', config.domain.main + '/' + config.images.socialPreview);
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', config.domain.main + '/' + config.images.socialPreview);
    
    const citationPdf = document.querySelector('meta[name="citation_pdf_url"]');
    if (citationPdf) citationPdf.setAttribute('content', config.domain.main + '/' + config.paper.pdfLocal);

    // 更新JSON-LD中的URL
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
        try {
            const data = JSON.parse(jsonLd.textContent);
            if (data.url) data.url = config.domain.fullUrl;
            if (data.image) data.image = config.domain.main + '/' + config.images.socialPreview;
            if (data.license) data.license = config.template.schemaLicense;
            if (data.mainEntity && data.mainEntity['@id']) {
                data.mainEntity['@id'] = config.domain.fullUrl;
            }
            jsonLd.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            console.warn('Failed to update JSON-LD:', e);
        }
    }

    // 更新作者主页链接
    const yongWangLink = document.querySelector('a[href="http://yong-wang.org"]');
    if (yongWangLink) yongWangLink.setAttribute('href', config.authors.yongWang);

    // 更新论文PDF链接
    const arxivPdfLinks = document.querySelectorAll('a[href*="arxiv.org/pdf"]');
    arxivPdfLinks.forEach(link => {
        if (link.getAttribute('href').includes('<ARXIV')) {
            link.setAttribute('href', config.paper.arxivPdf);
        }
    });

    // 更新ArXiv摘要链接
    const arxivAbsLinks = document.querySelectorAll('a[href*="arxiv.org/abs"]');
    arxivAbsLinks.forEach(link => {
        if (link.getAttribute('href').includes('<ARXIV')) {
            link.setAttribute('href', config.paper.arxivAbs);
        }
    });

    // 更新GitHub仓库链接
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('YOUR REPO HERE') || href.includes('YOUR_REPO')) {
            link.setAttribute('href', config.repositories.github);
        } else if (href.includes('VisHintPrompt_datasets')) {
            link.setAttribute('href', config.repositories.dataset);
        }
    });

    // 更新数据集链接
    const datasetLinks = document.querySelectorAll('a[href*="VisHintPrompt_datasets"]');
    datasetLinks.forEach(link => {
        link.setAttribute('href', config.repositories.dataset);
        if (link.textContent.includes('github.com')) {
            link.textContent = config.repositories.dataset;
        }
    });

    // 更新YouTube视频
    const youtubeIframe = document.querySelector('iframe[src*="youtube.com"]');
    if (youtubeIframe) {
        youtubeIframe.setAttribute('src', config.videos.youtubeUrl);
    }

    // 更新相关论文链接
    const workLinks = document.querySelectorAll('.work-item');
    workLinks.forEach((link, index) => {
        const workKey = 'work' + (index + 1);
        if (config.relatedWorks[workKey]) {
            const work = config.relatedWorks[workKey];
            link.setAttribute('href', work.link);
            const titleEl = link.querySelector('h5');
            if (titleEl) titleEl.textContent = work.title;
            const descEl = link.querySelector('p');
            if (descEl) descEl.textContent = work.description;
            const venueEl = link.querySelector('.work-venue');
            if (venueEl) venueEl.textContent = work.venue;
        }
    });

    // 更新BibTeX中的URL
    const bibtexCode = document.querySelector('#bibtex-code code');
    if (bibtexCode) {
        let bibtexText = bibtexCode.textContent;
        bibtexText = bibtexText.replace(/url=\{https:\/\/your-domain\.com[^}]*\}/, 
            `url={${config.domain.fullUrl}}`);
        bibtexCode.textContent = bibtexText;
    }

    // 更新机构链接
    const hduLinks = document.querySelectorAll('a[href*="hdu.edu.cn"]');
    hduLinks.forEach(link => {
        if (link.getAttribute('href').includes('www.hdu.edu.cn')) {
            link.setAttribute('href', config.institutions.hdu);
        }
    });
}

$(document).ready(function() {
    // 首先更新所有链接
    updateLinksFromConfig();

    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})
