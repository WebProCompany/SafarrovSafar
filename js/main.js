"use strict";

document.addEventListener("DOMContentLoaded", () => {
    try {
        initLoaderClock();
        initPageLoader();
        initMobileMenu();
        initBrandSlider();
    } catch (error) {
        console.error(
            "Site initialization error:",
            error
        );
    }
});


/* =========================================
   PAGE LOADER
========================================= */

function initPageLoader() {
    const loader =
        document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    const hideLoader = () => {
        window.setTimeout(() => {
            loader.classList.add("loaded");
        }, 2000);
    };

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );
    }
}


/* =========================================
   REAL LOADER CLOCK
========================================= */

function initLoaderClock() {
    const hourHand =
        document.querySelector(".loader-hour");

    const minuteHand =
        document.querySelector(".loader-minute");

    const secondHand =
        document.querySelector(".loader-second");

    const orbitDots =
        document.querySelectorAll(".orbit-dot");

    if (
        !hourHand ||
        !minuteHand ||
        !secondHand
    ) {
        return;
    }

    const updateClock = () => {
        try {
            const now = new Date();

            const milliseconds =
                now.getMilliseconds();

            const seconds =
                now.getSeconds() +
                milliseconds / 1000;

            const minutes =
                now.getMinutes() +
                seconds / 60;

            const hours =
                (now.getHours() % 12) +
                minutes / 60;


            /* ==============================
               REAL CLOCK ROTATION
            ============================== */

            const secondRotation =
                seconds * 6;

            const minuteRotation =
                minutes * 6;

            const hourRotation =
                hours * 30;


            hourHand.style.transform =
                `translateX(-50%) rotate(${hourRotation}deg)`;

            minuteHand.style.transform =
                `translateX(-50%) rotate(${minuteRotation}deg)`;

            secondHand.style.transform =
                `translateX(-50%) rotate(${secondRotation}deg)`;


            /* ==============================
               ORBIT DOTS
            ============================== */

            if (orbitDots.length === 4) {
                const activeDot =
                    Math.floor(
                        now.getSeconds() / 15
                    );

                orbitDots.forEach(
                    (dot, index) => {
                        dot.classList.toggle(
                            "active",
                            index === activeDot
                        );
                    }
                );
            }

        } catch (error) {
            console.error(
                "Loader clock error:",
                error
            );
        }
    };


    updateClock();

    window.setInterval(
        updateClock,
        100
    );
}


/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {
    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) {
        return;
    }

    const menuLinks =
        mobileMenu.querySelectorAll("a");


    const openMenu = () => {
        mobileMenu.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    };


    const closeMenu = () => {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    };


    menuToggle.addEventListener(
        "click",
        () => {
            const isOpen =
                mobileMenu.classList.contains(
                    "active"
                );

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );


    menuLinks.forEach((link) => {
        link.addEventListener(
            "click",
            closeMenu
        );
    });


    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        }
    );


    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        }
    );
}


/* =========================================
   BRAND SLIDER
========================================= */

function initBrandSlider() {
    const track =
        document.getElementById("brandsTrack");

    const dotsContainer =
        document.getElementById("sliderDots");

    if (!track || !dotsContainer) {
        return;
    }

    const dots =
        Array.from(
            dotsContainer.querySelectorAll(".dot")
        );

    if (dots.length === 0) {
        return;
    }


    const updateDots = () => {
        try {
            const maxScroll =
                track.scrollWidth -
                track.clientWidth;

            if (maxScroll <= 0) {
                dots.forEach(
                    (dot, index) => {
                        dot.classList.toggle(
                            "active",
                            index === 0
                        );
                    }
                );

                return;
            }


            const progress =
                track.scrollLeft / maxScroll;

            let activeIndex =
                Math.round(
                    progress *
                    (dots.length - 1)
                );


            activeIndex =
                Math.max(
                    0,
                    Math.min(
                        activeIndex,
                        dots.length - 1
                    )
                );


            dots.forEach(
                (dot, index) => {
                    dot.classList.toggle(
                        "active",
                        index === activeIndex
                    );
                }
            );

        } catch (error) {
            console.error(
                "Brand dots error:",
                error
            );
        }
    };


    let scrollFrame = null;


    track.addEventListener(
        "scroll",
        () => {
            if (scrollFrame) {
                return;
            }

            scrollFrame =
                requestAnimationFrame(() => {
                    updateDots();

                    scrollFrame = null;
                });
        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateDots
    );


    updateDots();
}
