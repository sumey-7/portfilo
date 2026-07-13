document.addEventListener("DOMContentLoaded", function() {
    // 1. توليد الأشكال السداسية العائمة في الخلفية عشوائياً
    const container = document.getElementById("hexagons-container");
    const numHexagons = 21; // عدد الأشكال في الخلفية
    const hexArray = [];

    for (let i = 0; i < numHexagons; i++) {
        const hex = document.createElement("div");
        hex.classList.add("floating-hex");
        
        // توزيع عشوائي على الشاشة
        const leftPos = Math.random() * 90; // نسبة مئوية من العرض
        const topPos = Math.random() * 90;  // نسبة مئوية من الارتفاع
        const scale = 0.5 + Math.random() * 1.2; // أحجام مختلفة
        
        hex.style.left = `${leftPos}%`;
        hex.style.top = `${topPos}%`;
        hex.style.transform = `scale(${scale})`;
        
        // حفظ معامل السرعة العشوائي لكل سداسي لتأثير التمرير
        const speed = 0.1 + Math.random() * 0.5;
        
        container.appendChild(hex);
        hexArray.push({ element: hex, top: topPos, speed: speed, scale: scale });
    }

    // 2. تحريك الأشكال السداسية انسيابياً مع التمرير (Scroll)
    window.addEventListener("scroll", function() {
        const scrollValue = window.pageYOffset;
        
        hexArray.forEach(hex => {
            // تحريك كل شكل بمعدل سرعة مختلف عن الآخر بناءً على التمرير
            const yOffset = scrollValue * hex.speed;
            hex.element.style.transform = `translateY(${yOffset}px) scale(${hex.scale})`;
        });
    });

    // 3. تأثير الكشف التدريجي عن الأقسام عند النزول
    const sections = document.querySelectorAll(".container");
    const observerOptions = {
        root: null,
        threshold: 0.10
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.8s ease-out";
        sectionObserver.observe(section);
    });
});