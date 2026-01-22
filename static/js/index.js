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

$(document).ready(function() {
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
