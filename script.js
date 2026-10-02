/* ==========================================================================
   GloW Dark & ModsDark Assistant - Ultra Cinematic 3D Scripts
   ========================================================================== */

// --- 1. Tab Pill & Viewport Height Helpers ---
function updatePillPosition() {
  const activeTab = document.querySelector('.nav-tab.active');
  const pill = document.getElementById('tabSliderPill');
  if (activeTab && pill) {
    pill.style.width = `${activeTab.offsetWidth}px`;
    pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }
}

function updateViewportHeight() {
  const viewport = document.querySelector('.sections-viewport');
  const activeSlide = document.querySelector('.app-slide.active-slide');
  if (viewport && activeSlide && activeSlide.offsetHeight > 100) {
    viewport.style.height = `${activeSlide.offsetHeight}px`;
  }
}

// --- 2. Real-time Celestial Time System ---
const CELESTIAL_ARTWORKS = {
  night: `
    <div class="celestial-art night-art">
      <svg viewBox="0 0 32 32" fill="none">
        <path class="moon-body" d="M25 17.2A11 11 0 0 1 14 6.5a11 11 0 0 0-4 .8 11.5 11.5 0 1 0 16.3 14.5A11 11 0 0 1 25 17.2z" fill="url(#moonGrad)"/>
        <path class="celestial-star star-1" d="M7 6L7.8 8.2L10 9L7.8 9.8L7 12L6.2 9.8L4 9L6.2 8.2L7 6Z" fill="#c084fc"/>
        <path class="celestial-star star-2" d="M23 4.5L23.5 6L25 6.5L23.5 7L23 8.5L22.5 7L21 6.5L22.5 6L23 4.5Z" fill="#67e8f9"/>
        <path class="celestial-star star-3" d="M27 24L27.4 25.1L28.5 25.5L27.4 25.9L27 27L26.6 25.9L25.5 25.5L26.6 25.1L27 24Z" fill="#a7f3d0"/>
        <defs>
          <linearGradient id="moonGrad" x1="6" y1="6" x2="26" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fdf4ff"/>
            <stop offset="0.6" stop-color="#d8b4fe"/>
            <stop offset="1" stop-color="#a855f7"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `,
  morning: `
    <div class="celestial-art morning-art">
      <svg viewBox="0 0 32 32" fill="none">
        <g class="sunrise-rays">
          <line x1="16" y1="4" x2="16" y2="7" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="7.5" y1="7.5" x2="9.6" y2="9.6" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
          <line x1="24.5" y1="7.5" x2="22.4" y2="9.6" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="16" x2="7" y2="16" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
          <line x1="28" y1="16" x2="25" y2="16" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
        </g>
        <path class="sunrise-sun" d="M8 20 A8 8 0 0 1 24 20 Z" fill="url(#sunriseGrad)"/>
        <line x1="3" y1="21" x2="29" y2="21" stroke="#fb7185" stroke-width="2" stroke-linecap="round"/>
        <defs>
          <linearGradient id="sunriseGrad" x1="8" y1="12" x2="24" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fef08a"/>
            <stop offset="0.5" stop-color="#fb923c"/>
            <stop offset="1" stop-color="#f43f5e"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `,
  day: `
    <div class="celestial-art day-art">
      <svg viewBox="0 0 32 32" fill="none">
        <g class="sun-corona">
          <line x1="16" y1="2" x2="16" y2="5.5" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="26.5" x2="16" y2="30" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
          <line x1="2" y1="16" x2="5.5" y2="16" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
          <line x1="26.5" y1="16" x2="30" y2="16" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
          <line x1="6.1" y1="6.1" x2="8.6" y2="8.6" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
          <line x1="23.4" y1="23.4" x2="25.9" y2="25.9" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
          <line x1="6.1" y1="25.9" x2="8.6" y2="23.4" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
          <line x1="23.4" y1="8.6" x2="25.9" y2="6.1" stroke="#fb923c" stroke-width="2" stroke-linecap="round"/>
        </g>
        <circle class="sun-core" cx="16" cy="16" r="7.5" fill="url(#sunGrad)"/>
        <defs>
          <linearGradient id="sunGrad" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fffbeb"/>
            <stop offset="0.4" stop-color="#fde047"/>
            <stop offset="1" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `,
  sunset: `
    <div class="celestial-art sunset-art">
      <svg viewBox="0 0 32 32" fill="none">
        <circle class="sunset-sun" cx="16" cy="18" r="7" fill="url(#sunsetGrad)"/>
        <line x1="3" y1="21" x2="29" y2="21" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
        <line class="sunset-reflection" x1="8" y1="24" x2="24" y2="24" stroke="#f97316" stroke-width="1.6" stroke-linecap="round"/>
        <line class="sunset-reflection-2" x1="11" y1="27" x2="21" y2="27" stroke="#db2777" stroke-width="1.4" stroke-linecap="round"/>
        <defs>
          <linearGradient id="sunsetGrad" x1="16" y1="11" x2="16" y2="24" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fde047"/>
            <stop offset="0.4" stop-color="#f97316"/>
            <stop offset="1" stop-color="#db2777"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `
};

// Independent Celestial Mode (Sun / Moon)
function getCelestialModeFromTime() {
  const hours = new Date().getHours();
  return (hours >= 6 && hours < 20) ? 'sun' : 'moon';
}

// Celestial Orbital State & Fast 180° Revolution around Earth
let celestialOrbitAngle = 0;
let targetCelestialFlipAngle = (getCelestialModeFromTime() === 'sun' ? 0 : Math.PI);
let currentCelestialFlipAngle = targetCelestialFlipAngle;

function triggerCelestialFastFlip(forcedMode) {
  const mode = forcedMode || document.documentElement.dataset.celestialMode || 'moon';
  const currentStep = Math.round(targetCelestialFlipAngle / Math.PI);
  const isTargetSun = (mode === 'sun');
  const isCurrentEven = (currentStep % 2 === 0);

  if (isTargetSun && !isCurrentEven) {
    targetCelestialFlipAngle = (currentStep + 1) * Math.PI;
  } else if (!isTargetSun && isCurrentEven) {
    targetCelestialFlipAngle = (currentStep + 1) * Math.PI;
  }
}

function setCelestialMode(mode) {
  const prevMode = document.documentElement.dataset.celestialMode;
  document.documentElement.dataset.celestialMode = mode;

  // Update header widget visual & text
  const visualEl = document.getElementById('celestialVisual');
  const phaseEl = document.getElementById('celestialPhase');
  if (visualEl && CELESTIAL_ARTWORKS) {
    visualEl.innerHTML = CELESTIAL_ARTWORKS[mode === 'sun' ? 'day' : 'night'];
  }
  if (phaseEl) {
    phaseEl.textContent = mode === 'sun' ? 'Солнце' : 'Луна';
  }

  if (prevMode && prevMode !== mode) {
    triggerCelestialFastFlip(mode);
  }
}

function toggleCelestialMode() {
  const currentMode = document.documentElement.dataset.celestialMode || 'moon';
  const newMode = currentMode === 'moon' ? 'sun' : 'moon';
  window._celestialManualToggle = true; // user manually chose — don't auto-override this session
  setCelestialMode(newMode);
}

// Initial setup — always based on current time (no saved preference)
(function initCelestialMode() {
  setCelestialMode(getCelestialModeFromTime());
})();

function updateCelestialTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  let phase = 'night';
  if (hours >= 5 && hours < 11) {
    phase = 'morning';
  } else if (hours >= 11 && hours < 18) {
    phase = 'day';
  } else if (hours >= 18 && hours < 22) {
    phase = 'sunset';
  } else {
    phase = 'night';
  }

  const clockEl = document.getElementById('celestialClock');
  if (clockEl) {
    clockEl.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  }

  // Only auto-switch if user has NOT manually toggled this session
  if (!window._celestialManualToggle) {
    const naturalMode = getCelestialModeFromTime();
    if (document.documentElement.dataset.celestialMode !== naturalMode) {
      setCelestialMode(naturalMode);
    }
  }

  if (document.documentElement.dataset.timePhase !== phase) {
    document.documentElement.dataset.timePhase = phase;
  }
}

