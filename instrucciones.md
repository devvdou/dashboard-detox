
# 🎯 Prompt maestro para tu agente de código (Pegar tal cual)

```
Objetivo:
Construir una **web app estática** (SPA) local que funcione perfectamente desde archivos locales y luego pueda desplegarse en **GitHub Pages**. Es un **Dashboard de Reinicio THC**: 30 días de seguimiento, rutinas, respiración, protocolo anti-craving, registro semanal y mini-dashboard visual. Debe ser *muy* bonito, moderno, responsive en dispositivos moviles y ultra funcional. Guardado persistente en localStorage, export/import de datos (JSON/CSV), y optimizado para móviles (PWA-ready option). Usa React + Vite + Tailwind CSS, Framer Motion para micro-interacciones, lucide-react para iconos. Código listo para ejecutar con `npm install` + `npm run dev` y `npm run build`.

Requisitos funcionales:
1. Pantalla inicial (Dashboard) con:
   - Header con título, día actual, contador de días sin THC (calcula desde fecha inicial guardada).
   - Quick actions: “Registrar caida (resbalón)”, “Nuevo día”, “Backup JSON”, “Export CSV”.
   - Vista resumida: progreso 30 días (habit tracker visual tipo grid), estado semanal, frase diaria.
2. Página/Sección “Detalle Día”:
   - Formulario y checkboxes: No fumar, Ejercicio, Respiración, Comer limpio, Foco 90min, Dormir.
   - Campo Observaciones (texto corto), marcador de ánimo (emoji/1–10).
   - Guardar automático y botón “Guardar ahora”.
3. Página/Sección “Respiración & Protocolo”:
   - Muestra técnicas (Box, 4-7-8, Diaphragmatic) con timers interactivos y guía paso a paso.
   - Botón “Iniciar rutina” que abre un modal/timer con animación.
4. Página “Registro Semanal”:
   - Tabla editable con resumen de cada semana y gráficos (pequeño chart de progreso).
5. Persistencia:
   - Todo se guarda en `localStorage` bajo la key `akame_reboot_v1`.
   - Proveer función para **exportar** y **importar** JSON (backup/restore).
   - Exportar CSV de 30 días (headers claros) para análisis externo.
6. UI/UX:
   - Modern, minimal, neumorphism-lite / glassmorphism touches, soft gradients.
   - Color palette: dark-mode friendly. Provide light/dark toggle.
   - Smooth microinteractions: hover cards, animated progress bars, micro-copy.
7. Responsive:
   - Mobile-first breakpoints: mobile (≤640px), tablet (641–1024px), desktop (>1024px).
   - Navigation transforms to bottom nav on mobile, sidebar on desktop.
8. Accessibility:
   - Semantic HTML, ARIA labels for forms, keyboard navigation, color contrast checked.
9. Testing & Lint:
   - ESLint config, Prettier, basic unit tests for storage handlers (Jest / Vitest).
10. Deploy:
    - Build script and steps to deploy to GitHub Pages (branch `gh-pages` or GitHub Actions).
    - Provide `README.md` with run/build/deploy instructions.

Tech stack & libs (required):
- Framework: React + Vite
- Styling: TailwindCSS (with class utilities). Use Tailwind v3.
- Animations: Framer Motion
- Icons: lucide-react
- Charts: Recharts or chart.js (small bar/line for weekly)
- Storage helpers: tiny utility module for localStorage with schema validation (zod optional)
- Build: Vite, Node 18+ compatible
- Optional: PWA via `vite-plugin-pwa` (flag to enable)

UX / Visual specification (be explicit):
- Theme: clean, modern, soft rounded corners (2xl rounded), subtle shadows, glass-cards. Use a primary gradient `#6EE7B7 -> #60A5FA` for success accents and a warm accent `#F472B6` for alerts.
- Font: Inter (system fallback)
- Layout:
  - Desktop: left sidebar (logo + nav), main content center, right column small cards (phrase of day, quick stats).
  - Mobile: top header + bottom nav. Habit tracker appears as horizontally scrollable card or grid.
- Habit tracker: 30 small square nodes (6 columns x 5 rows on desktop; responsive grid on mobile). Each node clickable to open day detail. Completed days animate with check ripple.
- Progress ring for % completion (Framer Motion + SVG).
- Modal designs: glass background blur, close button high contrast.

