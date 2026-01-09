
        document.addEventListener("DOMContentLoaded", () => {
            
            // 1. LENIS INIT
            const lenis = new Lenis({
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);

            // 2. GSAP SETUP
            gsap.registerPlugin(ScrollTrigger);
            gsap.set(".gsap-hidden", { visibility: "visible" });

            // 3. INTRO HERO ANIMATION (Initial Load)
            const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
            heroTl
                .fromTo(".hero-bg", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.inOut" })
                .fromTo("#hero-logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 }, "-=2.0");

            // 4. INTRO SECTION REVEAL (Hero -> Second Section)
            // Pins wrapper, wipes second section UP over the hero
            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#intro-wrapper",
                    start: "top top",
                    end: "+=100%", 
                    scrub: true,
                    pin: true,
                    anticipatePin: 1
                }
            });

            introTl.to("#second-section", {
                clipPath: "inset(0% 0% 0% 0%)", 
                ease: "none"
            });

            // 5. FEATURES ANIMATION (Happens as we enter the reveal wrapper)
            const featuresTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#reveal-wrapper", // Triggered when this wrapper starts
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            });

            featuresTl
                .fromTo(".features-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
                .fromTo("#features-bg-img", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.3")
                .fromTo("#feature-circle", 
                    { opacity: 0, scale: 0, rotation: -180 }, 
                    { 
                        opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)",
                        onComplete: () => {
                            gsap.to("#feature-circle", { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
                        }
                    }, "-=0.8"
                )
                .fromTo("#feature-product", 
                    { opacity: 0, scale: 0, y: 20 }, 
                    { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.9"
                );

            // 6. CIRCULAR MASK REVEAL (Features -> Video -> Fourth)
            // Pins the SAME reveal wrapper, but scrubs the masks
            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#reveal-wrapper",
                    start: "top top",
                    end: "+=300%", // Longer scroll distance for multiple reveals
                    scrub: true,
                    pin: true,
                    anticipatePin: 1
                }
            });

            revealTl
                .to("#video-mask", { clipPath: "circle(100% at 50% 50%)", duration: 1, ease: "none" }, 0.5)
                .to("#fourth-mask", { clipPath: "circle(150% at 50% 100%)", duration: 1, ease: "none" });

            // 7. BANNER LOGIC
            const closeBtn = document.getElementById('close-banner');
            if(closeBtn) {
                closeBtn.addEventListener('click', function() {
                    document.getElementById('top-banner').style.display = 'none';
                    ScrollTrigger.refresh();
                });
            }

            // 8. FOOTER REVEAL LOGIC
            function adjustFooterReveal() {
                const footer = document.getElementById('reveal-footer');
                const wrapper = document.getElementById('content-wrapper');
                if (footer && wrapper) {
                    wrapper.style.marginBottom = `${footer.offsetHeight}px`;
                }
            }
            
            // Adjust footer on load and resize
            adjustFooterReveal();
            window.addEventListener('resize', adjustFooterReveal);
            ScrollTrigger.addEventListener("refresh", adjustFooterReveal);

        });