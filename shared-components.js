/**
 * VITAL HUB — SHARED HEADER HTML SNIPPET (copy into each page)
 * 
 * STANDARD HEADER (paste inside <body>, before main content):
 *
<div id="progress-bar"></div>
<header class="site-header flex justify-between items-center px-6 lg:px-12 py-4 lg:py-6 bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-50 transition-shadow duration-300">
    <div class="flex items-center gap-2 cursor-pointer" onclick="window.location.href='index.html'">
        <div class="bg-blue-600 p-1.5 lg:p-2 rounded-xl text-white shadow-lg shadow-blue-100">
            <i data-lucide="activity" class="w-5 h-5"></i>
        </div>
        <span class="text-xl lg:text-2xl font-black tracking-tighter text-blue-900 uppercase">Vital Hub</span>
    </div>
    <nav class="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <a href="index.html" class="nav-link hover:text-blue-600 transition">Home</a>
        <a href="store.html" class="nav-link hover:text-blue-600 transition">Store</a>
        <a href="nutrition.html" class="nav-link hover:text-blue-600 transition">Nutrition AI</a>
        <a href="xray.html" class="nav-link hover:text-blue-600 transition">X-Ray</a>
        <a href="appointment.html" class="nav-link hover:text-blue-600 transition">Appointments</a>
    </nav>
    <div class="flex items-center gap-4 lg:gap-6">
        <a href="checkout.html" class="relative group">
            <i data-lucide="shopping-cart" class="text-slate-400 group-hover:text-blue-600 transition w-5 h-5"></i>
            <span id="cart-count" class="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full items-center justify-center font-bold" style="display:none;">0</span>
        </a>
        <button onclick="window.location.href='auth.html'" class="hidden sm:block bg-blue-600 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-bold text-[10px] shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all">
            JOIN NOW
        </button>
        <button class="lg:hidden p-2 text-slate-400" onclick="toggleMobileNav()">
            <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
    </div>
</header>
<div id="mobile-nav" class="hidden fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center gap-8 text-2xl font-black uppercase tracking-widest">
    <button onclick="toggleMobileNav()" class="absolute top-6 right-6 p-2 text-slate-400"><i data-lucide="x"></i></button>
    <a href="index.html" onclick="toggleMobileNav()" class="text-slate-900 hover:text-blue-600 transition">Home</a>
    <a href="store.html" onclick="toggleMobileNav()" class="text-slate-900 hover:text-blue-600 transition">Store</a>
    <a href="nutrition.html" onclick="toggleMobileNav()" class="text-slate-900 hover:text-blue-600 transition">Nutrition AI</a>
    <a href="xray.html" onclick="toggleMobileNav()" class="text-slate-900 hover:text-blue-600 transition">X-Ray</a>
    <a href="appointment.html" onclick="toggleMobileNav()" class="text-slate-900 hover:text-blue-600 transition">Appointments</a>
    <a href="auth.html" class="bg-blue-600 text-white px-10 py-4 rounded-full text-sm hover:bg-slate-900 transition">Join Now</a>
</div>
 */