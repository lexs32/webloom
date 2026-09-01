/**
 * ==============================================================================
 *  🎨 LIVE CLIENT THEME & PALETTE CUSTOMIZER DRAWER
 * ==============================================================================
 *  Allows presenting clients with interactive live palette switching,
 *  custom hex color pickers, and instant branding adjustments.
 * ==============================================================================
 */

(function initThemeCustomizer() {
  window.addEventListener('DOMContentLoaded', () => {
    const cfg = window.STORE_CONFIG;
    if (!cfg) return;

    const drawer = document.createElement('div');
    drawer.id = 'themeCustomizerDrawer';
    drawer.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none font-sans';
    
    drawer.innerHTML = `
      <!-- Toggle Floating Pill -->
      <button id="themeToggleBtn" onclick="toggleCustomizer()" class="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#12161F]/95 hover:bg-[#1A202C] text-white border border-white/10 shadow-2xl backdrop-blur-xl transition hover:scale-105 active:scale-95 group">
        <span class="w-3 h-3 rounded-full animate-ping" style="background: var(--color-primary, #7182FF);"></span>
        <svg class="w-4 h-4 text-slate-300 group-hover:rotate-45 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
        <span class="text-xs font-bold tracking-wider uppercase text-slate-200">Theme Engine</span>
      </button>

      <!-- Panel Window -->
      <div id="themePanel" class="hidden mt-3 w-80 p-5 rounded-2xl bg-[#090D15]/95 border border-white/15 shadow-2xl backdrop-blur-2xl flex-col gap-4">
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h4 class="text-sm font-bold text-white tracking-wide">Client Theme Engine</h4>
            <p class="text-[11px] text-slate-400">1-Click Live Rebranding</p>
          </div>
          <button onclick="toggleCustomizer()" class="text-slate-400 hover:text-white text-sm p-1">&times;</button>
        </div>

        <!-- Presets Grid -->
        <div>
          <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Preset Palettes</label>
          <div class="grid grid-cols-3 gap-2">
            ${Object.keys(cfg.theme.presets).map(k => {
              const p = cfg.theme.presets[k];
              return `
                <button onclick="selectPreset('${k}')" class="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition group">
                  <div class="w-6 h-6 rounded-full shadow-md flex items-center justify-center border border-white/20" style="background: ${p.primary}"></div>
                  <span class="text-[10px] font-medium text-slate-300 group-hover:text-white text-center leading-tight truncate w-full">${p.name.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Custom Color Hex Picker -->
        <div>
          <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Custom Primary Color</label>
          <div class="flex items-center gap-2">
            <input type="color" id="customColorPicker" value="#7182FF" oninput="setCustomHex(this.value)" class="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer">
            <input type="text" id="customHexText" value="#7182FF" oninput="setCustomHex(this.value)" class="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/30">
          </div>
        </div>

        <div class="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <span>Saves in LocalStorage</span>
          <button onclick="resetTheme()" class="text-slate-400 hover:text-white underline">Reset Default</button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
  });
})();

window.toggleCustomizer = function() {
  const panel = document.getElementById('themePanel');
  if (!panel) return;
  panel.classList.toggle('hidden');
  panel.classList.toggle('flex');
};

window.selectPreset = function(key) {
  window.applyStoreTheme(key);
  const cfg = window.STORE_CONFIG;
  if (cfg && cfg.theme.presets[key]) {
    const p = cfg.theme.presets[key];
    document.getElementById('customColorPicker').value = p.primary;
    document.getElementById('customHexText').value = p.primary;
  }
};

window.setCustomHex = function(hex) {
  if (!hex.startsWith('#') || (hex.length !== 7 && hex.length !== 4)) return;
  document.getElementById('customColorPicker').value = hex;
  document.getElementById('customHexText').value = hex;
  
  const root = document.documentElement;
  root.style.setProperty('--color-primary', hex);
  root.style.setProperty('--color-secondary', hex);
  root.style.setProperty('--color-glow', hex + '44');
};

window.resetTheme = function() {
  localStorage.removeItem('store_active_preset');
  window.applyStoreTheme('cyber-indigo');
};
