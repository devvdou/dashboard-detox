import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState, importJSON, resetState } from './storage'

const STORAGE_KEY = 'akame_reboot_v1'

describe('storage edge cases', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('resetState clears localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }))
    resetState()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('loadState returns null for invalid schema', () => {
    // Estado inválido (no incluye meta creada correctamente)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ invalid: true }))
    const loaded = loadState()
    expect(loaded).toBeNull()
  })

  it('importJSON rejects invalid JSON schema', async () => {
    const bad = new File([JSON.stringify({ bad: 'data' })], 'bad.json', { type: 'application/json' })
    await expect(importJSON(bad)).rejects.toBeTruthy()
  })

  it('importJSON resolves valid schema', async () => {
    const goodState = {
      meta: {
        createdAt: new Date().toISOString(),
        startDate: '2025-10-27',
        lastEdit: new Date().toISOString(),
        theme: 'dark',
      },
      days: {},
      weeklySummary: {},
      events: [],
    }
    const good = new File([JSON.stringify(goodState)], 'good.json', { type: 'application/json' })
    const parsed = await importJSON(good)
    expect(parsed?.meta?.theme).toBe('dark')
  })
})