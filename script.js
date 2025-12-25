// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // ===== FORM VALIDATION (BOOKING PAGE) =====
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }

    // ===== SET MIN DATE FOR BOOKING =====
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // ===== SMOOTH SCROLL FOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к карточкам
    document.querySelectorAll('.service-card, .feature-card, .review-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(card);
    });
});

// ===== FORM VALIDATION FUNCTION =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Очистка предыдущих ошибок
    clearErrors();

    // Получение значений полей
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;

    let isValid = true;

    // Валидация имени
    if (name === '') {
        showError('nameError', 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'Имя должно содержать минимум 2 символа');
        isValid = false;
    }

    // Валидация телефона
    if (phone === '') {
        showError('phoneError', 'Пожалуйста, введите номер телефона');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('phoneError', 'Введите корректный номер телефона');
        isValid = false;
    }

    // Валидация email (если заполнен)
    if (email !== '' && !validateEmail(email)) {
        showError('emailError', 'Введите корректный email адрес');
        isValid = false;
    }

    // Валидация услуги
    if (service === '') {
        showError('serviceError', 'Пожалуйста, выберите услугу');
        isValid = false;
    }

    // Если все валидно - отправляем
    if (isValid) {
        submitForm();
    }
}

// ===== HELPER FUNCTIONS =====
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Проверка на наличие хотя бы 10 цифр
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
}

function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;

    // Показываем сообщение об успехе
    alert(`Спасибо, ${name}!\n\nВаша заявка на "${getServiceName(service)}" принята.\nМы свяжемся с вами по номеру ${phone} в ближайшее время.`);

    // Очищаем форму
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('service').value = '';
    document.getElementById('date').value = '';
    document.getElementById('message').value = '';
}

function getServiceName(serviceValue) {
    const services = {
        'diagnostics': 'Диагностика двигателя',
        'oil': 'Замена масла',
        'suspension': 'Ремонт подвески',
        'tires': 'Шиномонтаж',
        'maintenance': 'Техобслуживание',
        'brakes': 'Ремонт тормозов'
    };
    return services[serviceValue] || serviceValue;
}

// ===== PHONE INPUT FORMATTING =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            } else if (value[0] !== '7') {
                value = '7' + value;
            }

            let formattedValue = '+7';

            if (value.length > 1) {
                formattedValue += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formattedValue += '-' + value.substring(9, 11);
            }

            e.target.value = formattedValue;
        }
    });
}

// ===== LOGO CLICK TO HOME =====
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// ===== ADD ACTIVE CLASS TO CURRENT PAGE =====
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== ANIMATION FOR CARDS ON HOVER =====
document.querySelectorAll('.service-card, .service-card-full').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}