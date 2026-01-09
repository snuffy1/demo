document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".gsap-hidden", { visibility: "visible" });

    // ================= HERO TIMELINE =================
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
        // 1. Fade in Background
        .fromTo(".hero-bg", 
            { opacity: 0, scale: 1.1 }, 
            { opacity: 1, scale: 1, duration: 2.5, ease: "power2.inOut" }
        )
        // 2. Fade in Logo (Top Center)
        .fromTo("#hero-logo",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=2.0"
        )
        // 3. Main Text
        .fromTo(".hero-text",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
            "-=1.5"
        )
        .fromTo("#scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");

    // ================= FEATURES TIMELINE =================
    const featuresTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#features",
            start: "top 70%", 
            toggleActions: "play none none reverse",
        }
    });

    featuresTl
        .fromTo(".features-title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }
        )
        // Animate Group 6 (Icons) first
        .fromTo("#features-bg-img", 
            { opacity: 0, scale: 0.95 }, 
            { opacity: 1, scale: 1, duration: 1 },
            "-=0.3"
        )
        // Animate the Frame (Spin in + Start Continuous Rotation)
        .fromTo("#feature-circle", 
            { opacity: 0, scale: 0, rotation: -180 }, 
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0, 
                duration: 1.2, 
                ease: "back.out(1.7)",
                // Once the entrance spin finishes, start the infinite loop
                onComplete: () => {
                    gsap.to("#feature-circle", {
                        rotation: 360,
                        duration: 10, // Adjust speed (lower = faster)
                        repeat: -1,   // Infinite repeat
                        ease: "linear"
                    });
                }
            },
            "-=0.8"
        )
        // Animate the Bottle (Pop up)
        .fromTo("#feature-product",
            { opacity: 0, scale: 0, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
            "-=0.9"
        );
});