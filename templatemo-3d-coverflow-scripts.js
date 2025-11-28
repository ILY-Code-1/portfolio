/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        let currentIndex = 3;
        let isAnimating = false;

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Image data with titles and descriptions
        const imageData = [
            {
                title: "SelarasHomeId",
                description: "ERP Task Management berbasis Website (PT. Jangkau Realty Indonesia)"
            },
            {
                title: "Daarul Mukhtarin",
                description: "Website Profil Pondok Pesantren (Daarul Mukhtarin Al-Falahiyah)"
            },
            {
                title: "Tracer Study",
                description: "Sistem Tracer Study Alumni berbasis Website (SMK Negeri 3 Pandeglang)"
            },
            {
                title: "Bojongsari Bebas Stunting",
                description: "Website Prediksi Stunting dengan Metode Naive Bayes (Puskesmas Bojongsari Depok)"
            },
            {
                title: "Pengajuan Cuti Delta Tekno",
                description: "Sistem Pengajuan Cuti Delta Tekno berbasis Website (PT. Delta Tekno Perkasa)"
            },
            {
                title: "CleanCare",
                description: "ERP Monitoring Cleaning Service berbasis Mobile"
            },
        ];

        const projectLinks = [
                "https://selarashome.my.id/",
                "https://daarulmukhtarin.my.id/",
                "https://tracerstudy.yusnar.my.id/",
                "https://ilhamabdul07.github.io/Flutter-CegahStuntingPuskesmasBojongsari/",
                "https://cutideltatekno.my.id/" ,
                "https://github.com/IlhamAbdul07/Flutter-CleanCare/releases/download/v1.4.4-release/app-release.apk",
            ];

            // Ambil semua coverflow item
            const coverflowItems = document.querySelectorAll('.coverflow-item');

            // Tambahkan event click untuk masing-masing item
            coverflowItems.forEach((item, index) => {
            const link = projectLinks[index]; // ambil link sesuai urutan index
            if (link) {
                item.addEventListener('click', () => {
                window.open(link, '_blank', 'noopener,noreferrer');
                });

                // (Opsional) ubah cursor jadi pointer biar kelihatan bisa diklik
                item.style.cursor = 'pointer';
            }
            });

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let autoplayInterval = null;
        let isPlaying = true;
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;

                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function navigate(direction) {
            if (isAnimating) return;
            
            currentIndex = currentIndex + direction;
            
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            } else if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        // Click on items to select
        items.forEach((item, index) => {
            item.addEventListener('click', () => goToIndex(index));
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();
                
                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }
        }

        // Initialize images and reflections
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            const reflection = item.querySelector('.reflection');
            
            img.onload = function() {

                this.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${this.src})`);
                reflection.style.backgroundImage = `url(${this.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            };
            
            img.onerror = function() {
                this.parentElement.classList.add('image-loading');
            };
        });

        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCoverflow();
            }, 4000);
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }

        function toggleAutoplay() {
            if (isPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        }

        function handleUserInteraction() {
            stopAutoplay();
        }

        // Add event listeners to stop autoplay on manual navigation
        items.forEach((item) => {
            item.addEventListener('click', handleUserInteraction);
        });

        document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
        document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
        
        dots.forEach((dot) => {
            dot.addEventListener('click', handleUserInteraction);
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleUserInteraction();
            }
        });

        // Smooth scrolling and active menu item
        const sections = document.querySelectorAll('.section');
        const menuItems = document.querySelectorAll('.menu-item');
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update active menu item on scroll
        function updateActiveMenuItem() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(item => {
                        if (!item.classList.contains('external')) {
                            item.classList.remove('active');
                        }
                    });
                    if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                        menuItems[index].classList.add('active');
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateActiveMenuItem);

        // Smooth scroll to section
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                
                // Check if it's an internal link (starts with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // External links will open normally in new tab
            });
        });

        // Logo click to scroll to top
        document.querySelector('.logo-container').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll to top button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Form submission
        async function handleSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const name = form.name.value.trim();
            let whatsapp = form.whatsapp.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Format email tidak valid.");
                return;
            }

            whatsapp = whatsapp.replace(/\D/g, "");

            if (!/^\d+$/.test(whatsapp)) {
                alert("Nomor WhatsApp hanya boleh angka.");
                return;
            }

            if (whatsapp.startsWith("0")) {
                whatsapp = "62" + whatsapp.slice(1);
            }

            if (whatsapp.length < 9 || whatsapp.length > 15) {
                alert("Nomor WhatsApp tidak valid. Pastikan panjangnya 9–15 digit.");
                return;
            }

            if (!name || !subject || !message) {
                alert("Ada kolom yang belum diisi.");
                return;
            }

            const encodedBaseJSON = "%7B%0A%09%09%22smtp_host%22%3A%22smtp.gmail.com%22%2C%0A%09%09%22smtp_port%22%3A465%2C%0A%09%09%22auth_email%22%3A%22ilycode1%40gmail.com%22%2C%0A%09%09%22auth_password%22%3A%22ffxi+mbfw+xwft+yfin%22%2C%0A%09%09%22sender_name%22%3A%22Website+Contact+Form%22%2C%0A%09%09%22recipient%22%3A%22ilycode1%40gmail.com%22%0A%09%7D";
            const decodedJSONText = decodeURIComponent(encodedBaseJSON);
            const baseData = JSON.parse(decodedJSONText);

            baseData.auth_password = baseData.auth_password.replace(/\+/g, " ");
            baseData.sender_name = baseData.sender_name.replace(/\+/g, " ");
            baseData.subject = subject;
            baseData.body_html = `
                <!doctype html>
                <html lang="id">
                <meta charset="utf-8">
                <body style="font-family:Arial,sans-serif;margin:16px">
                <h3>Informasi Kontak Baru dari Web Portfolio!</h3>
                <p><b>Nama:</b> ${name}<br>
                    <b>WA:</b> ${whatsapp}<br>
                    <b>Email:</b> ${email}<br>
                    <b>Subjek:</b> ${subject}</p>

                <p><b>Pesan:</b><br>${message}</p>

                <p>
                    <a href="mailto:${email}?subject=Balasan%20untuk%20${subject}">Balas Email</a>
                    &nbsp;|&nbsp;
                    <a href="https://wa.me/${whatsapp}">WhatsApp</a>
                </p>
                </body>
                </html>
            `;

            try {
                const encoded = encodeURIComponent(JSON.stringify(baseData));
                const response = await fetch(`https://yusnar.my.id/omailer/send/just-message?data=${encoded}`);
                if (!response.ok) throw new Error(await response.text());
                alert("✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
                form.reset();
            } catch (err) {
                console.error(err);
                alert("❌ Gagal mengirim pesan. Silakan coba lagi nanti.");
            }
        }

        // Function animasi count-up
        function animateCountUp(element, duration = 2000) {
        const target = +element.getAttribute('data-target');
        const increment = target / (duration / 16); // update per frame (±60fps)
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
            } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            }
        };

        updateCount();
        }

        // Seleksi elemen yang mau diamati (tambahkan about-header)
        // Seleksi semua elemen yang mau diamati
        const statItems = document.querySelectorAll('.stat-item');
        const aboutHeader = document.querySelector('.about-header');
        const aboutInfo = document.querySelector('.about-info');
        const aboutVisual = document.querySelector('.about-visual');

        // Observer untuk mendeteksi saat elemen masuk viewport
        const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('visible');

                // Jalankan count animation hanya sekali (khusus stat-item)
                if (el.classList.contains('stat-item')) {
                const statNumber = el.querySelector('.stat-number');
                if (!statNumber.dataset.animated) {
                    animateCountUp(statNumber);
                    statNumber.dataset.animated = true;
                }
                }

                observer.unobserve(el);
            }
            });
        },
        { threshold: 0.3 }
        );

        // Jalankan observer untuk semua target
        statItems.forEach(item => observer.observe(item));
        if (aboutHeader) observer.observe(aboutHeader);
        if (aboutInfo) observer.observe(aboutInfo);
        if (aboutVisual) observer.observe(aboutVisual);

        // Initialize coverflow
        updateCoverflow();
        container.focus();
        startAutoplay();

