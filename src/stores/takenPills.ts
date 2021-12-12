import { assoc, prepend, prop }  from 'ramda'
import Joi from 'joi'
import { subscribeWithSelector, StoreApiWithSubscribeWithSelector } from 'zustand/middleware'
import create, { GetState, SetState } from 'zustand'
import { TakenPill } from '../types'
import { TakenPillsSchema } from '../schemas'

interface TakenPillsState {
  takenPills: TakenPill[]
  recordPill(record: TakenPill): void
}

function getInitialState (): TakenPill[] {
  const takenPillsJSON = window.localStorage.getItem('takenPills')
  const initialTakenPills: TakenPill[] = (takenPillsJSON)
    ? JSON.parse(takenPillsJSON)
    : []
  console.log(initialTakenPills)

  try {
    Joi.assert(initialTakenPills, TakenPillsSchema)
  } catch(err) {
    const doClear = confirm(`Cache data is corrupted: "${err}". Do you want to clear the store to be able to run the application?`)
    if(doClear) {
      window.localStorage.removeItem('takenPills')
      return []
    }
    throw new Error('Application Execution Paused.')
  }

  return initialTakenPills
}

export const useTakenPillsStore = create<
  TakenPillsState,
  SetState<TakenPillsState>,
  GetState<TakenPillsState>,
  StoreApiWithSubscribeWithSelector<TakenPillsState>
>(subscribeWithSelector(
  (set) => ({
    takenPills: getInitialState(),
    recordPill: (record) => {
      set((state) => {
        const nextTakenPills = prepend(record, state.takenPills)
        return assoc('takenPills', nextTakenPills, state)
      })
    },
  }),
))

useTakenPillsStore.subscribe(prop('takenPills'), (takenPills) => {
  window.localStorage.setItem(
    'takenPills',
    JSON.stringify(takenPills),
  )
})
