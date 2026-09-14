"use strict";

document.addEventListener("DOMContentLoaded", () => {
    try {
        const menuToggle = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");

        if (!menuToggle || !mobileMenu) {
            return;
        }

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
    } catch (error) {
        console.error(
            "Ошибка инициализации меню:",
            error
        );
    }
});