// --- 3. Section Switcher with Horizontal Sliding & Parallax Zoom ---
function switchSection(sectionId) {
  document.documentElement.dataset.activeSection = sectionId;

  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.dataset.target === sectionId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  updatePillPosition();

  const track = document.getElementById('sectionsTrack');
  if (track) {
    if (sectionId === 'modsdark-section') {
      track.style.transform = 'translateX(-50%)';
    } else {
      track.style.transform = 'translateX(0%)';
    }
  }

  document.querySelectorAll('.app-slide').forEach(slide => {
    if (slide.id === sectionId) {
      slide.classList.remove('active-slide');
      void slide.offsetWidth;
      slide.classList.add('active-slide');
    } else {
      slide.classList.remove('active-slide');
    }
  });

  setTimeout(updateViewportHeight, 20);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Global 3D references for real-time camera tracking
let globalSunGroup = null;
let globalMoonGroup = null;
let globalEarthGroup = null;

// --- 4. Cosmic Flight Animations System (25 Dynamic Trajectories) ---
function getEarthTargetPos(isMobile) {
  if (globalEarthGroup) {
    return { x: globalEarthGroup.position.x, y: globalEarthGroup.position.y, z: globalEarthGroup.position.z };
  }
  const isDay = (document.documentElement.dataset.celestialMode || 'moon') === 'sun';
  return {
    x: isDay ? (isMobile ? -3.5 : -6.5) : (isMobile ? 3.5 : 6.5),
    y: -2.2,
    z: isDay ? (isMobile ? 1.0 : 2.0) : (isMobile ? 0.5 : 1.0)
  };
}

function getSunTargetPos(isMobile) {
  if (globalSunGroup) {
    return { x: globalSunGroup.position.x, y: globalSunGroup.position.y, z: globalSunGroup.position.z };
  }
  return {
    x: 0.0,
    y: 3.5,
    z: -34.0
  };
}

function getMoonTargetPos(isMobile) {
  if (globalMoonGroup) {
    return { x: globalMoonGroup.position.x, y: globalMoonGroup.position.y, z: globalMoonGroup.position.z };
  }
  const e = getEarthTargetPos(isMobile);
  return {
    x: e.x - (isMobile ? 11.0 : 14.5),
    y: e.y + 3.8,
    z: e.z - 4.5
  };
}

const CAMERA_ANIMATIONS = [
  // --- 1. SUN TRAJECTORIES (5 Distinct Solar Angles) ---
  {
    id: 'sun_corona',
    name: 'Солнечная корона',
    targetBody: 'sun',
    forceCelestial: 'sun',
    update: (time, isMobile) => {
      const s = getSunTargetPos(isMobile);
      const r = isMobile ? 12.5 : 15.0;
      return {
        pos: { x: s.x + Math.sin(time * 0.14) * r, y: s.y + Math.cos(time * 0.1) * 3.5, z: s.z + Math.cos(time * 0.14) * r },
        look: { x: s.x, y: s.y, z: s.z },
        parallax: { x: 0.35, y: 0.25 }
      };
    }
  },
  {
    id: 'solar_flare_dive',
    name: 'Солнечный протуберанец',
    targetBody: 'sun',
    forceCelestial: 'sun',
    update: (time, isMobile) => {
      const s = getSunTargetPos(isMobile);
      const a = time * 0.22;
      return {
        pos: { x: s.x + Math.sin(a) * 13.5, y: s.y + Math.sin(a * 1.6) * 4.2, z: s.z + Math.cos(a) * 13.5 },
        look: { x: s.x, y: s.y, z: s.z },
        parallax: { x: 0.35, y: 0.25 }
      };
    }
  },
  {
    id: 'solar_zenith',
    name: 'Солнечный зенит',
    targetBody: 'sun',
    forceCelestial: 'sun',
    update: (time, isMobile) => {
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: s.x + Math.cos(time * 0.12) * 11.5, y: s.y + 12.5 + Math.sin(time * 0.1) * 2.2, z: s.z + Math.sin(time * 0.12) * 11.5 },
        look: { x: s.x, y: s.y, z: s.z },
        parallax: { x: 0.38, y: 0.28 }
      };
    }
  },
  {
    id: 'solar_wind_surf',
    name: 'Солнечный ветер',
    targetBody: 'sun',
    forceCelestial: 'sun',
    update: (time, isMobile) => {
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: s.x + Math.sin(time * 0.18) * 15.5, y: s.y + 2.5 + Math.cos(time * 0.15) * 3.0, z: s.z + 16.0 + Math.sin(time * 0.12) * 4.0 },
        look: { x: s.x, y: s.y, z: s.z },
        parallax: { x: 0.4, y: 0.3 }
      };
    }
  },
  {
    id: 'solar_storm_roll',
    name: 'Солнечный шторм',
    targetBody: 'sun',
    forceCelestial: 'sun',
    update: (time, isMobile) => {
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: s.x + Math.sin(time * 0.26) * 13.8, y: s.y + Math.cos(time * 0.18) * 4.5, z: s.z + Math.cos(time * 0.26) * 13.8 },
        look: { x: s.x, y: s.y, z: s.z },
        parallax: { x: 0.38, y: 0.28 }
      };
    }
  },

  // --- 2. MOON TRAJECTORIES (4 Distinct Lunar Angles) ---
  {
    id: 'moon_orbit',
    name: 'Лунная орбита',
    targetBody: 'moon',
    forceCelestial: 'moon',
    update: (time, isMobile) => {
      const m = getMoonTargetPos(isMobile);
      const r = isMobile ? 4.5 : 5.4;
      return {
        pos: { x: m.x + Math.sin(time * 0.24) * r, y: m.y + Math.cos(time * 0.18) * 1.8, z: m.z + Math.cos(time * 0.24) * r },
        look: { x: m.x, y: m.y, z: m.z },
        parallax: { x: 0.4, y: 0.28 }
      };
    }
  },
  {
    id: 'moon_dark_side',
    name: 'Тёмная сторона Луны',
    targetBody: 'moon',
    forceCelestial: 'moon',
    update: (time, isMobile) => {
      const m = getMoonTargetPos(isMobile);
      return {
        pos: { x: m.x + Math.sin(time * 0.2) * 5.2, y: m.y + Math.cos(time * 0.15) * 1.5, z: m.z - 5.2 },
        look: { x: m.x, y: m.y, z: m.z },
        parallax: { x: 0.4, y: 0.3 }
      };
    }
  },
  {
    id: 'moon_chaser',
    name: 'Лунная станция',
    targetBody: 'moon',
    forceCelestial: 'moon',
    update: (time, isMobile) => {
      const m = getMoonTargetPos(isMobile);
      return {
        pos: { x: m.x + Math.cos(time * 0.22) * 4.6, y: m.y + 1.8 + Math.sin(time * 0.16) * 1.2, z: m.z + Math.sin(time * 0.22) * 4.6 },
        look: { x: m.x, y: m.y, z: m.z },
        parallax: { x: 0.4, y: 0.28 }
      };
    }
  },
  {
    id: 'moon_ascent',
    name: 'Лунный апекс',
    targetBody: 'moon',
    forceCelestial: 'moon',
    update: (time, isMobile) => {
      const m = getMoonTargetPos(isMobile);
      return {
        pos: { x: m.x + Math.sin(time * 0.18) * 4.0, y: m.y + 5.5 + Math.sin(time * 0.2) * 1.6, z: m.z + Math.cos(time * 0.18) * 4.0 },
        look: { x: m.x, y: m.y, z: m.z },
        parallax: { x: 0.4, y: 0.28 }
      };
    }
  },

  // --- 3. DEEP SPACE & SYSTEM OVERVIEW TRAJECTORIES (5 Angles) ---
  {
    id: 'interplanetary_transit',
    name: 'Межпланетный транзит',
    targetBody: 'system',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const s = getSunTargetPos(isMobile);
      const t = Math.sin(time * 0.12) * 0.5 + 0.5; // swings between Sun (0) and Earth (1)
      const midX = s.x + (e.x - s.x) * t;
      const midY = s.y + (e.y - s.y) * t + Math.sin(time * 0.18) * 3.5;
      const midZ = s.z + (e.z - s.z) * t + 14.0;
      return {
        pos: { x: midX, y: midY, z: midZ },
        look: { x: e.x * t + s.x * (1 - t), y: e.y * t + s.y * (1 - t), z: e.z * t + s.z * (1 - t) },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },
  {
    id: 'planetary_dance',
    name: 'Парад планет',
    targetBody: 'system',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: (e.x + s.x) * 0.5 + Math.sin(time * 0.08) * 10.0, y: 7.5 + Math.cos(time * 0.09) * 2.5, z: 26.0 },
        look: { x: (e.x + s.x) * 0.5, y: (e.y + s.y) * 0.5, z: (e.z + s.z) * 0.5 },
        parallax: { x: 0.45, y: 0.3 }
      };
    }
  },
  {
    id: 'deep_space_outpost',
    name: 'Космический дозор',
    targetBody: 'deep_space',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: (e.x + s.x) * 0.5 + Math.cos(time * 0.06) * 16.0, y: 15.0 + Math.sin(time * 0.07) * 3.0, z: 24.0 },
        look: { x: (e.x + s.x) * 0.5, y: (e.y + s.y) * 0.5, z: (e.z + s.z) * 0.5 },
        parallax: { x: 0.55, y: 0.4 }
      };
    }
  },
  {
    id: 'beacon_drift',
    name: 'Сквозь звёздные маяки',
    targetBody: 'deep_space',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: Math.sin(time * 0.07) * 22.0, y: 11.0 + Math.cos(time * 0.08) * 3.0, z: 28.0 },
        look: { x: (e.x + s.x) * 0.35, y: 0.0, z: -10.0 },
        parallax: { x: 0.6, y: 0.45 }
      };
    }
  },
  {
    id: 'cosmic_pulse_dolly',
    name: 'Космический пульсар',
    targetBody: 'system',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const s = getSunTargetPos(isMobile);
      return {
        pos: { x: (e.x + s.x) * 0.5 + Math.sin(time * 0.1) * 8.0, y: 4.5 + Math.cos(time * 0.12) * 2.0, z: 22.0 + Math.sin(time * 0.16) * 7.0 },
        look: { x: (e.x + s.x) * 0.5, y: (e.y + s.y) * 0.5, z: (e.z + s.z) * 0.5 },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },

  // --- 4. EARTH TRAJECTORIES (11 Majestic Earth Angles) ---
  {
    id: 'earth_orbit',
    name: 'Орбита Земли',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const r = isMobile ? 8.0 : 9.5;
      return {
        pos: { x: e.x + Math.sin(time * 0.16) * r, y: e.y + Math.cos(time * 0.12) * 2.8, z: e.z + Math.cos(time * 0.16) * r },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.55, y: 0.35 }
      };
    }
  },
  {
    id: 'cinematic_drift',
    name: 'Кинематографичный дрейф',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.1) * 7.5, y: e.y + 2.0 + Math.cos(time * 0.08) * 2.0, z: e.z + 11.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.4, y: 0.3 }
      };
    }
  },
  {
    id: 'earth_flyby',
    name: 'Пролёт терминатора',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.24) * 7.2, y: e.y + Math.cos(time * 0.18) * 3.2, z: e.z + Math.cos(time * 0.24) * 7.2 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.45, y: 0.3 }
      };
    }
  },
  {
    id: 'infinity_figure8',
    name: 'Восьмёрка бесконечности',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.15) * 9.5, y: e.y + Math.sin(time * 0.3) * 3.5, z: e.z + Math.cos(time * 0.15) * 8.5 + 4.0 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },
  {
    id: 'cosmic_pendulum',
    name: 'Космический маятник',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.18) * 8.5, y: e.y + 5.5 + Math.cos(time * 0.36) * 2.5, z: e.z + 11.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.55, y: 0.38 }
      };
    }
  },
  {
    id: 'vertical_ascent',
    name: 'Полярный подъём',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.cos(time * 0.14) * 4.5, y: e.y + 11.0 + Math.sin(time * 0.12) * 2.0, z: e.z + Math.sin(time * 0.14) * 4.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },
  {
    id: 'orbital_corkscrew',
    name: 'Орбитальный штопор',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.cos(time * 0.22) * 9.0, y: e.y + Math.sin(time * 0.22) * 5.0, z: e.z + 11.0 + Math.sin(time * 0.09) * 3.0 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.45, y: 0.3 }
      };
    }
  },
  {
    id: 'earth_polar_view',
    name: 'Эклиптический горизонт',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.12) * 8.5, y: e.y - 3.5 + Math.sin(time * 0.16) * 1.5, z: e.z + 10.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },
  {
    id: 'gravity_slingshot',
    name: 'Гравитационный манёвр',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      const a = (time * 0.28) % (Math.PI * 2);
      return {
        pos: { x: e.x + Math.sin(a) * (7.5 + Math.cos(a) * 2.5), y: e.y + Math.sin(a * 2) * 2.5, z: e.z + 9.5 + Math.cos(a) * 3.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  },
  {
    id: 'descending_vortex',
    name: 'Восходящий вихрь',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.18) * 8.5, y: e.y + Math.sin(time * 0.11) * 5.5, z: e.z + Math.cos(time * 0.18) * 8.5 + 3.0 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.45, y: 0.3 }
      };
    }
  },
  {
    id: 'orbital_cradle',
    name: 'Орбитальная колыбель',
    targetBody: 'earth',
    update: (time, isMobile) => {
      const e = getEarthTargetPos(isMobile);
      return {
        pos: { x: e.x + Math.sin(time * 0.15) * 7.0, y: e.y + 1.6 + Math.sin(time * 0.2) * 1.6, z: e.z + 11.5 },
        look: { x: e.x, y: e.y, z: e.z },
        parallax: { x: 0.5, y: 0.35 }
      };
    }
  }
];

