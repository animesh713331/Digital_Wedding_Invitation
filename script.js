// Door Opening Logic
function openCard() {
    const envelope = document.getElementById('envelope-wrapper');
    if (envelope) {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.style.display = 'none';
            // Show page controls
            const controls = document.getElementById('page-controls');
            if (controls) {
                controls.classList.remove('opacity-0');
                controls.classList.add('opacity-100');
            }
            updatePages(); // Trigger animations for the first page
        }, 1500); // Matches the CSS transition time
    }
}

// 3D Page Flip Logic
let currentPage = 0;
const pages = document.querySelectorAll('.page');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function initPages() {
    pages.forEach((page, index) => {
        // Stack pages: first page has highest z-index
        page.style.zIndex = pages.length - index;
    });
    updatePages();
}

function updatePages() {
    pages.forEach((page, index) => {
        if (index < currentPage) {
            page.classList.add('flipped');
        } else {
            page.classList.remove('flipped');
        }
        
        // Trigger animations for the active page
        if (index === currentPage) {
            const animElements = page.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animElements.forEach(el => el.classList.add('active'));
        }
    });

    // Update buttons
    if (prevBtn) {
        if (currentPage === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
    }
    
    if (nextBtn) {
        if (currentPage === pages.length - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
    }
}

window.addEventListener('load', initPages);

// Countdown Timer
const targetDate = new Date("May 13, 2026 19:00:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) {
            countdownEl.innerHTML = "<div class='text-2xl gold-text'>शुभ विवाह का समय आ गया है!</div>";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secsEl = document.getElementById("secs");

    if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
    if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
    if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');
}, 1000);

// Swipe and Keyboard Event Listeners
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    // Requires a minimum swipe distance to avoid accidental flips
    if (touchEndX < touchStartX - 50) {
        nextPage(); // Swiped left -> Next page
    }
    if (touchEndX > touchStartX + 50) {
        prevPage(); // Swiped right -> Previous page
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, { passive: true });

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});
