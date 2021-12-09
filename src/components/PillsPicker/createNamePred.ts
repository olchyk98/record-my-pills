import { propEq } from 'ramda'

export const createNamePred = (name: string) => propEq('name', name)
