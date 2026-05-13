// 1. CONFIGURATION & AI KEY
const HF_CONFIG = {
    token: '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', // PASTE YOUR TOKEN HERE
    model: 'mistralai/Mistral-7B-Instruct-v0.2'
};

// GLOBAL KNOWLEDGE DATABASE
const VITAL_KNOWLEDGE = {
    products: [
        {
            keywords: ['bp', 'blood pressure', 'hypertension', 'wrist', 'monitor'],
            title: "Bluetooth Wrist BP Monitor",
            summary: "A wearable blood pressure monitor for convenient and accurate daily BP tracking at home with Bluetooth connectivity.",
            link: "store.html", tag: "Monitoring", priceValue: 11999
        },
        {
            keywords: ['glucometer', 'sugar', 'diabetes', 'glucose', 'insulin'],
            title: "Glucometer GL 44 Black",
            summary: "Digital glucometer designed for fast, reliable, and accurate blood sugar monitoring with a compact design.",
            link: "store.html", tag: "Monitoring", priceValue: 7499
        },
        {
            keywords: ['thermometer', 'temp', 'fever', 'heat', 'feverish'],
            title: "Digital Thermometer (Non-Contact)",
            summary: "Touch-free infrared thermometer for fast, accurate, and hygienic temperature readings in seconds.",
            link: "store.html", tag: "Monitoring", priceValue: 4500
        },
        {
            keywords: ['scale', 'weight', 'fat', 'bmi', 'weighing'],
            title: "Glass Weighing Scale",
            summary: "Modern tempered glass scale with high-precision sensors for consistent body weight measurement.",
            link: "store.html", tag: "Wellness", priceValue: 3499
        },
        {
            keywords: ['necklace', 'purifier', 'air', 'breath', 'pollution'],
            title: "Portable Air Purifier Necklace",
            summary: "Wearable air filtration support in a lightweight design to provide cleaner air during daily activities.",
            link: "store.html", tag: "Wellness", priceValue: 1499
        },
        {
            keywords: ['mask', 'sleep', 'wireless', 'music', 'eyes', 'insomnia'],
            title: "Wireless Sleep Mask",
            summary: "Soft light-blocking mask with integrated wireless audio to support relaxation and deep sleep cycles.",
            link: "store.html", tag: "Wellness", priceValue: 6399
        },
        {
            keywords: ['eye', 'spray', 'moisturiser', 'dry eyes', 'vision'],
            title: "Eye Moisturising Spray",
            summary: "Refreshing mist that relieves dryness and soothes tired eyes instantly. Safe for daily use.",
            link: "store.html", tag: "Wellness", priceValue: 2499
        },
        {
            keywords: ['hearing', 'amplifier', 'ear', 'deaf', 'sound', 'aid'],
            title: "Hearing Amplifiers",
            summary: "Compact amplifiers that enhance sound clarity and volume for improved everyday listening.",
            link: "store.html", tag: "Wellness", priceValue: 10999
        },
        {
            keywords: ['bottle', 'water', 'uv', 'clean', 'self cleaning', 'drink'],
            title: "Smart Self-Cleaning Water Bottle",
            summary: "UV-powered technology that eliminates bacteria to keep your drinking water clean and fresh.",
            link: "store.html", tag: "Wellness", priceValue: 18999
        },
        {
            keywords: ['ring', 'smart ring', 'tk9', 'titanium', 'finger'],
            title: "TK9 Smart Ring",
            summary: "Discreet titanium wearable that tracks your health and daily activity data with long battery life.",
            link: "store.html", tag: "Wearables", priceValue: 13999
        },
        {
            keywords: ['band', 'fitness', 'lige', 'step', 'watch', 'tracker'],
            title: "LIGE Fitness Band",
            summary: "A sleek fitness band designed to track steps, activity, and essential health metrics 24/7.",
            link: "store.html", tag: "Wearables", priceValue: 10999
        },
        {
            keywords: ['octopus', 'claw', 'head', 'massager', 'stress'],
            title: "Electric Octopus Claw",
            summary: "Handheld electric massager with multiple nodes to relieve muscle stress and improve relaxation.",
            link: "store.html", tag: "Relaxation", priceValue: 5499
        },
        {
            keywords: ['pad', 'massage pad', 'full body', 'vibration', 'chair'],
            title: "Full Body Massage Pad",
            summary: "Full-length pad providing soothing vibrations and multiple modes for total body relaxation.",
            link: "store.html", tag: "Relaxation", priceValue: 19999
        },
        {
            keywords: ['belt', 'heating', 'back pain', 'heat', 'stiffness'],
            title: "Heating Belt for the Back",
            summary: "Electric heating belt with adjustable levels to reduce back pain and muscle stiffness effectively.",
            link: "store.html", tag: "Pain Relief", priceValue: 14999
        },
        {
            keywords: ['electronic', 'portable massager', 'muscle', 'tens'],
            title: "Electronic Massage Pad",
            summary: "Compact and portable vibration therapy pad for targeted muscle relaxation on the go.",
            link: "store.html", tag: "Pain Relief", priceValue: 2999
        },
        {
            keywords: ['knee', 'joint', 'arthritis', 'knee massager'],
            title: "Portable Knee Massager",
            summary: "Wearable therapy device combining heat and vibration to provide instant joint relief.",
            link: "store.html", tag: "Pain Relief", priceValue: 9999
        },
        {
            keywords: ['elliptical', 'machine', 'cycle', 'desk', 'exercise', 'legs'],
            title: "Under Desk Elliptical",
            summary: "Low-impact machine for leg exercise while seated. Improves circulation with quiet operation.",
            link: "store.html", tag: "Fitness", priceValue: 75499
        },
        {
            keywords: ['calorie', 'counter', 'diet', 'macros', 'weight loss'],
            title: "Calorie Counter",
            summary: "Digital interface to help monitor daily intake and maintain a healthier nutritional lifestyle.",
            link: "store.html", tag: "Nutrition", priceValue: 14999
        },
        {
            keywords: ['flosser', 'water', 'teeth', 'dental', 'gums', 'oral'],
            title: "Water Flosser",
            summary: "High-pressure water stream device that gently cleans between teeth for superior oral hygiene.",
            link: "store.html", tag: "Dental", priceValue: 5999
        },
        {
            keywords: ['toothbrush', 'brush', 'electric brush', 'timer'],
            title: "Smart Timer Electric Brush",
            summary: "Rechargeable electric toothbrush with smart timing for more effective daily dental cleaning.",
            link: "store.html", tag: "Dental", priceValue: 2299
        },
        {
            keywords: ['choking', 'anti-choking', 'suction', 'emergency', 'airway'],
            title: "Anti-Choking Suction Device",
            summary: "Life-saving emergency device designed to quickly and safely clear airway blockages.",
            link: "store.html", tag: "Safety", priceValue: 5299
        },
        {
            keywords: ['cane', 'walking', 'stick', 'mobility', 'balance', 'support'],
            title: "Foldable 4-Legged Cane",
            summary: "Stable walking cane with a four-leg base and adjustable height for reliable balance and support.",
            link: "store.html", tag: "Mobility", priceValue: 5999
        }
    ],
    services: [
        {
            keywords: ['xray', 'x-ray', 'scan', 'bones', 'fracture'],
            title: "Neural X-Ray Analysis",
            summary: "AI-powered skeletal mapping to detect fractures and alignment issues with hospital-grade precision.",
            link: "xray.html", tag: "AI Diagnostic"
        }
    ],
    site_features: {
        booking: {
            keywords: ['book', 'appointment', 'doctor', 'schedule'],
            response: "Head over to our **Appointments** page to schedule a session with our specialists."
        }
    }
};

