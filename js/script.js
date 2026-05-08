document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            buildGallery(data);
            buildCarousel(data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    // 3x3 Gallery with fade-in animation
    function buildGallery(items) {
        const gallery = document.getElementById('json-gallery');
        if (!gallery) return; 

        items.forEach((item, index) => {
            const delay = (index % 3) * 0.1; 
            const cardHTML = `
                <div class="card fade-in visible" style="transition-delay: ${delay}s;">
                    <i class="fa-regular fa-heart heart-icon" style="color:var(--text-dark)"></i>
                    <a href="${item.src}" target="_blank">
                        <img src="${item.src}" alt="${item.title}" class="card-img">
                    </a>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="card-footer">
                        <span>${item.price}</span>
                    </div>
                </div>
            `;
            gallery.innerHTML += cardHTML;
        });

        document.querySelectorAll('.heart-icon').forEach(heart => {
            heart.addEventListener('click', function(e) {
                e.preventDefault(); 
                this.classList.toggle('fa-regular');
                this.classList.toggle('fa-solid');
                this.style.color = this.classList.contains('fa-solid') ? '#ff4d4d' : 'var(--text-dark)';
            });
        });
    }

    // Interactive Carousel with auto-play
    function buildCarousel(items) {
        const track = document.getElementById('carousel-track');
        if (!track) return; 

        items.forEach(item => {
            const slideHTML = `
                <div class="carousel-slide">
                    <img src="${item.src}" alt="${item.title}">
                    <div class="carousel-caption">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            track.innerHTML += slideHTML;
        });

        // Carousel Logic
        let currentIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        document.getElementById('nextBtn').addEventListener('click', () => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateCarousel();
        });

        // Auto-play functionality
        setInterval(() => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000); 
    }
    // Observer for fade-in animations when scrolling
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });
});