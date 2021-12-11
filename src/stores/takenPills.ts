import { assoc, prepend, prop }  from 'ramda'
import { subscribeWithSelector, StoreApiWithSubscribeWithSelector } from 'zustand/middleware'
import create, { GetState, SetState } from 'zustand'
import { TakenPill } from '../types'

interface TakenPillsState {
  takenPills: TakenPill[]
  recordPill(record: TakenPill): void
}

const takenPillsJSON = window.localStorage.getItem('takenPills')
const initialTakenPills: TakenPill[] = (takenPillsJSON)
  ? JSON.parse(takenPillsJSON)
  : []

export const useTakenPills = create<
  TakenPillsState,
  SetState<TakenPillsState>,
  GetState<TakenPillsState>,
  StoreApiWithSubscribeWithSelector<TakenPillsState>
>(subscribeWithSelector(
  (set) => ({
    takenPills: initialTakenPills,
    recordPill: (record) => {
      set((state) => {
        const nextTakenPills = prepend(record, state.takenPills)
        return assoc('takenPills', nextTakenPills, state)
      })
    },
  }),
))

useTakenPills.subscribe(prop('takenPills'), (takenPills) => {
  window.localStorage.setItem(
    'takenPills',
    JSON.stringify(takenPills),
  )
})
