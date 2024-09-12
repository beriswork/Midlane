const bikeData = [
    { name: "Royal Enfield Himalayan", price: 1500, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543210" },
    { name: "Hero Maverick", price: 1200, image: "images/Hero_Maverick.png", phone: "+91 9876543211" },
    { name: "Suzuki Access 125", price: 800, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543212" },
    { name: "Royal Enfield Classic 350", price: 1300, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543213" },
    { name: "Hero Splendor Plus", price: 600, image: "images/Hero_Maverick.png", phone: "+91 9876543214" },
    { name: "Honda Activa 6G", price: 700, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543215" },
    { name: "Bajaj Pulsar NS200", price: 1100, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543216" },
    { name: "TVS Apache RTR 160", price: 900, image: "images/Hero_Maverick.png", phone: "+91 9876543217" },
    { name: "Yamaha FZ-S", price: 1000, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543218" },
    { name: "KTM Duke 200", price: 1400, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543219" },
    { name: "Bajaj Avenger Cruise 220", price: 1050, image: "images/Hero_Maverick.png", phone: "+91 9876543220" },
    { name: "Honda CB Shine", price: 750, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543221" },
    { name: "TVS Jupiter", price: 650, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543222" },
    { name: "Suzuki Gixxer", price: 950, image: "images/Hero_Maverick.png", phone: "+91 9876543223" },
    { name: "Royal Enfield Thunderbird 350X", price: 1350, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543224" },
    { name: "Hero Xtreme 160R", price: 850, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543225" },
    { name: "Bajaj Dominar 400", price: 1600, image: "images/Hero_Maverick.png", phone: "+91 9876543226" },
    { name: "Honda CB Hornet 160R", price: 920, image: "images/SUZUKI_ACCESS_125_(BS6).png", phone: "+91 9876543227" },
    { name: "TVS NTORQ 125", price: 780, image: "images/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png", phone: "+91 9876543228" },
    { name: "Yamaha R15 V3", price: 1450, image: "images/Hero_Maverick.png", phone: "+91 9876543229" }
];

async function createBikeCard(bike) {
    const card = document.createElement('div');
    card.className = 'bike-card';
    
    card.innerHTML = `
        <img src="${bike.image}" alt="${bike.name}">
        <div class="bike-card-content">
            <h3>${bike.name}</h3>
            <p><i data-feather="tag"></i> Rental Price: ₹${bike.price}/day</p>
            <div class="bike-card-buttons">
                <button class="details-btn" onclick="showDetails('${bike.name}', '${bike.price}', '${bike.image}')"><i data-feather="info"></i> More Details</button>
                <button class="book-btn" onclick="bookBike('${bike.phone}')"><i data-feather="phone"></i> Book Now</button>
            </div>
        </div>
    `;
    feather.replace();
    return card;
}

async function renderBikeCards(sortedData = bikeData) {
    const bikeGrid = document.querySelector('.bike-grid');
    bikeGrid.innerHTML = ''; // Clear existing cards
    for (const bike of sortedData) {
        const card = await createBikeCard(bike);
        bikeGrid.appendChild(card);
    }
}

function showDetails(name, price, image) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" style="width: 100%; max-height: 300px; object-fit: cover;">
            <p>Rental Price: ₹${price}/day</p>
            <p>This high-quality bike is perfect for your adventures. It comes with all necessary safety equipment and is regularly maintained for optimal performance.</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function bookBike(phone) {
    const modal = document.createElement('div');
    modal.className = 'modal booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2><i data-feather="phone"></i> Book Your Ride</h2>
            <p>Sign up in just 5 seconds and get a discount code!</p>
            <input type="tel" id="phoneInput" placeholder="Enter your 10-digit mobile number" pattern="[0-9]{10}" required>
            <button id="signUpButton" onclick="signUp()"><i data-feather="user-plus"></i> Sign Up & Get Discount</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    feather.replace();
}

function signUp() {
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput.checkValidity()) {
        const discountCode = generateDiscountCode();
        alert(`Thank you for signing up! Your discount code is: ${discountCode}`);
        closeModal();
        // Now you can initiate the call
        window.location.href = `tel:${phoneInput.value}`;
    } else {
        alert('Please enter a valid 10-digit mobile number.');
    }
}

function generateDiscountCode() {
    return 'MIDLANE' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function sortBikes(order) {
    const sortedData = [...bikeData].sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    renderBikeCards(sortedData);
}

// Spin Wheel
const spinWheelPopup = document.getElementById('spinWheelPopup');
const emailInput = document.getElementById('emailInput');
const spinButton = document.getElementById('spinButton');
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');
const spinResult = document.getElementById('spinResult');

const prizes = [
    'Free Helmet', 'Free Driving Gear', '10% Off', '15% Off', '20% Off', 'Free Day Rental'
];

let spinning = false;

function drawWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = wheelCanvas.width / 2 - 10;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    for (let i = 0; i < prizes.length; i++) {
        const angle = (i / prizes.length) * 2 * Math.PI;
        const endAngle = ((i + 1) / prizes.length) * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, endAngle);
        ctx.closePath();

        ctx.fillStyle = i % 2 === 0 ? '#4a4ae9' : '#1a1a2e';
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + (1 / prizes.length) * Math.PI);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(prizes[i], radius - 10, 5);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    const email = emailInput.value;
    if (!email) {
        alert('Please enter your email address');
        spinning = false;
        return;
    }

    const rotations = 5;
    const degrees = 360 * rotations + Math.floor(Math.random() * 360);
    const duration = 5000;

    wheelCanvas.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    wheelCanvas.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        spinning = false;
        const resultIndex = Math.floor(((360 - (degrees % 360)) / 360) * prizes.length);
        spinResult.textContent = `You won: 20% Off!`;
        
        setTimeout(() => {
            spinWheelPopup.style.display = 'none';
            // Redirect to bike selection
            document.querySelector('.bike-grid').scrollIntoView({ behavior: 'smooth' });
        }, 3000);
    }, duration);
}

spinButton.addEventListener('click', spinWheel);

document.addEventListener('DOMContentLoaded', () => {
    renderBikeCards();

    const sortDropdown = document.getElementById('sortDropdown');
    sortDropdown.addEventListener('change', (e) => {
        sortBikes(e.target.value);
    });

    // Price range slider
    const priceRange = document.getElementById('price-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    noUiSlider.create(priceRange, {
        start: [0, 5000],
        connect: true,
        step: 100,
        range: {
            'min': 0,
            'max': 5000
        },
        format: {
            to: value => Math.round(value),
            from: value => Math.round(value)
        }
    });

    priceRange.noUiSlider.on('update', (values, handle) => {
        const value = values[handle];
        if (handle) {
            maxPrice.value = value;
        } else {
            minPrice.value = value;
        }
    });

    priceRange.noUiSlider.on('change', filterBikes);

    minPrice.addEventListener('change', () => {
        priceRange.noUiSlider.set([minPrice.value, null]);
    });

    maxPrice.addEventListener('change', () => {
        priceRange.noUiSlider.set([null, maxPrice.value]);
    });

    function filterBikes() {
        const min = parseInt(minPrice.value);
        const max = parseInt(maxPrice.value);
        const filteredBikes = bikeData.filter(bike => bike.price >= min && bike.price <= max);
        renderBikeCards(filteredBikes);
    }

    // ... existing spin wheel code ...
});

// Sticky header
const header = document.getElementById('main-header');
const sticky = header.offsetTop;

function makeHeaderSticky() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

window.addEventListener('scroll', makeHeaderSticky);