let currentAnimIndex = parseInt(localStorage.getItem('cosmicAnimIndex'), 10);
if (isNaN(currentAnimIndex) || currentAnimIndex < 0 || currentAnimIndex >= CAMERA_ANIMATIONS.length) {
  currentAnimIndex = 0;
}

let targetCameraPos = null;
let targetCameraLookAt = null;
let currentCameraLookAt = null;
let globalCamera = null;
let orbitTargetYaw = 0;
let orbitTargetPitch = 0;
let orbitCurrentYaw = 0;
let orbitCurrentPitch = 0;

function triggerRandomAnimation() {
  const prevAnim = CAMERA_ANIMATIONS[currentAnimIndex] || CAMERA_ANIMATIONS[0];
  let newIndex = Math.floor(Math.random() * CAMERA_ANIMATIONS.length);
  if (CAMERA_ANIMATIONS.length > 1 && newIndex === currentAnimIndex) {
    newIndex = (newIndex + 1 + Math.floor(Math.random() * (CAMERA_ANIMATIONS.length - 1))) % CAMERA_ANIMATIONS.length;
  }
  currentAnimIndex = newIndex;
  localStorage.setItem('cosmicAnimIndex', currentAnimIndex);

  const activeAnim = CAMERA_ANIMATIONS[currentAnimIndex];

  // Reset interactive manual orbit drag smoothly so the flight glides cleanly along the new trajectory
  orbitTargetYaw = 0;
  orbitTargetPitch = 0;

  // Update button label in top bar
  const labelEl = document.getElementById('cameraLabelText');
  if (labelEl) {
    labelEl.textContent = activeAnim.name;
  }

  // Update button label in Cinema HUD
  const targetTag = activeAnim.targetBody === 'sun' ? '[СОЛНЦЕ]' : (activeAnim.targetBody === 'moon' ? '[ЛУНА]' : (activeAnim.targetBody === 'earth' ? '[ЗЕМЛЯ]' : '[КОСМОС]'));
  const hudCameraLabel = document.getElementById('hudCameraLabel');
  if (hudCameraLabel) {
    hudCameraLabel.textContent = `${activeAnim.name} ${targetTag}`;
  }

  // Trigger spin animation on button icon
  const btn = document.getElementById('camera-random-btn');
  if (btn) {
    btn.classList.remove('camera-btn-spin');
    void btn.offsetWidth; // Force CSS reflow to retrigger animation
    btn.classList.add('camera-btn-spin');
    setTimeout(() => {
      btn.classList.remove('camera-btn-spin');
    }, 650);
  }

  // Force celestial mode if needed
  if (activeAnim.forceCelestial) {
    window._celestialManualToggle = true;
    setCelestialMode(activeAnim.forceCelestial);
  }
}

function initRandomCameraAnimation() {
  const btn = document.getElementById('camera-random-btn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerRandomAnimation();
    });
  }

  // Set initial label
  const activeAnim = CAMERA_ANIMATIONS[currentAnimIndex] || CAMERA_ANIMATIONS[0];
  const labelEl = document.getElementById('cameraLabelText');
  if (labelEl) {
    labelEl.textContent = activeAnim.name;
  }
  const targetTag = activeAnim.targetBody === 'sun' ? '[СОЛНЦЕ]' : (activeAnim.targetBody === 'moon' ? '[ЛУНА]' : (activeAnim.targetBody === 'earth' ? '[ЗЕМЛЯ]' : '[КОСМОС]'));
  const hudCameraLabel = document.getElementById('hudCameraLabel');
  if (hudCameraLabel) {
    hudCameraLabel.textContent = `${activeAnim.name} ${targetTag}`;
  }
  if (activeAnim.forceCelestial) {
    setCelestialMode(activeAnim.forceCelestial);
  }
}

// --- 5. Interactive 3D Tilt for Cards ---
function setupInteractiveCards() {
  const cards = document.querySelectorAll('.format-card, .phone-card, .showcase-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.35s ease, border-color 0.35s ease';
    });
  });
}

// --- 6. Lightbox Modal functions ---
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption || '';
    modal.style.display = 'flex';
    void modal.offsetWidth;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-container')) {
    closeLightboxDirect();
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById('lightbox');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      const img = document.getElementById('lightbox-img');
      if (img) img.src = '';
    }, 280);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightboxDirect();
  }
});

// ==========================================================================
// --- 7. Three.js 3D WebGL Engine: Photorealistic Earth, Sun, Moon & Stars ---
// ==========================================================================

// Texture loader with graceful fallback to procedural
const _texLoader = typeof THREE !== 'undefined' ? new THREE.TextureLoader() : null;

function loadTex(path, fallbackFn) {
  return new Promise((resolve) => {
    if (!_texLoader) { resolve(fallbackFn()); return; }
    _texLoader.load(
      path,
      (tex) => { tex.wrapS = THREE.RepeatWrapping; resolve(tex); },
      undefined,
      () => resolve(fallbackFn())
    );
  });
}

function base64ToArrayBuffer(base64) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function loadEarthGLB(onSuccess) {
  if (typeof THREE === 'undefined' || typeof THREE.GLTFLoader === 'undefined') {
    return;
  }
  const loader = new THREE.GLTFLoader();

  const handleGLTF = (gltf) => {
    if (gltf && gltf.scene) {
      onSuccess(gltf.scene);
    }
  };

  // 1. First priority: parse embedded base64 in-memory (100% offline, zero CORS issues on file://)
  if (window.EARTH_GLB_BASE64) {
    try {
      const buffer = base64ToArrayBuffer(window.EARTH_GLB_BASE64);
      loader.parse(buffer, '', handleGLTF, (err) => {
        console.warn('GLTFLoader base64 parse failed, falling back to load:', err);
        loader.load('3d/earth.glb', handleGLTF);
      });
      return;
    } catch (e) {
      console.warn('Base64 decode failed:', e);
    }
  }

  // 2. Fallback to standard URL load
  loader.load('3d/earth.glb', handleGLTF, undefined, (err) => {
    console.warn('Could not load 3d/earth.glb:', err);
  });
}

function loadMoonGLB(onSuccess) {
  if (typeof THREE === 'undefined' || typeof THREE.GLTFLoader === 'undefined') {
    return;
  }
  const loader = new THREE.GLTFLoader();

  const handleGLTF = (gltf) => {
    if (gltf && gltf.scene) {
      onSuccess(gltf.scene);
    }
  };

  // 1. First priority: parse embedded base64 in-memory (100% offline, zero CORS issues on file://)
  if (window.MOON_GLB_BASE64) {
    try {
      const buffer = base64ToArrayBuffer(window.MOON_GLB_BASE64);
      loader.parse(buffer, '', handleGLTF, (err) => {
        console.warn('GLTFLoader base64 moon parse failed, falling back to load:', err);
        loader.load('3d/moon.glb', handleGLTF);
      });
      return;
    } catch (e) {
      console.warn('Moon base64 decode failed:', e);
    }
  }

  // 2. Fallback to standard URL load
  loader.load('3d/moon.glb', handleGLTF, undefined, (err) => {
    console.warn('Could not load 3d/moon.glb:', err);
  });
}

