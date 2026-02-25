/**
 * Meryl Jane Deguitos Resume - Interactive Features
 * Handles video playback and skill interactions
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayer();
    initSkillInteractions();
});

/**
 * Video Player Functionality
 * Click thumbnail to play video, close with button/ESC/click outside
 */
function initVideoPlayer() {
    const thumbnail = document.getElementById("videoThumbnail");
    const videoOverlay = document.getElementById("videoOverlay");
    const video = document.getElementById("myVideo");
    const closeBtn = document.getElementById("closeVideoBtn");

    // Check if elements exist
    if (!thumbnail || !videoOverlay || !video) {
        console.warn("Video elements not found");
        return;
    }

    // Click thumbnail to show video
    thumbnail.addEventListener("click", function() {
        videoOverlay.style.display = "flex";
        video.play().catch(error => {
            console.log("Autoplay prevented by browser:", error);
            // Show play button or message if needed
        });
    });

    // Close video function
    function closeVideo() {
        video.pause();
        video.currentTime = 0;
        videoOverlay.style.display = "none";
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener("click", closeVideo);
    }

    // Click on overlay background (not video) to close
    videoOverlay.addEventListener("click", function(e) {
        if (e.target === videoOverlay) {
            closeVideo();
        }
    });

    // ESC key to close video
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && videoOverlay.style.display === "flex") {
            closeVideo();
        }
    });

    // Optional: Pause video when overlay is closed
    video.addEventListener('pause', function() {
        // Video paused event
    });
}

/**
 * Skill Interactions
 * Click on skill items to change their color
 */
function initSkillInteractions() {
    const colors = ["gold", "cyan", "lime", "hotpink", "orange", "purple", "red", "blue"];
    const skillItems = document.querySelectorAll(".skills-section li");
    
    if (skillItems.length === 0) {
        console.warn("No skill items found");
        return;
    }

    skillItems.forEach((skill, index) => {
        // Store original color or set default
        skill.setAttribute('data-color-index', '0');
        
        skill.addEventListener("click", function() {
            // Get current index or default to 0
            let currentIndex = parseInt(this.getAttribute('data-color-index') || '0');
            
            // Cycle to next color
            const nextIndex = (currentIndex + 1) % colors.length;
            
            // Apply new color
            this.style.setProperty("--starColor", colors[nextIndex]);
            this.style.color = colors[nextIndex];
            
            // Update index
            this.setAttribute('data-color-index', nextIndex.toString());
            
            // Add temporary animation class
            this.classList.add('color-change');
            setTimeout(() => {
                this.classList.remove('color-change');
            }, 300);
        });
    });
}

/**
 * Optional: Add smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Optional: Add active state to current section in view
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Console welcome message
 */
console.log(
    '%c👋 Welcome to Meryl Jane Deguitos Resume',
    'font-size: 16px; color: #4a148c; font-weight: bold;'
);