Data model (JSON schema) — `akame_reboot_v1`:
```

{
"meta": {
"createdAt": "2025-10-27T10:00:00.000Z",  // ISO
"startDate": "2025-10-27",                 // YYYY-MM-DD
"lastEdit": "2025-10-27Txx:xx:xxZ",
"theme": "dark" // or light
},
"days": {
"1": {
"date": "2025-10-27",
"noSmoking": true,
"exercise": true,
"respiration": true,
"foodClean": true,
"focus90": false,
"sleepHours": 7.5,
"mood": 6,
"notes": "Me costó un poco la tarde"
},
"...": {}
},
"weeklySummary": {
"week1": { "energy": 6, "anxiety": 3, "respiration": "better", "notes": "" },
"...": {}
},
"events": [
{ "type": "slip", "dateTime": "2025-10-29T22:12:00Z", "note": "Una calada, estrés" }
]
}

```

Acceptance criteria (automated checks the agent must produce):
1. `npm run dev` runs a local server with the app.
2. Data persists between reloads (test: check localStorage after saving day).
3. Export JSON downloads a file `akame_reboot_backup_YYYYMMDD.json`.
4. CSV export contains columns: day,date,noSmoking,exercise,respiration,foodClean,focus90,sleepHours,mood,notes
5. Mobile layout tests: on < 640px, bottom nav visible and grid stacks vertically.
6. Keyboard tab navigation through day inputs and ARIA labels visible.
7. Build produces static files in `dist/` that can be served by GitHub Pages.
8. README includes run, build, deploy steps and env (Node version).

Dev tasks (ordered, granular — for the agent to execute step-by-step):
1. `npm create vite@latest akame-reboot --template react` then `cd akame-reboot`
2. Install deps: `npm i tailwindcss postcss autoprefixer framer-motion lucide-react recharts date-fns zod` and dev deps `npm i -D eslint prettier vite-plugin-pwa vitest`
3. Initialize Tailwind: `npx tailwindcss init -p` with recommended content paths.
4. Create project structure:
   - `src/`
     - `main.jsx`
     - `App.jsx`
     - `styles/globals.css` (Tailwind + Inter font import)
     - `components/`:
       - `Header.jsx`
       - `Sidebar.jsx`
       - `BottomNav.jsx`
       - `HabitGrid.jsx`
       - `DayModal.jsx`
       - `ProgressRing.jsx`
       - `Timer.jsx` (for breathing)
       - `WeeklyChart.jsx`
       - `ExportImport.jsx`
       - `Settings.jsx`
     - `lib/`
       - `storage.js` (get/save/export/import JSON, CSV)
       - `schema.js` (zod schema for validation)
       - `date.js` (helpers date-fns)
     - `pages/`
       - `Dashboard.jsx`
       - `Breathing.jsx`
       - `Weekly.jsx`
       - `Settings.jsx`
5. Implement `storage.js` with these exported functions:
   - `loadState()`, `saveState(state)`, `exportJSON()`, `importJSON(file)`, `exportCSV()`, `resetState()`.
   - Add debounce saving and write tests (Vitest).
6. Build UI per spec using Tailwind classes. Add dark/light toggle persisted in meta.
7. Implement animations: grid nodes animate using Framer Motion; progress ring animates based on %.
8. Implement timers for breathing with visuals (expanding/contracting circle) and sound optional (toggle).
9. Implement chart in Weekly page using Recharts (small line for energy, bars for anxiety).
10. Add unit tests for storage functions and one integration test for saving a day.
11. Add eslint/prettier config and run lint script.
12. Add build & deploy scripts to `package.json`:
    - `"build": "vite build"`
    - `"preview": "vite preview"`
    - Add `gh-pages` deploy instructions or provide a GitHub Actions `.yml` workflow to push `dist/` to `gh-pages`.
13. Create `README.md` with clear instructions:
    - Run dev: `npm i && npm run dev`
    - Build: `npm run build`
    - Deploy: Option A (gh-pages) or Option B (GitHub Actions config included).
14. OPTIONAL: Add simple PWA config (manifest + service worker) if flag `--pwa` passed.

UI specifics (copy exact Tailwind suggestions):
- Global container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Sidebar: `w-72 bg-[rgba(255,255,255,0.03)] backdrop-blur-md rounded-2xl p-4 shadow-lg`
- Card: `bg-gradient-to-b from-white/5 to-white/3 rounded-2xl p-4 shadow-md`
- Habit node: `w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-lg cursor-pointer transition-transform hover:scale-105`
- Completed node styles: `bg-gradient-to-br from-[#6EE7B7] to-[#60A5FA] text-black shadow-inner animate-[pulse_1s_infinite]` (subtle)
- Font size scale: `text-sm` on mobile, `text-base` on desktop.