function loadSunGLB(onSuccess) {
  if (typeof THREE === 'undefined' || typeof THREE.GLTFLoader === 'undefined') {
    return;
  }
  const loader = new THREE.GLTFLoader();
  loader.load('3d/sun_model.glb', (gltf) => {
    if (gltf && gltf.scene) {
      onSuccess(gltf.scene);
    }
  }, undefined, (err) => {
    console.warn('3d/sun_model.glb load skipped:', err);
  });
}

// --- Fallback Procedural Textures ---
function createProceduralEarth() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#021e4a'); g.addColorStop(0.3, '#03458c');
  g.addColorStop(0.5, '#0284c7'); g.addColorStop(0.7, '#03458c'); g.addColorStop(1, '#021e4a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = '#059669';
  [[540,200,180,100,0.1],[530,320,110,120,-0.1],[240,180,100,90,-0.2],[290,340,80,130,0.2],[820,360,70,55,0.1]].forEach(([x,y,rx,ry,a])=>{ ctx.beginPath(); ctx.ellipse(x,y,rx,ry,a,0,Math.PI*2); ctx.fill(); });
  ctx.fillStyle = '#10b981';
  [[520,190,130,70,0.1],[250,175,70,60,-0.2]].forEach(([x,y,rx,ry,a])=>{ ctx.beginPath(); ctx.ellipse(x,y,rx,ry,a,0,Math.PI*2); ctx.fill(); });
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(0,0,1024,35); ctx.fillRect(0,480,1024,32);
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createProceduralClouds() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d'); ctx.clearRect(0,0,1024,512);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  for (let i=0;i<40;i++){ctx.beginPath();ctx.ellipse(Math.random()*1024,80+Math.random()*350,60+Math.random()*110,15+Math.random()*35,Math.random()*0.3,0,Math.PI*2);ctx.fill();}
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createProceduralNightEarth() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000510'; ctx.fillRect(0,0,1024,512);
  ctx.fillStyle = '#fde047';
  for (let i=0;i<220;i++){const x=(Math.sin(i*12.3)*0.5+0.5)*1024;const y=(Math.cos(i*7.7)*0.35+0.5)*512;ctx.fillRect(x,y,2,2);}
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

function createProceduralSun() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  // Fiery golden-orange photosphere base
  const bg = ctx.createLinearGradient(0, 0, 0, 512);
  bg.addColorStop(0, '#ea580c');
  bg.addColorStop(0.2, '#f59e0b');
  bg.addColorStop(0.5, '#fef08a');
  bg.addColorStop(0.8, '#f59e0b');
  bg.addColorStop(1, '#ea580c');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1024, 512);

  // Convective granulation cells (plasma boiling pattern)
  for (let i = 0; i < 450; i++) {
    const x = Math.random() * 1024, y = Math.random() * 512, r = 5 + Math.random() * 26;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    g.addColorStop(0.45, 'rgba(251, 191, 36, 0.45)');
    g.addColorStop(1, 'rgba(194, 65, 12, 0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // Sunspot clusters with penumbra & umbra
  for (let i = 0; i < 9; i++) {
    const cx = 120 + Math.random() * 784, cy = 140 + Math.random() * 232, r = 5 + Math.random() * 16;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, '#270d04');
    g.addColorStop(0.5, '#7c2d12');
    g.addColorStop(0.85, 'rgba(194, 65, 12, 0.4)');
    g.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

function getSunTexture() {
  if (window.SUN_TEXTURE_BASE64 && _texLoader) {
    try {
      const tex = _texLoader.load(window.SUN_TEXTURE_BASE64);
      tex.wrapS = THREE.RepeatWrapping;
      tex.encoding = THREE.sRGBEncoding;
      return tex;
    } catch (e) {
      console.warn('Failed loading SUN_TEXTURE_BASE64:', e);
    }
  }
  return createProceduralSun();
}

function getSpaceBackgroundTexture() {
  if (window.SPACE_BACKGROUND_BASE64 && _texLoader) {
    try {
      const tex = _texLoader.load(window.SPACE_BACKGROUND_BASE64);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.encoding = THREE.sRGBEncoding;
      return tex;
    } catch (e) {
      console.warn('Failed loading SPACE_BACKGROUND_BASE64:', e);
    }
  }
  if (_texLoader) {
    const tex = _texLoader.load('textures/space_background.jpg');
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }
  return null;
}

function createProceduralMoon() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  // Base regolith
  const g = ctx.createRadialGradient(256,256,0,256,256,256);
  g.addColorStop(0,'#d4cfc7'); g.addColorStop(0.5,'#b8b0a4'); g.addColorStop(1,'#8c867e');
  ctx.fillStyle=g; ctx.fillRect(0,0,512,512);
  // Mare (dark basalt seas)
  ctx.fillStyle='rgba(80,75,70,0.7)';
  [[200,180,90,65,0.2],[310,250,100,75,-0.15],[160,320,65,45,0.3],[360,150,55,40,0.1]].forEach(([x,y,rx,ry,a])=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,a,0,Math.PI*2);ctx.fill();});
  // Craters
  for(let i=0;i<55;i++){
    const x=Math.random()*512,y=Math.random()*512,r=3+Math.random()*16;
    const cg=ctx.createRadialGradient(x,y,r*0.3,x,y,r);
    cg.addColorStop(0,'rgba(90,85,80,0.8)'); cg.addColorStop(0.8,'rgba(180,175,165,0.3)'); cg.addColorStop(1,'rgba(220,215,205,0.6)');
    ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function createGlowSpriteTexture(color1, color2) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, color1);
  grad.addColorStop(0.4, color2);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

// Create a specular-like map: bright for oceans, dark for land
function createEarthSpecularMap() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  // Start white (ocean = specular)
  ctx.fillStyle = '#888'; ctx.fillRect(0,0,1024,512);
  // Darken land areas (same shapes as day texture)
  ctx.fillStyle = '#111';
  [[540,200,180,100,0.1],[530,320,110,120,-0.1],[240,180,100,90,-0.2],[290,340,80,130,0.2],[820,360,70,55,0.1]].forEach(([x,y,rx,ry,a])=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,a,0,Math.PI*2);ctx.fill();});
  return new THREE.CanvasTexture(c);
}

// 3D Space Engine State
let space3D = null;

