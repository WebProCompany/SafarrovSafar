"use strict";

document.addEventListener("DOMContentLoaded", () => {
    try {
        /* =========================================
           MOBILE MENU
        ========================================== */

        const menuToggle = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");

        if (menuToggle && mobileMenu) {
            const mobileLinks = mobileMenu.querySelectorAll("a");

            const closeMenu = () => {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                mobileMenu.classList.remove("active");
            };

            menuToggle.addEventListener("click", () => {
                const isOpen = mobileMenu.classList.toggle("active");

                menuToggle.classList.toggle("active", isOpen);
                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            });

            mobileLinks.forEach((link) => {
                link.addEventListener("click", closeMenu);
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    closeMenu();
                }
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 900) {
                    closeMenu();
                }
            });
        }


        /* =========================================
           BRAND SLIDER + DOTS
        ========================================== */

        const brandsTrack = document.querySelector(".brands-track");
        const brandCards = document.querySelectorAll(".brand-card");
        const dots = document.querySelectorAll(".slider-dots .dot");

        if (
            brandsTrack &&
            brandCards.length > 0 &&
            dots.length > 0
        ) {
            let ticking = false;

            const updateActiveDot = () => {
                try {
                    const firstCard = brandCards[0];

                    if (!firstCard) {
                        return;
                    }

                    const cardStyle = window.getComputedStyle(
                        firstCard
                    );

                    const cardWidth = firstCard.offsetWidth;
                    const trackStyle = window.getComputedStyle(
                        brandsTrack
                    );

                    const gap = parseFloat(trackStyle.gap) || 0;

                    const step = cardWidth + gap;

                    if (step <= 0) {
                        return;
                    }

                    const rawIndex =
                        brandsTrack.scrollLeft / step;

                    let activeIndex = Math.round(rawIndex);

                    activeIndex = Math.max(
                        0,
                        Math.min(
                            activeIndex,
                            dots.length - 1
                        )
                    );

                    dots.forEach((dot, index) => {
                        dot.classList.toggle(
                            "active",
                            index === activeIndex
                        );
                    });
                } catch (error) {
                    console.error(
                        "Ошибка обновления dots:",
                        error
                    );
                }

                ticking = false;
            };

            brandsTrack.addEventListener(
                "scroll",
                () => {
                    if (!ticking) {
                        window.requestAnimationFrame(
                            updateActiveDot
                        );

                        ticking = true;
                    }
                },
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
