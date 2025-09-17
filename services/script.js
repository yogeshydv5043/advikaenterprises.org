// ===== DOM READY FUNCTION =====
document.addEventListener('DOMContentLoaded', function () {
    // ===== PAGE LOAD INDICATOR =====
    const statusIndicator = document.getElementById('statusIndicator');
    statusIndicator.classList.add('loading');

    // Remove the indicator after page loads
    window.addEventListener('load', function () {
        setTimeout(function () {
            statusIndicator.style.opacity = '0';
            setTimeout(function () {
                statusIndicator.remove();
            }, 1000);
        }, 300);
    });

    // ===== THEME TOGGLE FUNCTIONALITY =====
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    } else {
        body.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        }
    });

    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ===== SCROLL TO TOP FUNCTIONALITY =====
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Header scroll effect
        const header = document.getElementById('mainHeader');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';

                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ANIMATION ON SCROLL =====
    const animateElements = document.querySelectorAll('.fade-in, .animate, .section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ===== SERVICE MODAL FUNCTIONALITY =====
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');

    // Service data
    const services = {
        'business-setup': {
            title: 'Business Setup Advisory',
            icon: 'building',
            description: 'Comprehensive guidance for establishing your business in India or abroad. We help you navigate legal requirements, regulatory compliance, and strategic planning for successful business formation and expansion.',
            features: [
                'StartUp Strategic Guidance & Funding Advisory',
                'India Entry Strategy formulation',
                'Project office setup in India and Abroad',
                'Branch office establishment in India & Abroad',
                'Liaison office setup in India and Abroad',
                'Business closing strategy and execution'
            ]
        },
        'gst-services': {
            title: 'Indirect Taxation Advisory',
            icon: 'receipt',
            description: 'Expert GST consulting services to ensure compliance and optimize your tax strategy. We handle everything from registration to representation before tax authorities.',
            features: [
                'Representation and Litigation under GST',
                'Comprehensive GST Advisory services',
                'End-to-end GST Outsourcing solutions',
                'Refund processing under GST',
                'Thorough GST Audit services',
                'GST Impact Analysis and compliance treatments'
            ]
        },
        'corporate-tax': {
            title: 'Corporate Tax Advisory',
            icon: 'chart-line',
            description: 'Strategic tax planning and compliance services for corporations. We help optimize your tax position while ensuring full compliance with regulations.',
            features: [
                'Direct Tax planning and compliance',
                'Withholding Tax Advisory services',
                'Transfer Pricing documentation and advisory',
                'International Taxation planning',
                'Tax optimization strategies',
                'Compliance with changing tax regulations'
            ]
        },
        'risk-assurance': {
            title: 'Risk & Assurance Advisory',
            icon: 'shield-alt',
            description: 'Comprehensive risk management and assurance services to protect your business interests and ensure regulatory compliance.',
            features: [
                'Statutory Audit services',
                'Internal Audit and controls assessment',
                'Due Diligence for mergers and acquisitions',
                'GST Review and compliance checking',
                'Management Audit for operational efficiency',
                'Risk assessment and mitigation strategies'
            ]
        },
        'cross-border': {
            title: 'Cross Border Transaction Advisory',
            icon: 'globe',
            description: 'Expert guidance for international business transactions, foreign exchange regulations, and cross-border taxation matters.',
            features: [
                'FEMA Advisory and compliance',
                'Transfer Pricing documentation and planning',
                'DTAA consultation and treaty benefits',
                'Services to NRI for investments and taxation',
                'Cross-border merger and acquisition advisory',
                'International tax planning and compliance'
            ]
        },
        'transactions': {
            title: 'Transactions Advisory Services',
            icon: 'handshake',
            description: 'End-to-end advisory services for business transactions, from mergers and acquisitions to joint ventures and strategic partnerships.',
            features: [
                'Merger & Acquisition advisory',
                'Joint Venture formation and structuring',
                'Business setup in India for foreign entities',
                'Business setup outside India for Indian companies',
                'Transaction structuring and negotiation',
                'Post-transaction integration support'
            ]
        }
    };

    // Add click event to service buttons
    document.querySelectorAll('[data-service]').forEach(button => {
        button.addEventListener('click', () => {
            const serviceKey = button.getAttribute('data-service');
            const service = services[serviceKey];

            if (service) {
                modalTitle.textContent = service.title;
                modalIcon.className = `fas fa-${service.icon}`;
                modalDescription.textContent = service.description;

                // Clear existing features
                modalFeatures.innerHTML = '';

                // Add new features
                service.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });

                // Show modal
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});