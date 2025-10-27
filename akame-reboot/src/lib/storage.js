// src/lib/storage.js
const STORAGE_KEY = 'akame_reboot_v1';
import { validateState } from './schema'

function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const valid = validateState(parsed)
    if (!valid) {
      console.warn('loadState: estado inválido en localStorage, se ignora')
      return null
    }
    return valid
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

export const saveStateDebounced = debounce(saveState, 400);

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
        const valid = validateState(parsed)
        if (!valid) return reject(new Error('Invalid JSON schema'))
        resolve(valid);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function exportCSV(state) {
  const rows = [[
    'day','date','noSmoking','exercise','respiration','foodClean','focus90','sleepHours','mood','notes'
  ]];
  for (let i=1;i<=30;i++){
    const d = state.days?.[i] || {};
    rows.push([
      i,
      d.date || '',
      !!d.noSmoking,
      !!d.exercise,
      !!d.respiration,
      !!d.foodClean,
      !!d.focus90,
      d.sleepHours ?? '',
      d.mood ?? '',
      (d.notes || '').replace(/\n/g,' ')
    ]);
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  // Vitest/JSDOM fallback: si Blob.text no existe, añadimos un método compatible para pruebas
  if (typeof blob.text !== 'function') {
    // eslint-disable-next-line no-unused-vars
    blob.text = () => Promise.resolve(csv)
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `akame_reboot_30days_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
}