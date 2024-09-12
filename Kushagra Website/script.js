// Initialize Feather icons
feather.replace();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission (you'll need to implement the backend for this)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message. I\'ll get back to you soon!');
    this.reset();
});

// Add a scroll animation to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

const fadeInTimeline = () => {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;

        if (itemTop < window.innerHeight && itemBottom > 0) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', fadeInTimeline);
window.addEventListener('load', fadeInTimeline);