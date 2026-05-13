/**
 * VITAL HUB - UNIFIED CORE LOGIC
 * Handles Cart, Currency Conversion, and Checkout UI
 */

// 1. Initialize State (Unified Key)
let cart = JSON.parse(localStorage.getItem('vitalHub_cart')) || [];
let currentCurrency = localStorage.getItem('selectedCurrency') || 'PKR';

const CURRENCY_CONFIG = {
    PKR: { symbol: "Rs.", rate: 1 },
    USD: { symbol: "$", rate: 0.0036 } 
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    updateCartUI();
    if (document.getElementById('checkout-list')) {
        renderCheckout();
    }
});

// 2. Helper: Format Price based on Currency
function formatPrice(amount) {
    const config = CURRENCY_CONFIG[currentCurrency];
    const converted = (amount * config.rate).toFixed(currentCurrency === 'USD' ? 2 : 0);
    return `${config.symbol} ${Number(converted).toLocaleString()}`;
}

// 3. Global UI Update (Badge)
function updateCartUI() {
    const badges = document.querySelectorAll('#cart-count');
    badges.forEach(badge => {
        badge.innerText = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// 4. Add to Cart
window.addToCart = function(productId) {
    // 'products' must be defined in your products.js
    const productData = products.find(p => p.id === productId);
    
    if (productData) {
        const cartItem = {
            cartId: Date.now() + Math.random(),
            id: productData.id,
            name: productData.name,
            price: productData.price,
            img: productData.img
        };
        
        cart.push(cartItem);
        localStorage.setItem('vitalHub_cart', JSON.stringify(cart));
        updateCartUI();
        alert(`${productData.name} added to your health plan!`);
        if (document.getElementById('checkout-list')) renderCheckout();
    }
};

// 5. Render Checkout & Currency Toggle Logic
function renderCheckout() {
    const list = document.getElementById('checkout-list');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    const btnPKR = document.getElementById('btn-pkr');
    const btnUSD = document.getElementById('btn-usd');

    if (!list) return;

    // Update Currency Buttons Toggle UI
    if (btnPKR && btnUSD) {
        btnPKR.className = currentCurrency === 'PKR' 
            ? 'px-4 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-white transition-all shadow-md' 
            : 'px-4 py-2 rounded-xl text-[10px] font-black bg-white text-slate-400 hover:text-slate-900 transition-all';
        btnUSD.className = currentCurrency === 'USD' 
            ? 'px-4 py-2 rounded-xl text-[10px] font-black bg-slate-900 text-white transition-all shadow-md' 
            : 'px-4 py-2 rounded-xl text-[10px] font-black bg-white text-slate-400 hover:text-slate-900 transition-all';
    }

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="py-10 text-center border border-dashed border-white/10 rounded-3xl">
                <p class="text-slate-500 text-[10px] font-black uppercase tracking-widest">Your health plan is empty.</p>
            </div>`;
        if (subtotalEl) subtotalEl.innerText = formatPrice(0);
        if (totalEl) totalEl.innerText = formatPrice(0);
        return;
    }

    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="flex gap-4 items-center group animate-in fade-in slide-in-from-right-4 duration-300">
                <div class="w-14 h-14 bg-white rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
                    <img src="${item.img}" class="w-full h-full object-contain">
                </div>
                <div class="flex-grow">
                    <h4 class="text-[10px] font-black uppercase tracking-tight text-white/90 leading-tight">${item.name}</h4>
                    <p class="text-blue-400 text-[10px] font-black mt-1">${formatPrice(item.price)}</p>
                </div>
                <button onclick="removeFromCart(${item.cartId})" class="p-2 text-slate-600 hover:text-red-400 transition-colors">
                    <i data-lucide="trash-2" size="14"></i>
                </button>
            </div>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.innerText = formatPrice(total);
    if (totalEl) totalEl.innerText = formatPrice(total);
    
    if (window.lucide) lucide.createIcons();
}

// 6. Change Currency
window.changeCurrency = function(currencyCode) {
    currentCurrency = currencyCode;
    localStorage.setItem('selectedCurrency', currencyCode);
    renderCheckout();
};

// 7. Remove Item
window.removeFromCart = function(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    localStorage.setItem('vitalHub_cart', JSON.stringify(cart));
    updateCartUI();
    renderCheckout();
};

// 8. Process Order
window.processOrder = function() {
    if (cart.length === 0) {
        alert("Your health plan is empty!");
        return;
    }

    const btn = event.currentTarget;
    btn.innerText = "PROCESSING PAYMENT...";
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');

    setTimeout(() => {
        localStorage.removeItem('vitalHub_cart');
        window.location.href = 'thank-you.html';
    }, 1500);
};