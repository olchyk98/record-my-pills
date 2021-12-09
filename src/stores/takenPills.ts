import { assoc, prepend }  from 'ramda'
import create from 'zustand'
import { TakenPill } from '../types'

interface TakenPillsState {
  takenPills: TakenPill[]
  recordPill(record: TakenPill): void
}

const takenPillsJSON = window.localStorage.getItem('takenPills')
const initialTakenPills: TakenPill[] = (takenPillsJSON)
  ? JSON.parse(takenPillsJSON)
  : []

// NOTE: I allow of the reducers to not be pure,
// as I don't want to spend time on designing this.
export const useTakenPills = create<TakenPillsState>((set) => ({
  takenPills: initialTakenPills,
  recordPill: (record) => {
    set((state) => {
      const nextTakenPills = prepend(record, state.takenPills)
      window.localStorage.setItem(
        'takenPills',
        JSON.stringify(nextTakenPills),
      )
      console.log(nextTakenPills)

      return assoc('takenPills', nextTakenPills, state)
    })
  },
}))
