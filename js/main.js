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
