import { z } from 'zod'

export const DaySchema = z.object({
  date: z.string().optional(),
  noSmoking: z.boolean().optional(),
  exercise: z.boolean().optional(),
  respiration: z.boolean().optional(),
  foodClean: z.boolean().optional(),
  focus90: z.boolean().optional(),
  sleepHours: z.number().optional(),
  mood: z.number().min(0).max(10).optional(),
  notes: z.string().optional(),
})

export const WeeklySchema = z.record(z.string(), z.object({
  energy: z.number().optional(),
  anxiety: z.number().optional(),
  respiration: z.string().optional(),
  notes: z.string().optional(),
}))

export const EventSchema = z.object({
  type: z.string(),
  dateTime: z.string(),
  note: z.string().optional(),
})

export const StateSchema = z.object({
  meta: z.object({
    createdAt: z.string(),
    startDate: z.string(),
    lastEdit: z.string().optional(),
    theme: z.enum(['dark','light']).optional(),
  }),
  days: z.record(z.string(), DaySchema).optional(),
  weeklySummary: WeeklySchema.optional(),
  events: z.array(EventSchema).optional(),
})

export function validateState(state) {
  const parse = StateSchema.safeParse(state)
  return parse.success ? parse.data : null
}