// HELPER: CURRENCY FORMATTER
function getAIFitPrice(amount) {
    if (!amount) return '';
    const config = {
        PKR: { symbol: "Rs.", rate: 1 },
        USD: { symbol: "$", rate: 0.0036 }
    };
    const current = localStorage.getItem('selectedCurrency') || 'PKR';
    const activeConfig = config[current];
    const converted = (amount * activeConfig.rate).toFixed(current === 'USD' ? 2 : 0);
    return `${activeConfig.symbol} ${Number(converted).toLocaleString()}`;
}

// TOGGLE HUB
function toggleAIHub() {
    const hub = document.getElementById('ai-hub');
    hub.classList.toggle('translate-y-[120%]');
    hub.classList.toggle('opacity-0');
    hub.classList.toggle('translate-y-0');
    hub.classList.toggle('opacity-100');
}

// ENHANCED CORE AI LOGIC
async function processAIQuery() {
    const input = document.getElementById('ai-input');
    const rawQuery = input.value.trim();
    const query = rawQuery.toLowerCase();
    if (!query) return;

    appendMessage('user', rawQuery);
    input.value = '';

    // Show a "typing" indicator
    const typingId = showTypingIndicator();

    // 1. TRY EXACT KEYWORD MATCH (Fast Local Response)
    const allItems = [...VITAL_KNOWLEDGE.products, ...VITAL_KNOWLEDGE.services];
    const foundItem = allItems.find(item => item.keywords.some(key => query.includes(key)));

    if (foundItem) {
        removeTypingIndicator(typingId);
        appendResponse(foundItem);
        return;
    }

    // 2. TRY SITE FEATURES MATCH
    let featureResponse = null;
    Object.values(VITAL_KNOWLEDGE.site_features).forEach(feature => {
        if (feature.keywords.some(key => query.includes(key))) {
            featureResponse = feature.response;
        }
    });

    if (featureResponse) {
        removeTypingIndicator(typingId);
        appendMessage('bot', featureResponse);
        return;
    }

    // 3. FALLBACK: ASK HUGGING FACE (Brainy AI Response)
    const aiAnswer = await callHuggingFaceAI(rawQuery);
    removeTypingIndicator(typingId);
    appendMessage('bot', aiAnswer);
}

