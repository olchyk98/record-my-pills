import { useState } from 'react'
import { none, reject, append } from 'ramda'
import { createNamePred } from './createNamePred'
import { PillName } from 'src/data/Pills'

export interface PillState {
  name: PillName
  isActive: boolean
  amount: number
}

export type LocalPillState = Pick<PillState, 'isActive' | 'amount'>

export const usePills = (initialState: PillState[] = []): [
  PillState[],
  (name: PillName, state: LocalPillState) => PillState[]
] => {
  const [ pills, setPills ] = useState<PillState[]>(initialState)

  const setPillState = (name: PillName, state: LocalPillState): PillState[] => {
    const namePred = createNamePred(name)

    const nextPills = (
      none(namePred, pills)
        ? append({ name, ...state }, pills)
        : reject(namePred, pills)
    )

    setPills(nextPills)
    return nextPills
  }

  return [ pills, setPillState ]
}
