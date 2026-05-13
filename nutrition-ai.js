/**
 * Vital Hub | Neural Nutrition Engine v3.1.2
 * Refined: Model State Management & High-Fidelity Rendering
 */

const NUTRITION_CONFIG = {
    API_TOKEN: "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", 
    MODEL: "mistralai/Mistral-7B-Instruct-v0.2",
    BASE_URL: "https://api-inference.huggingface.co/models/"
};

let userGeoLocation = "Global";
let isProcessing = false;

// 1. Initial Interface Setup
window.onload = async () => {
    // Detect Geo-Location for Regional Dish Customization
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`);
                const data = await res.json();
                userGeoLocation = `${data.city}, ${data.countryName}`;
                const locBadge = document.getElementById('user-location');
                if (locBadge) locBadge.innerText = userGeoLocation;
            } catch (e) {
                console.warn("Location detection failed. Defaulting to Global.");
            }
        });
    }
    if (window.lucide) lucide.createIcons();
};

/**
 * Main Analysis Pipeline
 */
async function generateNutritionAI() {
    if (isProcessing) return; // Prevent double submission

    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const goalSelect = document.getElementById('goal');
    const goal = goalSelect.options[goalSelect.selectedIndex].text;
    const medical = document.getElementById('medical-input')?.value || "No specific conditions";

    if (!age || !weight || !height) {
        alert("Vital Hub requires full biometrics to generate a precision plan.");
        return;
    }

    isProcessing = true;
    const readyUI = document.getElementById('ready-ui');
    const resultUI = document.getElementById('result-ui');
    
    // UI State: Loading
    if (readyUI) {
        readyUI.innerHTML = `
            <div class="flex flex-col items-center gap-6 text-center animate-pulse">
                <div class="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                <div class="space-y-2">
                    <p id="loading-status" class="text-white font-black text-[10px] uppercase tracking-[0.3em]">Mapping Metabolic Pathways</p>
                    <p class="text-slate-500 text-[9px] uppercase tracking-widest">Neural Core v2.0 is processing your biometrics...</p>
                </div>
            </div>
        `;
    }

    // Biometric Calculations
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    const bmr = (10 * weight) + (6.25 * height) - (5 * age);
    const targetCals = Math.round(bmr * 1.4); // TDEE Estimate

    // Device Recommendation Logic
    let suggestedDevice = "BF 180 Body Analyzer";
    const medContext = medical.toLowerCase();
    if (medContext.includes("diabetes") || medContext.includes("sugar")) suggestedDevice = "Glucometer GL 44";
    if (medContext.includes("bp") || medContext.includes("pressure") || medContext.includes("heart")) suggestedDevice = "BM 27 Blood Pressure Monitor";

    // AI Prompt Construction
    const prompt = `[INST] You are the Vital Hub Medical AI. Create a high-performance health plan for: 
    - Profile: Age ${age}, BMI ${bmi}
    - Location: ${userGeoLocation}
    - Objective: ${goal}
    - Medical Flags: ${medical}

    Provide:
    1. Daily Macro-nutrient distribution.
    2. A 7-Day Meal Table featuring ${userGeoLocation} regional healthy options.
    3. Training protocol.
    4. Clinical justification for using the ${suggestedDevice}.
    Use professional medical terminology, bold headers, and clean bullet points. [/INST]`;

    try {
        const response = await fetch(`${NUTRITION_CONFIG.BASE_URL}${NUTRITION_CONFIG.MODEL}`, {
            headers: { 
                "Authorization": `Bearer ${NUTRITION_CONFIG.API_TOKEN}`, 
                "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({ 
                inputs: prompt, 
                parameters: { max_new_tokens: 1800, temperature: 0.6, top_p: 0.9 },
                options: { wait_for_model: true } 
            })
        });

        const result = await response.json();

        // Handle Model Warm-up (Hugging Face Specific)
        if (result.error && result.error.includes("currently loading")) {
            const statusText = document.getElementById('loading-status');
            if (statusText) statusText.innerText = "Synchronizing Neural Nodes (50%)...";
            
            isProcessing = false;
            setTimeout(generateNutritionAI, 8000); // Intelligent Retry
            return;
        }

        const aiRawResponse = result[0].generated_text.split('[/INST]').pop().trim();

        // Final UI Rendering
        if (readyUI) readyUI.classList.add('hidden');
        if (resultUI) {
            resultUI.classList.remove('hidden');
            document.getElementById('bmi-out').innerText = `BMI: ${bmi}`;
            document.getElementById('device-out').innerText = suggestedDevice;
            document.getElementById('calories-out').innerHTML = `${targetCals} <span class="text-sm text-emerald-500 font-bold">kcal/day</span>`;
            
            // Precision Markdown Parser
            const formattedContent = aiRawResponse
                .replace(/### (.*?)(?:<br>|\n|$)/g, '<h5 class="text-emerald-400 font-black uppercase tracking-widest text-[12px] mt-8 mb-4 border-l-2 border-emerald-500 pl-3">$1</h5>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                .replace(/^\s*[-•*]\s/gm, '<div class="flex items-start mb-2"><span class="text-emerald-500 mr-2">/</span><span class="text-slate-300">')
                .replace(/\n/g, '</span></div><div class="h-0"></div>') // Close bullet spans and handle line breaks
                .replace(/(\d+\.\s)/g, '<span class="text-blue-500 font-black mr-1">$1</span>');

            document.getElementById('weekly-plan-content').innerHTML = formattedContent;
        }

    } catch (error) {
        console.error("Vital Hub AI Node Error:", error);
        const statusText = document.getElementById('loading-status');
        if (statusText) statusText.innerText = "Connection Interrupted. Retrying...";
        setTimeout(() => { isProcessing = false; generateNutritionAI(); }, 3000);
    } finally {
        isProcessing = false;
        if (window.lucide) lucide.createIcons();
    }
}