function initSpace3D() {
  const canvas = document.getElementById('space3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  globalCamera = camera;

  const _initActiveAnim = CAMERA_ANIMATIONS[currentAnimIndex] || CAMERA_ANIMATIONS[0];
  const _initIsMobile = width <= 768;
  const _initFrame = _initActiveAnim.update(0, _initIsMobile);
  if (_initFrame && _initFrame.pos && _initFrame.look) {
    camera.position.set(_initFrame.pos.x, _initFrame.pos.y, _initFrame.pos.z);
    targetCameraPos = new THREE.Vector3(_initFrame.pos.x, _initFrame.pos.y, _initFrame.pos.z);
    targetCameraLookAt = new THREE.Vector3(_initFrame.look.x, _initFrame.look.y, _initFrame.look.z);
    currentCameraLookAt = new THREE.Vector3(_initFrame.look.x, _initFrame.look.y, _initFrame.look.z);
  } else {
    camera.position.set(0, 0, 16);
    targetCameraPos = new THREE.Vector3(0, 0, 16);
    targetCameraLookAt = new THREE.Vector3(0, 0, 0);
    currentCameraLookAt = new THREE.Vector3(0, 0, 0);
  }

  // === LIGHTING ===
  // Sunlight (key light from top-right)
  const sunLight = new THREE.DirectionalLight(0xfff8e7, 2.6);
  sunLight.position.set(12, 8, 10);
  scene.add(sunLight);

  // Deep space ambient (very dim blue-black)
  const ambientLight = new THREE.AmbientLight(0x0a0d1a, 1.0);
  scene.add(ambientLight);

  // Warm fill light (subtle, like earthshine)
  const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.25);
  fillLight.position.set(-8, -3, 5);
  scene.add(fillLight);

  // === EARTH ===
  const earthGroup = new THREE.Group();
  earthGroup.position.set(-7.2, -5.0, 0);
  earthGroup.rotation.z = THREE.MathUtils.degToRad(-23.4);

  const earthRadius = 4.2;
  const earthGeo = new THREE.SphereGeometry(earthRadius, 96, 96);

  // Use NASA textures with procedural fallback
  const earthMat = new THREE.MeshPhongMaterial({
    map: createProceduralEarth(),
    specularMap: createEarthSpecularMap(),
    specular: new THREE.Color(0x4488bb),
    shininess: 45,
    bumpScale: 0.08
  });

  // Night side emissive map (city lights visible on dark side)
  const nightTex = createProceduralNightEarth();
  earthMat.emissiveMap = nightTex;
  earthMat.emissive = new THREE.Color(0xffd060);
  earthMat.emissiveIntensity = 0.35;

  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthGroup.add(earthMesh);

  // Clouds layer
  const cloudsGeo = new THREE.SphereGeometry(earthRadius + 0.07, 64, 64);
  const cloudsMat = new THREE.MeshPhongMaterial({
    map: createProceduralClouds(),
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthGroup.add(cloudsMesh);

  // Atmosphere (inner thin shell - blue rim)
  const atmoGeo = new THREE.SphereGeometry(earthRadius + 0.16, 64, 64);
  const atmoMat = new THREE.MeshPhongMaterial({
    color: 0x006994,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

  // Outer glow sprite (haze halo)
  const earthHaloMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(100,180,255,0.0)', 'rgba(50,140,255,0.22)'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const earthHalo = new THREE.Sprite(earthHaloMat);
  earthHalo.scale.set(earthRadius * 3.0, earthRadius * 3.0, 1);
  earthGroup.add(earthHalo);

  scene.add(earthGroup);

  // Real 3D Photorealistic Earth Model Loader
  let realEarthNode = null;
  let realCloudsNode = null;

  loadEarthGLB((modelScene) => {
    // Model base radius in GLB is 5.0, our scene radius is 4.2 => scale 0.84
    const scaleFactor = earthRadius / 5.0;
    modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

    modelScene.traverse((child) => {
      if (child.name === 'Earth' || child.name === 'Earth_Material #50_0') {
        if (!realEarthNode) realEarthNode = child;
      }
      if (child.name === 'EarthClouds' || child.name === 'EarthClouds_Material #62_0') {
        if (!realCloudsNode) realCloudsNode = child;
      }
      if (child.isMesh) {
        if (child.name.toLowerCase().includes('cloud') || (child.material && child.material.name && child.material.name.includes('62'))) {
          child.material.transparent = true;
          child.material.opacity = 0.88;
          child.material.depthWrite = false;
        } else if (child.material) {
          child.material.roughness = 0.55;
          child.material.metalness = 0.05;
          child.material.emissive = new THREE.Color(0xffaa44);
          child.material.emissiveIntensity = 0.65;
        }
      }
    });

    // Hide procedural fallback sphere once real 3D model is active
    earthMesh.visible = false;
    cloudsMesh.visible = false;

    earthGroup.add(modelScene);
  });

  // Now asynchronously load real NASA textures and swap them in
  loadTex('textures/earth_daymap.jpg', createProceduralEarth).then(tex => {
    tex.encoding = THREE.sRGBEncoding;
    earthMat.map = tex;
    earthMat.needsUpdate = true;
  });
  loadTex('textures/earth_night.jpg', createProceduralNightEarth).then(tex => {
    tex.encoding = THREE.sRGBEncoding;
    earthMat.emissiveMap = tex;
    earthMat.needsUpdate = true;
  });

  // === SUN ===
  const sunGroup = new THREE.Group();

  const sunRadius = 7.5;
  const sunTexture = getSunTexture();

  // Layer 1: Core Photosphere with real NASA solar convective surface
  const sunGeo = new THREE.SphereGeometry(sunRadius, 96, 96);
  const sunMat = new THREE.MeshBasicMaterial({
    map: sunTexture,
    color: 0xffffff
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  sunGroup.add(sunMesh);

  // Layer 2: Turbulent Chromosphere / Boiling Convective Plasma
  const chromoGeo = new THREE.SphereGeometry(sunRadius * 1.018, 64, 64);
  const chromoMat = new THREE.MeshBasicMaterial({
    map: sunTexture,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });
  const chromoMesh = new THREE.Mesh(chromoGeo, chromoMat);
  sunGroup.add(chromoMesh);

  // Real 3D Sun Model Loader (if available)
  let realSunModel = null;
  loadSunGLB((modelScene) => {
    const scaleFactor = sunRadius / 1000.0;
    modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
    sunMesh.visible = false;
    if (chromoMesh) chromoMesh.visible = false;
    sunGroup.add(modelScene);
    realSunModel = modelScene;
  });

  // Layer 3: Blinding White-Gold Core Corona
  const innerCoronaMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(255,255,245,1.0)', 'rgba(255,215,60,0.0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const innerCorona = new THREE.Sprite(innerCoronaMat);
  innerCorona.scale.set(sunRadius * 2.2, sunRadius * 2.2, 1);
  sunGroup.add(innerCorona);

  // Layer 4: Solar Flare Rays & Telescopic Optical Diffraction
  function createSolarRaysTexture() {
    const sz = 256;
    const c = document.createElement('canvas'); c.width = sz; c.height = sz;
    const ctx = c.getContext('2d'); const cx = sz / 2;
    // Core radial glow
    const rg = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.4);
    rg.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    rg.addColorStop(0.3, 'rgba(255, 215, 80, 0.65)');
    rg.addColorStop(1, 'rgba(255, 120, 0, 0.0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, sz, sz);
    // Delicate solar flare spikes
    const drawRay = (ang, len, alpha) => {
      ctx.save(); ctx.translate(cx, cx); ctx.rotate(ang);
      const lg = ctx.createLinearGradient(0, 0, len, 0);
      lg.addColorStop(0, `rgba(255, 245, 200, ${alpha})`);
      lg.addColorStop(0.45, `rgba(255, 170, 40, ${alpha * 0.4})`);
      lg.addColorStop(1, 'rgba(255, 80, 0, 0.0)');
      ctx.strokeStyle = lg; ctx.lineWidth = 2.0;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len, 0); ctx.stroke();
      ctx.restore();
    };
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) drawRay(a, cx * 0.95, 0.9);
    for (let a = Math.PI / 8; a < Math.PI * 2; a += Math.PI / 4) drawRay(a, cx * 0.65, 0.4);
    return new THREE.CanvasTexture(c);
  }

  const sunRaysMat = new THREE.SpriteMaterial({
    map: createSolarRaysTexture(),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const sunRays = new THREE.Sprite(sunRaysMat);
  sunRays.scale.set(sunRadius * 3.8, sunRadius * 3.8, 1);
  sunGroup.add(sunRays);

  // Layer 5: Dynamic Outer Corona (Breathing fiery amber)
  const outerCoronaMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(255,160,20,0.52)', 'rgba(255,60,0,0.0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const outerCorona = new THREE.Sprite(outerCoronaMat);
  outerCorona.scale.set(sunRadius * 5.0, sunRadius * 5.0, 1);
  sunGroup.add(outerCorona);

  // Layer 6: Wide Ambient Solar Halo
  const solarHaloMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(255,185,60,0.15)', 'rgba(255,90,0,0.0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const solarHalo = new THREE.Sprite(solarHaloMat);
  solarHalo.scale.set(sunRadius * 7.5, sunRadius * 7.5, 1);
  sunGroup.add(solarHalo);

  scene.add(sunGroup);

  // === MOON ===
  const moonGroup = new THREE.Group();
  scene.add(moonGroup);

  globalSunGroup = sunGroup;
  globalMoonGroup = moonGroup;
  globalEarthGroup = earthGroup;

  // Both celestial bodies are ALWAYS visible in space
  sunGroup.visible = true;
  moonGroup.visible = true;

  const _initMode = document.documentElement.dataset.celestialMode || 'moon';
  const _isInitMobile = window.innerWidth <= 768;
  const _initSunOnRight = (_initMode === 'sun');
  const _initRadSunX = _isInitMobile ? 20.0 : 32.0;
  const _initRadMoonX = _isInitMobile ? 10.5 : 14.5;
  const _initSunX = earthGroup.position.x + (_initSunOnRight ? _initRadSunX : -_initRadSunX);
  const _initMoonX = earthGroup.position.x + (_initSunOnRight ? -_initRadMoonX : _initRadMoonX);
  sunGroup.position.set(_initSunX, earthGroup.position.y + 6.5, earthGroup.position.z - 28.0);
  moonGroup.position.set(_initMoonX, earthGroup.position.y + 4.0, earthGroup.position.z - 5.0);

  // === ORBITAL PATH VISUALIZATION (STRICTLY IN CINEMA MODE: «Детализация орбиты») ===
  const orbitDetailGroup = new THREE.Group();
  orbitDetailGroup.visible = false;
  scene.add(orbitDetailGroup);

  // 1. Earth Heliocentric Orbit Path (around Sun)
  const earthOrbitPts = [];
  const _eSegments = 180;
  const _radX = 28.0;
  const _radZ = 12.0;
  const _radY = 3.0;
  for (let i = 0; i <= _eSegments; i++) {
    const a = (i / _eSegments) * Math.PI * 2;
    const x = Math.sin(a) * _radX;
    const y = 3.5 - 5.5 + Math.cos(a * 0.5) * _radY;
    const z = Math.cos(a) * _radZ;
    earthOrbitPts.push(new THREE.Vector3(x, y, z));
  }
  const earthOrbitGeo = new THREE.BufferGeometry().setFromPoints(earthOrbitPts);
  const earthOrbitMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const earthOrbitLine = new THREE.LineLoop(earthOrbitGeo, earthOrbitMat);
  orbitDetailGroup.add(earthOrbitLine);

  // 2. Moon Orbit Path (attached to earthGroup so it stays centered around Earth)
  const moonOrbitPts = [];
  const _mSegments = 96;
  const _mRadX = 14.5;
  const _mRadY = 4.5;
  const _mRadZ = 8.5;
  for (let i = 0; i <= _mSegments; i++) {
    const a = (i / _mSegments) * Math.PI * 2;
    const x = Math.cos(a) * _mRadX;
    const y = 3.8 + Math.sin(a) * _mRadY;
    const z = -4.5 - Math.sin(a) * _mRadZ;
    moonOrbitPts.push(new THREE.Vector3(x, y, z));
  }
  const moonOrbitGeo = new THREE.BufferGeometry().setFromPoints(moonOrbitPts);
  const moonOrbitMat = new THREE.LineBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const moonOrbitLine = new THREE.LineLoop(moonOrbitGeo, moonOrbitMat);
  moonOrbitLine.visible = false;
  earthGroup.add(moonOrbitLine);

  const moonRadius = 1.15;
  const moonGeo = new THREE.SphereGeometry(moonRadius, 64, 64);
  const moonMat = new THREE.MeshPhongMaterial({
    map: createProceduralMoon(),
    specular: new THREE.Color(0x1a1a1a),
    shininess: 8,
    bumpScale: 0.05
  });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonGroup.add(moonMesh);

  // Load real NASA photographic Moon texture and relief normal map
  loadTex('textures/moon_color.jpg', createProceduralMoon).then(tex => {
    tex.encoding = THREE.sRGBEncoding;
    moonMat.map = tex;
    moonMat.needsUpdate = true;
  });
  loadTex('textures/moon_normal.png', () => null).then(normTex => {
    if (normTex) {
      moonMat.normalMap = normTex;
      moonMat.normalScale = new THREE.Vector2(0.65, 0.65);
      moonMat.needsUpdate = true;
    }
  });

  // Real 3D Moon Model Loader
  let realMoonNode = null;
  loadMoonGLB((modelScene) => {
    const scaleFactor = moonRadius / 50.0;
    modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

    modelScene.traverse((child) => {
      if (child.isMesh) {
        if (!realMoonNode) realMoonNode = child;
        if (child.material) {
          child.material.roughness = 0.85;
          child.material.metalness = 0.05;
        }
      }
    });

    moonMesh.visible = false;
    moonGroup.add(modelScene);
  });

  // Moon cold silvery glow
  const moonGlowMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(255,255,255,0.0)', 'rgba(210,200,255,0.28)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const moonGlow = new THREE.Sprite(moonGlowMat);
  moonGlow.scale.set(moonRadius * 4.0, moonRadius * 4.0, 1);
  moonGroup.add(moonGlow);

  // Moon inner haze
  const moonHazeMat = new THREE.SpriteMaterial({
    map: createGlowSpriteTexture('rgba(240,235,255,0.55)', 'rgba(200,190,255,0.0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const moonHaze = new THREE.Sprite(moonHazeMat);
  moonHaze.scale.set(moonRadius * 2.4, moonRadius * 2.4, 1);
  moonGroup.add(moonHaze);

  scene.add(moonGroup);

  // === 360-DEGREE SPHERICAL DISTANT BLINKING LIGHTS (WITHOUT STARS) ===
  function createBlinkingLightTexture(r, g, b) {
    const sz = 128;
    const c = document.createElement('canvas'); c.width = sz; c.height = sz;
    const ctx = c.getContext('2d'); const cx = sz / 2;

    // Glowing core with rich color halo
    const grd = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.48);
    grd.addColorStop(0,    'rgba(255, 255, 255, 1.0)');
    grd.addColorStop(0.22, `rgba(${r}, ${g}, ${b}, 0.95)`);
    grd.addColorStop(0.6,  `rgba(${r}, ${g}, ${b}, 0.3)`);
    grd.addColorStop(1,    `rgba(${r}, ${g}, ${b}, 0.0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, sz, sz);

    // Horizontal optical diffraction flare streak
    const hg = ctx.createLinearGradient(0, cx, sz, cx);
    hg.addColorStop(0,    `rgba(${r}, ${g}, ${b}, 0.0)`);
    hg.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, 0.3)`);
    hg.addColorStop(0.5,  'rgba(255, 255, 255, 0.95)');
    hg.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, 0.3)`);
    hg.addColorStop(1,    `rgba(${r}, ${g}, ${b}, 0.0)`);
    ctx.fillStyle = hg;
    ctx.fillRect(0, cx - 2, sz, 4);

    return new THREE.CanvasTexture(c);
  }

  const BEACON_PALETTE = [
    [0, 230, 118],   // neon emerald
    [56, 189, 248],  // cosmic cyan
    [168, 85, 247],  // deep violet
    [251, 191, 36],  // warm golden amber
    [244, 63, 94],   // ruby signal beacon
    [255, 255, 255]  // diamond white flash
  ];

  const distantBlinkingLights = [];
  const BEACON_COUNT = 180;

  for (let i = 0; i < BEACON_COUNT; i++) {
    const col = BEACON_PALETTE[i % BEACON_PALETTE.length];

    // Full 360-degree spherical distribution with multi-depth layers
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const radius = 26 + Math.random() * 55;

    const x = radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);

    const baseSz = 1.8 + Math.random() * 2.4;
    const mode = i % 3 === 0 ? 'strobe' : (i % 3 === 1 ? 'pulse' : 'flash');

    const mat = new THREE.SpriteMaterial({
      map: createBlinkingLightTexture(col[0], col[1], col[2]),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });
    const s = new THREE.Sprite(mat);
    s.position.set(x, y, z);
    s.scale.set(baseSz, baseSz, 1);
    s.userData = {
      baseSize: baseSz,
      baseOpacity: 0.75 + Math.random() * 0.25,
      mode: mode,
      freq: mode === 'strobe' ? (1.5 + Math.random() * 2.5) : (0.6 + Math.random() * 1.8),
      phase: Math.random() * Math.PI * 2
    };
    scene.add(s);
    distantBlinkingLights.push(s);
  }

  // === RESPONSIVE ADAPT ===
  function adaptObjectPositions() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      earthGroup.scale.setScalar(0.72);
      sunGroup.scale.setScalar(0.75);
      moonGroup.scale.setScalar(0.8);
    } else {
      earthGroup.scale.setScalar(1);
      sunGroup.scale.setScalar(1);
      moonGroup.scale.setScalar(1);
    }
  }
  adaptObjectPositions();

  // === COSMIC ZOOM SYSTEM (Mouse Wheel, Touch Pinch, HUD Buttons) ===
  let targetCameraZoom = 1.0;
  let currentCameraZoom = 1.0;

  function updateZoomUI() {
    const textEl = document.getElementById('zoomPercentText');
    if (textEl) {
      textEl.textContent = Math.round(targetCameraZoom * 100) + '%';
    }
  }

  function initCosmicZoomControls() {
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');

    function doZoomOut(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      targetCameraZoom = Math.max(0.35, +(targetCameraZoom - 0.15).toFixed(2));
      updateZoomUI();
    }

    function doZoomReset(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      targetCameraZoom = 1.0;
      updateZoomUI();
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', doZoomOut);
      zoomOutBtn.addEventListener('pointerdown', doZoomOut);
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', doZoomReset);
      zoomResetBtn.addEventListener('pointerdown', doZoomReset);
    }

    // Mouse wheel zoom: allows zooming OUT down to 0.35, capped at 1.0 (no zooming closer than normal)
    window.addEventListener('wheel', (e) => {
      const inCinema = isCinemaModeActive || document.body.classList.contains('cinema-mode');
      const isHud = e.target && e.target.closest && (e.target.closest('#cosmicZoomHud') || e.target.closest('#cinemaTelemetryHud'));
      const isBackdrop = e.target && (e.target.id === 'space3d-canvas' || (e.target.closest && e.target.closest('#celestialBackdrop')));
      const isCtrl = e.ctrlKey;
      if (inCinema || isCtrl || isHud || isBackdrop) {
        e.preventDefault();
        const step = e.deltaY < 0 ? 0.09 : -0.09;
        // Capped strictly at 1.0 (no zoom-in beyond 100%)
        targetCameraZoom = Math.min(1.0, Math.max(0.35, +(targetCameraZoom + step).toFixed(2)));
        updateZoomUI();
      }
    }, { passive: false });

    // Touch pinch-to-zoom on mobile: allows zoom out, capped at 1.0
    let initialPinchDist = null;
    let initialPinchZoom = 1.0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialPinchZoom = targetCameraZoom;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialPinchDist) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (currentDist > 10) {
          const scale = currentDist / initialPinchDist;
          targetCameraZoom = Math.min(1.0, Math.max(0.35, +(initialPinchZoom * scale).toFixed(2)));
          updateZoomUI();
        }
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      initialPinchDist = null;
    }, { passive: true });
  }

  // Execute controls setup immediately
  initCosmicZoomControls();

  // === INTERACTIVE 3D FREE ORBIT CONTROLS (LMB / TOUCH DRAG TO ORBIT EARTH) ===
  let isOrbitDragging = false;
  let orbitDragStartX = 0;
  let orbitDragStartY = 0;
  orbitTargetYaw = 0;
  orbitTargetPitch = 0;
  orbitCurrentYaw = 0;
  orbitCurrentPitch = 0;

  function initOrbitDragControls() {
    const onPointerDown = (clientX, clientY, target) => {
      // Don't drag if clicking buttons, inputs or links
      if (target && target.closest && (target.closest('button') || target.closest('a') || target.closest('.hud-card') || target.closest('.cosmic-zoom-hud') || target.closest('.hud-hint') || target.closest('.hud-action-btn') || target.closest('.hud-exit-btn'))) {
        return;
      }
      isOrbitDragging = true;
      orbitDragStartX = clientX;
      orbitDragStartY = clientY;
      document.body.classList.add('orbit-dragging');
    };

    const onPointerMove = (clientX, clientY) => {
      if (!isOrbitDragging) return;
      const dx = clientX - orbitDragStartX;
      const dy = clientY - orbitDragStartY;
      orbitDragStartX = clientX;
      orbitDragStartY = clientY;

      // Sensitivity factor
      const sens = 0.0055;
      orbitTargetYaw += dx * sens;
      orbitTargetPitch += dy * sens;

      // Clamp pitch between -75 deg and +75 deg
      const maxPitch = Math.PI * 0.42;
      orbitTargetPitch = Math.max(-maxPitch, Math.min(maxPitch, orbitTargetPitch));
    };

    const onPointerUp = () => {
      if (isOrbitDragging) {
        isOrbitDragging = false;
        document.body.classList.remove('orbit-dragging');
      }
    };

    // Mouse events (LMB drag)
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        onPointerDown(e.clientX, e.clientY, e.target);
      }
    });

    window.addEventListener('mousemove', (e) => {
      onPointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      onPointerUp();
    });

    // Touch events (Single touch drag)
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY, e.target);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isOrbitDragging) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      onPointerUp();
    }, { passive: true });

    // Double click to reset manual orbit angle back to route
    window.addEventListener('dblclick', (e) => {
      if (e.target && !e.target.closest('button') && !e.target.closest('a')) {
        orbitTargetYaw = 0;
        orbitTargetPitch = 0;
      }
    });
  }

  initOrbitDragControls();

  // === MOUSE PARALLAX ===
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // === ANIMATION LOOP ===
  let frameCount = 0;
  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Axial Rotation
    if (realEarthNode) {
      realEarthNode.rotateZ(0.0014);
      if (realCloudsNode) realCloudsNode.rotateZ(0.0021);
    } else {
      earthMesh.rotation.y  += 0.0014;
      cloudsMesh.rotation.y += 0.0021;
    }
    // Sun Photosphere & Boiling Convective Chromosphere Rotation
    sunMesh.rotation.y += 0.0016;
    if (chromoMesh) {
      chromoMesh.rotation.y += 0.0028;
      chromoMesh.rotation.x += 0.0009;
    }
    if (realSunModel) {
      realSunModel.rotation.y += 0.0025;
    }

    if (realMoonNode) {
      realMoonNode.rotateZ(0.0008);
    } else {
      moonMesh.rotation.y += 0.0008;
    }

    // Solar pulse (corona breathes + flaring rays rotate gently)
    const pulse = 1 + Math.sin(time * 2.2) * 0.04 + Math.sin(time * 5.7) * 0.018;
    innerCorona.scale.set(sunRadius * 2.2 * pulse, sunRadius * 2.2 * pulse, 1);
    sunRays.scale.set(sunRadius * 3.8 * (1 + Math.sin(time * 1.6) * 0.03), sunRadius * 3.8 * (1 + Math.sin(time * 1.6) * 0.03), 1);
    sunRays.material.rotation += 0.0004;
    outerCorona.scale.set(sunRadius * 5.0 * (1 + Math.sin(time * 1.1) * 0.035), sunRadius * 5.0 * (1 + Math.sin(time * 1.1) * 0.035), 1);
    solarHalo.scale.set(sunRadius * 7.5 * (1 + Math.sin(time * 0.6) * 0.02), sunRadius * 7.5 * (1 + Math.sin(time * 0.6) * 0.02), 1);

    // Moon gentle shimmer
    const moonShimmer = 1 + Math.sin(time * 1.8) * 0.02;
    moonGlow.scale.set(moonRadius * 4.0 * moonShimmer, moonRadius * 4.0 * moonShimmer, 1);

    // Distant blinking lights in 360-degree deep space (without stars)
    for (let i = 0; i < distantBlinkingLights.length; i++) {
      const s = distantBlinkingLights[i];
      const ud = s.userData;
      let intensity = 0;

      if (ud.mode === 'strobe') {
        // High-altitude navigational double-pulse strobe
        const cycle = (time * ud.freq + ud.phase) % (Math.PI * 2);
        const p1 = Math.exp(-Math.pow((cycle - 1.2) / 0.16, 2));
        const p2 = Math.exp(-Math.pow((cycle - 1.7) / 0.16, 2));
        intensity = Math.max(0.12, p1 * 1.35 + p2 * 1.1);
      } else if (ud.mode === 'pulse') {
        // Soft cosmic breathing pulse
        intensity = 0.2 + 0.8 * Math.pow(Math.sin(time * ud.freq + ud.phase) * 0.5 + 0.5, 2.0);
      } else {
        // Periodic distant flash
        const cycle = (time * ud.freq + ud.phase) % 6.0;
        if (cycle < 0.65) {
          intensity = Math.sin((cycle / 0.65) * Math.PI);
        } else {
          intensity = 0.1;
        }
      }

      const currentScale = ud.baseSize * (0.8 + intensity * 1.6);
      s.scale.set(currentScale, currentScale, 1);
      s.material.opacity = Math.min(1.0, ud.baseOpacity * (0.15 + intensity * 0.85));
    }

    // Camera animation trajectory evaluation
    const isMobile = window.innerWidth <= 768;
    const activeAnim = CAMERA_ANIMATIONS[currentAnimIndex] || CAMERA_ANIMATIONS[0];
    const frameData = activeAnim.update(time, isMobile);
    targetCameraPos.set(frameData.pos.x, frameData.pos.y, frameData.pos.z);
    targetCameraLookAt.set(frameData.look.x, frameData.look.y, frameData.look.z);
    const parallaxFactorX = frameData.parallax ? frameData.parallax.x : 0.5;
    const parallaxFactorY = frameData.parallax ? frameData.parallax.y : 0.35;

    // Smooth zoom interpolation and camera projection matrix update
    currentCameraZoom += (targetCameraZoom - currentCameraZoom) * 0.1;
    if (Math.abs(camera.zoom - currentCameraZoom) > 0.001) {
      camera.zoom = currentCameraZoom;
      camera.updateProjectionMatrix();
    }

    // Dynamic distance scaling along line of sight for unmistakable cosmic zoom-out
    const zoomDistFactor = 1.0 + (1.0 - currentCameraZoom) * 1.6;
    const camDir = new THREE.Vector3().subVectors(targetCameraPos, targetCameraLookAt);

    // Apply interactive manual orbit drag rotation (LMB / Touch Drag)
    orbitCurrentYaw += (orbitTargetYaw - orbitCurrentYaw) * 0.09;
    orbitCurrentPitch += (orbitTargetPitch - orbitCurrentPitch) * 0.09;

    if (Math.abs(orbitCurrentYaw) > 0.0001 || Math.abs(orbitCurrentPitch) > 0.0001) {
      // 1. Horizontal rotation (azimuth / yaw) around Y axis
      camDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitCurrentYaw);

      // 2. Vertical rotation (elevation / pitch) around horizontal camera perpendicular axis
      const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();
      if (camRight.lengthSq() > 0.001) {
        camDir.applyAxisAngle(camRight, orbitCurrentPitch);
      }
    }

    const zoomedPos = new THREE.Vector3().addVectors(
      targetCameraLookAt,
      camDir.multiplyScalar(zoomDistFactor)
    );

    // Camera parallax (smooth lerp toward target + mouse offset)
    const desiredCam = new THREE.Vector3(
      zoomedPos.x + mouseX * parallaxFactorX,
      zoomedPos.y - mouseY * parallaxFactorY,
      zoomedPos.z
    );

    // 1. COLLISION AVOIDANCE: Only protect against penetrating the specific celestial body being orbited
    const targetBodyType = activeAnim.targetBody || 'earth';
    const activeBodiesToCheck = [];
    if (targetBodyType === 'earth') {
      activeBodiesToCheck.push({
        name: 'earth',
        pos: earthGroup.position,
        minDist: earthRadius * earthGroup.scale.x + 1.2
      });
    } else if (targetBodyType === 'sun') {
      activeBodiesToCheck.push({
        name: 'sun',
        pos: sunGroup.position,
        minDist: sunRadius * sunGroup.scale.x + 1.8
      });
    } else if (targetBodyType === 'moon') {
      activeBodiesToCheck.push({
        name: 'moon',
        pos: moonGroup.position,
        minDist: moonRadius * moonGroup.scale.x + 0.9
      });
    }

    for (let i = 0; i < activeBodiesToCheck.length; i++) {
      const body = activeBodiesToCheck[i];
      const offset = new THREE.Vector3().subVectors(desiredCam, body.pos);
      const dist = offset.length();
      if (dist < body.minDist) {
        if (dist < 0.001) offset.set(0, 0, 1);
        else offset.normalize();
        desiredCam.copy(body.pos).addScaledVector(offset, body.minDist);
      }
    }

    camera.position.x += (desiredCam.x - camera.position.x) * 0.055;
    camera.position.y += (desiredCam.y - camera.position.y) * 0.055;
    camera.position.z += (desiredCam.z - camera.position.z) * 0.055;

    // Hard boundary enforcement on current camera position
    for (let i = 0; i < activeBodiesToCheck.length; i++) {
      const body = activeBodiesToCheck[i];
      const curOffset = new THREE.Vector3().subVectors(camera.position, body.pos);
      const curDist = curOffset.length();
      if (curDist < body.minDist) {
        if (curDist < 0.001) curOffset.set(0, 0, 1);
        else curOffset.normalize();
        camera.position.copy(body.pos).addScaledVector(curOffset, body.minDist);
      }
    }

    // 2. TARGET LOOK-AT: Direct smooth tracking of the active trajectory look-at coordinate
    currentCameraLookAt.lerp(targetCameraLookAt, 0.08);
    camera.lookAt(currentCameraLookAt);

    // === HELIOCENTRIC UNIVERSE: Earth revolves around the Sun, Moon orbits Earth ===
    // 1. The Sun is the glorious celestial center of the solar system
    const sunCenterX = 0.0;
    const sunCenterY = 3.5;
    const sunCenterZ = -34.0;
    sunGroup.position.set(sunCenterX, sunCenterY, sunCenterZ);
    sunGroup.visible = true;

    // 2. Earth revolves around the Sun in a grand heliocentric 3D ellipse
    const flipDiff = targetCelestialFlipAngle - currentCelestialFlipAngle;
    currentCelestialFlipAngle += flipDiff * 0.075;

    // Subtle living cosmic drift
    celestialOrbitAngle += 0.0003;
    const earthOrbitAngle = currentCelestialFlipAngle + celestialOrbitAngle;

    const earthOrbitRadX = isMobile ? 18.0 : 28.0;
    const earthOrbitRadZ = isMobile ? 8.0 : 12.0;
    const earthOrbitRadY = 3.0;

    const calcEarthX = sunCenterX + Math.sin(earthOrbitAngle) * earthOrbitRadX;
    const calcEarthY = sunCenterY - 5.5 + Math.cos(earthOrbitAngle * 0.5) * earthOrbitRadY;
    const calcEarthZ = 0.0 + Math.cos(earthOrbitAngle) * earthOrbitRadZ; // Earth stays heroic and centered in viewport

    earthGroup.position.set(calcEarthX, calcEarthY, calcEarthZ);

    // 3. Moon orbits Earth as its loyal satellite companion
    const moonOrbitAngle = earthOrbitAngle * 3.5 + time * 0.2;
    const moonRadX = isMobile ? 11.0 : 14.5;
    const moonRadY = isMobile ? 3.5 : 4.5;
    const moonRadZ = isMobile ? 6.0 : 8.5;

    const calcMoonX = earthGroup.position.x + Math.cos(moonOrbitAngle) * moonRadX;
    const calcMoonY = earthGroup.position.y + 3.8 + Math.sin(moonOrbitAngle) * moonRadY;
    const calcMoonZ = earthGroup.position.z - 4.5 - Math.sin(moonOrbitAngle) * moonRadZ;

    moonGroup.position.set(calcMoonX, calcMoonY, calcMoonZ);
    moonGroup.visible = true;

    // Orbit visualization toggle (strictly in Cinema Mode: «Детализация орбиты»)
    if (orbitDetailGroup) {
      orbitDetailGroup.visible = isCinemaModeActive;
    }
    if (moonOrbitLine) {
      moonOrbitLine.visible = isCinemaModeActive;
    }

    // === CONTINUOUS DISTANCE & COLLISION SAFETY GUARDS ===
    // 1. Sun Safety Guard: Track distance and strictly forbid Sun from entering Earth's zone
    const minSunEarthDist = isMobile ? 26.0 : 34.0;
    const sunToEarthVec = new THREE.Vector3().subVectors(sunGroup.position, earthGroup.position);
    const curSunDist = sunToEarthVec.length();

    if (curSunDist < minSunEarthDist) {
      if (curSunDist < 0.001) sunToEarthVec.set(0, 0.3, -1);
      sunToEarthVec.normalize();
      sunGroup.position.copy(earthGroup.position).addScaledVector(sunToEarthVec, minSunEarthDist);
    }
    // Hard depth ceiling: Sun must ALWAYS stay at least 22 units behind Earth in the background
    if (sunGroup.position.z > earthGroup.position.z - 22.0) {
      sunGroup.position.z = earthGroup.position.z - 22.0;
    }

    // 2. Moon Safety Guard: Moon stays outside Earth's shell
    const minMoonEarthDist = isMobile ? 11.0 : 14.5;
    const moonToEarthVec = new THREE.Vector3().subVectors(moonGroup.position, earthGroup.position);
    const curMoonDist = moonToEarthVec.length();

    if (curMoonDist < minMoonEarthDist) {
      if (curMoonDist < 0.001) moonToEarthVec.set(-1, 0.2, 0);
      moonToEarthVec.normalize();
      moonGroup.position.copy(earthGroup.position).addScaledVector(moonToEarthVec, minMoonEarthDist);
    }

    // 4. Physical Sunlight shines from the Sun onto Earth
    sunLight.position.set(sunGroup.position.x, sunGroup.position.y, sunGroup.position.z);

    // 5. Celestial Day / Night mode lighting
    const currentMode = document.documentElement.dataset.celestialMode || 'moon';
    const isDay = currentMode === 'sun';
    const targetSunIntensity = isDay ? 2.8 : 0.85;
    sunLight.intensity += (targetSunIntensity - sunLight.intensity) * 0.04;
    const targetEmissive = isDay ? 0.15 : 0.85;
    if (earthMat) {
      earthMat.emissiveIntensity += (targetEmissive - earthMat.emissiveIntensity) * 0.04;
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    adaptObjectPositions();
  });

  space3D = { scene, camera, renderer, earthGroup, sunGroup, moonGroup };
}

// --- Cinema Mode System ---
let isCinemaModeActive = false;

function toggleCinemaMode(forceState) {
  isCinemaModeActive = typeof forceState === 'boolean' ? forceState : !isCinemaModeActive;
  document.body.classList.toggle('cinema-mode', isCinemaModeActive);

  const cinemaBtn = document.getElementById('cinemaModeBtn');
  if (cinemaBtn) {
    cinemaBtn.classList.toggle('active', isCinemaModeActive);
    const label = cinemaBtn.querySelector('.cinema-label-text');
    if (label) label.textContent = isCinemaModeActive ? 'В эфире' : 'Кинотеатр';
  }

  if (isCinemaModeActive) {
    const activeAnim = CAMERA_ANIMATIONS[currentAnimIndex] || CAMERA_ANIMATIONS[0];
    const targetTag = activeAnim.targetBody === 'sun' ? '[СОЛНЦЕ]' : (activeAnim.targetBody === 'moon' ? '[ЛУНА]' : (activeAnim.targetBody === 'earth' ? '[ЗЕМЛЯ]' : '[КОСМОС]'));
    const hudCameraLabel = document.getElementById('hudCameraLabel');
    if (hudCameraLabel) {
      hudCameraLabel.textContent = `${activeAnim.name} ${targetTag}`;
    }
  }
}

function initCinemaMode() {
  const cinemaBtn = document.getElementById('cinemaModeBtn');
  if (cinemaBtn) {
    cinemaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCinemaMode();
    });
  }

  const exitCinemaBtn = document.getElementById('exitCinemaBtn');
  if (exitCinemaBtn) {
    exitCinemaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCinemaMode(false);
    });
  }

  // Make bottom hint bar clickable to exit cinema mode
  const hudHint = document.querySelector('.hud-hint');
  if (hudHint) {
    hudHint.style.cursor = 'pointer';
    hudHint.title = 'Нажмите, чтобы вернуться к сайту [ESC]';
    hudHint.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCinemaMode(false);
    });
  }

  // Keyboard shortcut: ESC to exit cinema mode (listen on both window and document)
  const handleEscKey = (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && (isCinemaModeActive || document.body.classList.contains('cinema-mode'))) {
      e.preventDefault();
      toggleCinemaMode(false);
    }
  };
  window.addEventListener('keydown', handleEscKey, true);
  document.addEventListener('keydown', handleEscKey, true);

  // Action buttons inside HUD
  const hudCameraRandomBtn = document.getElementById('hudCameraRandomBtn');
  if (hudCameraRandomBtn) {
    hudCameraRandomBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerRandomAnimation();
      orbitTargetYaw = 0;
      orbitTargetPitch = 0;
    });
  }

  const hudCelestialToggleBtn = document.getElementById('hudCelestialToggleBtn');
  if (hudCelestialToggleBtn) {
    hudCelestialToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCelestialMode();
      const currentMode = document.documentElement.dataset.celestialMode || 'moon';
      const label = document.getElementById('hudDayNightLabel');
      if (label) label.textContent = currentMode === 'sun' ? 'День (Солнце)' : 'Ночь (Луна)';
    });
  }

  // Intercept and strictly block any clicks on download buttons or underlying site links in cinema mode
  document.addEventListener('click', (e) => {
    if (isCinemaModeActive || document.body.classList.contains('cinema-mode')) {
      const siteElement = e.target.closest('.sections-viewport, .site-community-footer, .top-nav-bar, a[download], .download-btn-epic');
      if (siteElement) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, true);
}

// --- 8. Initialization on DOMContentLoaded & Window Events ---
document.addEventListener('DOMContentLoaded', () => {
  // Update celestial time immediately so clock never shows placeholder
  try {
    updateCelestialTime();
    setInterval(updateCelestialTime, 1000);
  } catch (e) {
    console.error('Time update error:', e);
  }

  // Initialize Cinema Mode & Sci-Fi Telemetry System
  try {
    initCinemaMode();
  } catch (e) {
    console.error('Cinema mode init error:', e);
  }

  // Initialize Random Cosmic Camera Animation Button
  try {
    initRandomCameraAnimation();
  } catch (e) {
    console.error('Camera anim init error:', e);
  }


  // Clicking the celestial widget toggles between Sun and Moon
  const celestialWidget = document.getElementById('celestialWidget');
  if (celestialWidget) {
    celestialWidget.style.cursor = 'pointer';
    celestialWidget.title = 'Нажмите, чтобы переключить Солнце / Луну';
    celestialWidget.addEventListener('click', toggleCelestialMode);
  }

  // Initialize Three.js 3D WebGL Universe
  try {
    initSpace3D();
  } catch (e) {
    console.error('Three.js Space Init Error:', e);
  }

  // Setup Cards (3D tilt & mouse glow)
  try {
    setupInteractiveCards();
  } catch (e) {
    console.error('Cards tilt error:', e);
  }

  // Initial pill position, active section & viewport height
  document.documentElement.dataset.activeSection = 'glowdark-section';
  updatePillPosition();
  updateViewportHeight();
});

// Re-calculate positions and heights after all resources/images load
window.addEventListener('load', () => {
  updatePillPosition();
  updateViewportHeight();
});

// Re-calculate on resize
window.addEventListener('resize', () => {
  updatePillPosition();
  updateViewportHeight();
});