async function callHuggingFaceAI(userMessage) {
    // Construct knowledge context for the AI
    const productList = VITAL_KNOWLEDGE.products.map(p => p.title).join(", ");
    
    const prompt = `[INST] You are the Vital Hub Assistant. 
    Our products: ${productList}.
    User asks: "${userMessage}"
    Provide a brief, helpful medical-themed response. If they ask about a product we have, mention it. Keep it under 50 words. [/INST]`;

    try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${HF_CONFIG.model}`, {
            headers: { 
                "Authorization": `Bearer ${HF_CONFIG.token}`,
                "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_new_tokens: 150, temperature: 0.7 }
            }),
        });

        const result = await response.json();
        
        // Clean up response: Mistral returns the prompt + answer, we just want the answer
        let text = result[0].generated_text;
        return text.split('[/INST]').pop().trim();

    } catch (error) {
        console.error("AI API Error:", error);
        return "I'm experiencing a neural sync error. Please try searching for a specific product like 'Smart Ring'.";
    }
}

// UI RENDERING HELPERS
function appendMessage(role, text) {
    const content = document.getElementById('ai-content');
    const msg = document.createElement('div');
    msg.className = `flex gap-3 mb-4 ${role === 'user' ? 'flex-row-reverse' : ''}`;
    msg.innerHTML = `
        <div class="w-8 h-8 ${role === 'user' ? 'bg-slate-900' : 'bg-blue-100'} text-${role === 'user' ? 'white' : 'blue-600'} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <i data-lucide="${role === 'user' ? 'user' : 'sparkles'}" size="14"></i>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-[80%]">
            <p class="text-xs font-bold text-slate-700 leading-relaxed">${text}</p>
        </div>
    `;
    content.appendChild(msg);
    content.scrollTop = content.scrollHeight;
    if(window.lucide) lucide.createIcons();
}

function appendResponse(data) {
    const content = document.getElementById('ai-content');
    const card = document.createElement('div');
    card.className = "animate-result mb-6";
    const displayPrice = getAIFitPrice(data.priceValue);

    card.innerHTML = `
        <div class="bg-white border-2 border-blue-600 p-6 rounded-[35px] shadow-xl shadow-blue-50">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[8px] font-black bg-blue-600 text-white px-2 py-1 rounded-full uppercase tracking-tighter">${data.tag}</span>
                <span class="text-[10px] font-black text-slate-400">${displayPrice}</span>
            </div>
            <h4 class="text-lg font-black text-slate-900 mb-2 leading-tight">${data.title}</h4>
            <p class="text-[11px] text-slate-500 mb-4 font-medium leading-relaxed">${data.summary}</p>
            <button onclick="window.location.href='${data.link}'" class="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                View Full Details
            </button>
        </div>
    `;
    content.appendChild(card);
    content.scrollTop = content.scrollHeight;
}

function showTypingIndicator() {
    const content = document.getElementById('ai-content');
    const id = 'typing-' + Date.now();
    const indicator = document.createElement('div');
    indicator.id = id;
    indicator.className = "flex gap-2 mb-4 animate-pulse";
    indicator.innerHTML = `
        <div class="w-2 h-2 bg-blue-300 rounded-full"></div>
        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
        <div class="w-2 h-2 bg-blue-300 rounded-full"></div>
    `;
    content.appendChild(indicator);
    content.scrollTop = content.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}