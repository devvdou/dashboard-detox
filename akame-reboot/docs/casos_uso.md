# Casos de uso y flujos principales

## 1. Crear nuevo día
- Usuario pulsa "Nuevo día" en el Header.
- App calcula el primer índice libre (1..30) y crea el día con `date=todayISO` y `noSmoking=true`.
- Dashboard abre automáticamente el `DayModal` del índice creado.

## 2. Editar detalle del día
- En HabitGrid, el usuario pulsa un día.
- Se abre `DayModal` con checkboxes e inputs.
- "Guardar ahora" llama a `onSave(dayIndex, data)` y persiste en localStorage (debounce global).

## 3. Registrar caída (slip)
- Usuario pulsa "Registrar caída".
- Se agrega un evento `{ type:'slip', dateTime: ISO }` a `state.events`.

## 4. Exportar/Importar
- Export JSON: descarga el estado completo.
- Export CSV: genera tabla 30 días.
- Import JSON: valida schema (zod) y reemplaza el estado si es válido.

## 5. Navegación y responsive
- Desktop: Sidebar izquierda, contenido central.
- Mobile: BottomNav visible; TopBar presente en páginas secundarias con botón Atrás.

## 6. Atajos de teclado
- N: Nuevo día.
- E: Ir a inicio (export rápido desde Header).
- D: Ir a Dashboard.