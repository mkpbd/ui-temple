import { animate, scroll, inView, stagger } from "https://cdn.skypack.dev/motion"

// Hero Animations
animate(
    ".hero-img",
    { scale: [1.1, 1], opacity: [0, 1] },
    { duration: 2, easing: "ease-out" }
)

animate(
    ".animate-title",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 1, delay: 0.5, easing: "ease-out" }
)

animate(
    ".animate-text",
    { y: [30, 0], opacity: [0, 1] },
    { duration: 1, delay: 0.8, easing: "ease-out" }
)

animate(
    ".animate-btn",
    { y: [20, 0], opacity: [0, 1] },
    { duration: 0.8, delay: 1, easing: "ease-out" }
)

// Scroll Animations
document.querySelectorAll(".animate-fade-up").forEach((item) => {
    const delay = item.dataset.delay || 0;
    scroll(
        animate(item, { y: [50, 0], opacity: [0, 1] }, { duration: 1, delay: Number(delay) }),
        { target: item, offset: ["start end", "end end"] }
    )
});

// Gallery Stagger
inView(".gallery-grid", ({ target }) => {
    animate(
        target.querySelectorAll(".animate-card"),
        { y: [50, 0], opacity: [0, 1] },
        { delay: stagger(0.2), duration: 0.8, easing: "ease-out" }
    )
})

// Blockquote scale
scroll(
    animate(".animate-scale", { scale: [0.9, 1], opacity: [0.5, 1] }),
    { target: document.querySelector(".quote-section"), offset: ["start end", "center center"] }
)

// Parallax effect on Hero
scroll(({ y }) => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.transform = `translateY(${y.progress * 100}px)`;
        heroContent.style.opacity = 1 - y.progress;
    }

}, { target: document.querySelector(".hero"), offset: ["start start", "end start"] });

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Trigger animation again for reappearing items
                animate(
                    card,
                    { opacity: [0, 1], y: [20, 0] },
                    { duration: 0.5 }
                );
            } else {
                card.style.display = 'none';
            }
        });
    });
});
