import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState, exportCSV } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saveState and loadState persist data', () => {
    const s = { meta: { createdAt: new Date().toISOString(), startDate: '2025-10-27' }, days: { '1': { date: '2025-10-27', noSmoking: true } } }
    saveState(s)
    const loaded = loadState()
    expect(loaded?.days?.['1']?.noSmoking).toBe(true)
  })

  it('exportCSV header columns', () => {
    const s = { meta: { createdAt: new Date().toISOString(), startDate: '2025-10-27' }, days: {} }
    // monkey-patch anchor to capture download content
    const clicks = []
    const origCreateObjectURL = URL.createObjectURL
    URL.createObjectURL = (blob) => {
      const text = typeof blob.text === 'function' ? blob.text() : Promise.resolve('')
      clicks.push(text)
      return 'blob:url'
    }
    const origCreateEl = document.createElement
    document.createElement = (tag) => ({ href: '', download: '', click: () => {} })
    exportCSV(s)
    URL.createObjectURL = origCreateObjectURL
    document.createElement = origCreateEl
    expect(clicks.length).toBe(1)
    return clicks[0].then((content) => {
      const header = content.split('\n')[0]
      expect(header).toContain('day')
      expect(header).toContain('date')
      expect(header).toContain('noSmoking')
      expect(header).toContain('exercise')
      expect(header).toContain('respiration')
      expect(header).toContain('foodClean')
      expect(header).toContain('focus90')
      expect(header).toContain('sleepHours')
      expect(header).toContain('mood')
      expect(header).toContain('notes')
    })
  })
})