Deliverables (must commit to repo):
- Complete source code in a git repo with meaningful commits.
- `README.md` with screenshots and deployment steps.
- `dist/` build artifacts (or CI that builds).
- `akame_reboot_sample_backup.json` example in repo `/examples`.
- Unit tests.

Quality notes:
- Keep code modular and well-documented. Each component must have a clear prop interface and small footprint.
- Keep UX minimal: avoid unnecessary nested clicks. Main interactions must be ≤2 taps.
- Provide keyboard shortcuts: `N` = new day, `E` = quick export, `D` = toggle day detail (document shortcuts in Settings).

Time & priority:
- Prioritize core flows: Dashboard, Day edit, Save/load, Export/Import, Responsive behavior.
- Visual polish after core functions working.

Extra: Provide a **single command** to initialize and run the whole project locally:
- `npx degit your-template-url akame-reboot && cd akame-reboot && npm i && npm run dev`

End of prompt.
```

---

# ✅ Extras I include for your agent (copy-paste snippets)

## 1) `storage.js` (essential functions — drop-in)

```js
// src/lib/storage.js
const STORAGE_KEY = 'akame_reboot_v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('loadState error', e);
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('saveState error', e);
  }
}

export function exportJSON(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `akame_reboot_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function exportCSV(state) {
  const rows = [['day','date','noSmoking','exercise','respiration','foodClean','focus90','sleepHours','mood','notes']];
  for (let i=1;i<=30;i++){
    const d = state.days?.[i] || {};
    rows.push([i, d.date || '', !!d.noSmoking, !!d.exercise, !!d.respiration, !!d.foodClean, !!d.focus90, d.sleepHours ?? '', d.mood ?? '', (d.notes || '').replace(/\n/g,' ')]);
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `akame_reboot_30days_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
```

## 2) Example `DayModal.jsx` skeleton (React + Tailwind + Framer Motion)

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DayModal({ dayIndex, state, onSave, onClose }) {
  const day = state.days?.[dayIndex] || { date: '', noSmoking:false, exercise:false, respiration:false, foodClean:false, focus90:false, sleepHours:0, mood:5, notes:''};
  const [local, setLocal] = useState(day);

  useEffect(()=> setLocal(day), [dayIndex]);

  function handleSave(){
    onSave(dayIndex, local);
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <motion.div initial={{y:30}} animate={{y:0}} className="relative bg-white/5 backdrop-blur rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Día {dayIndex} — {local.date}</h3>
        <div className="grid gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={local.noSmoking} onChange={e => setLocal({...local, noSmoking:e.target.checked})} />
            No fumar
          </label>
          {/* otras checkboxes... */}
          <label>Observaciones</label>
          <textarea className="w-full p-2 rounded" value={local.notes} onChange={e => setLocal({...local, notes:e.target.value})} />
        </div>
        <div className="flex gap-3 mt-4 justify-end">
          <button className="px-4 py-2 rounded bg-white/10" onClick={onClose}>Cerrar</button>
          <button className="px-4 py-2 rounded bg-gradient-to-br from-[#6EE7B7] to-[#60A5FA]" onClick={handleSave}>Guardar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

## 3) `README.md` snippet for GitHub Pages

```
# Akame Reboot — Dashboard (static)

## Run locally
1. install: `npm install`
2. dev: `npm run dev` (open http://localhost:5173)

## Build
`npm run build` — outputs `dist/`

## Deploy to GitHub Pages (manual)
1. Build: `npm run build`
2. Create branch `gh-pages` and push `dist/` contents to it (or use `gh-pages` package)
3. In GitHub repo settings -> Pages -> select branch `gh-pages` and root.

## Deploy via GitHub Actions
Include `.github/workflows/gh-pages.yml` that builds and pushes `dist/` to `gh-pages`.
```

---

# 🔧 Quick checklist to give your agent when you start it

* [ ] Use React + Vite + Tailwind
* [ ] Implement `storage.js` and tests
* [ ] Build core pages (Dashboard, Day detail, Breathing, Weekly)
* [ ] Make UI pixel-polished and responsive
* [ ] Add import/export JSON & CSV
* [ ] Add README + deploy instructions
* [ ] Commit to git frequently and push to a repo you control

---

