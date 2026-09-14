"use strict";

document.addEventListener("DOMContentLoaded", () => {
    try {
       /* =========================================
   MOBILE BRAND SLIDER + ACTIVE DOTS
========================================= */

const brandsTrack = document.querySelector(".brands-track");
const brandCards = document.querySelectorAll(".brand-card");
const dots = document.querySelectorAll(".slider-dots .dot");

if (
    brandsTrack &&
    brandCards.length &&
    dots.length &&
    window.matchMedia("(max-width: 600px)").matches
) {
    try {
        const observer = new IntersectionObserver(
            (entries) => {
                let bestEntry = null;

                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        (!bestEntry ||
                            entry.intersectionRatio >
                                bestEntry.intersectionRatio)
                    ) {
                        bestEntry = entry;
                    }
                });

                if (!bestEntry) {
                    return;
                }

                const activeIndex = Array.from(
                    brandCards
                ).indexOf(bestEntry.target);

                if (activeIndex === -1) {
                    return;
                }

                dots.forEach((dot, index) => {
                    dot.classList.toggle(
                        "active",
                        index === activeIndex
                    );
                });
            },
            {
                root: brandsTrack,
                threshold: [
                    0.35,
                    0.5,
                    0.65,
                    0.8,
                    0.95
                ]
            }
        );

        brandCards.forEach((card) => {
            observer.observe(card);
        });
    } catch (error) {
        console.error(
            "Mobile slider error:",
            error
        );
    }
}

        /* =========================================
           BRANDS SLIDER + MOVING DOTS
        ========================================== */

        const brandsTrack = document.querySelector(".brands-track");
        const dots = document.querySelectorAll(".slider-dots .dot");

        if (brandsTrack && dots.length > 0) {

            const updateActiveDot = () => {
                const maxScroll =
                    brandsTrack.scrollWidth - brandsTrack.clientWidth;

                if (maxScroll <= 0) {
                    dots.forEach((dot, index) => {
                        dot.classList.toggle("active", index === 0);
                    });
                    return;
                }

                const scrollProgress =
                    brandsTrack.scrollLeft / maxScroll;

                const activeIndex = Math.round(
                    scrollProgress * (dots.length - 1)
                );

                dots.forEach((dot, index) => {
                    dot.classList.toggle(
                        "active",
                        index === activeIndex
                    );
                });
            };

            brandsTrack.addEventListener(
                "scroll",
                updateActiveDot,
                { passive: true }
            );

            window.addEventListener(
                "resize",
                updateActiveDot
            );

            updateActiveDot();
        }

    } catch (error) {
        console.error(
            "Ошибка инициализации сайта:",
            error
        );
    }
});
