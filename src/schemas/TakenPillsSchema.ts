import Joi from 'joi'
import { TakenPill } from '../types'

export const TakenPillSchema = Joi.object<TakenPill>({
  name: Joi
    .string()
    .min(2)
    .max(30)
    .required(),
  takenAt: Joi
    .date()
    .timestamp('javascript'),
  amountOfPills: Joi
    .number()
    .greater(0),
})

export const TakenPillsSchema = Joi.array().items(
  TakenPillSchema,
)
