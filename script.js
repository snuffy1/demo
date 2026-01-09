document.addEventListener("DOMContentLoaded", () => {
    
    // ================= 1. LENIS SMOOTH SCROLL SETUP =================
    const lenis = new Lenis({
        duration: 1.5, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smoothWheel: true,
        smoothTouch: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect sync
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing to prevent jumps
    gsap.ticker.lagSmoothing(0);


    // ================= 2. GSAP INIT =================
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".gsap-hidden", { visibility: "visible" });


    // ================= 3. HERO TIMELINE =================
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
        .fromTo(".hero-bg", 
            { opacity: 0, scale: 1.1 }, 
            { opacity: 1, scale: 1, duration: 2.5, ease: "power2.inOut" }
        )
        .fromTo("#hero-logo",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=2.0"
        )
        .fromTo(".hero-text",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
            "-=1.5"
        )
        .fromTo("#scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");


    // ================= 4. FEATURES TIMELINE =================
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
        .fromTo("#features-bg-img", 
            { opacity: 0, scale: 0.95 }, 
            { opacity: 1, scale: 1, duration: 1 },
            "-=0.3"
        )
        .fromTo("#feature-circle", 
            { opacity: 0, scale: 0, rotation: -180 }, 
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0, 
                duration: 1.2, 
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to("#feature-circle", {
                        rotation: 360,
                        duration: 10,
                        repeat: -1, 
                        ease: "linear"
                    });
                }
            },
            "-=0.8"
        )
        .fromTo("#feature-product",
            { opacity: 0, scale: 0, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
            "-=0.9"
        );


    // ================= 5. PINNED REVEAL SEQUENCE =================
    const revealTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#reveal-wrapper", 
            start: "top top",           
            end: "+=300%",              
            scrub: true,                
            pin: true,                  
            anticipatePin: 1
        }
    });

    revealTl
        // Position parameter '0.5' creates the delay
        .to("#video-mask", {
            clipPath: "circle(100% at 50% 50%)", 
            duration: 1,
            ease: "none"
        }, 0.4) 
        
        .to("#fourth-mask", {
            clipPath: "circle(150% at 50% 100%)", 
            duration: 1,
            ease: "none"
        });

});


// ================= 6. BANNER INTERACTION =================
// Note: This is outside DOMContentLoaded to ensure the element exists or 
// you can move it inside if the script runs in head. 
// Since this is usually at end of body, it is fine here.
const closeBtn = document.getElementById('close-banner');
if(closeBtn) {
    closeBtn.addEventListener('click', function() {
        const banner = document.getElementById('top-banner');
        const hero = document.getElementById('hero');
        
        if(banner) banner.style.display = 'none';
        if(hero) hero.style.height = '100vh'; 
        
        ScrollTrigger.refresh();
    });
}