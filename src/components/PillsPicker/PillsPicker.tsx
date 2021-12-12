import { find, map, forEach, clamp, any,  append, findIndex, update, addIndex } from 'ramda'
import { useCallback, useState } from 'react'
import { AlignmentView } from '../AlignmentView'
import { Pill } from './Pill'
import { useStyles } from './PillsPicker.styles'
import { Pills, PillName } from '../../data/Pills'
import { createNamePred } from './createNamePred'
import { useTakenPillsStore } from '../../stores/takenPills'
import { TakenPill } from '../../types'

interface PillState {
  name: PillName
  amount: number
}

type LocalPillState = Pick<PillState, 'amount'>

const isActiveState = ({ amount }: PillState): boolean => (
  amount > 0
)

export const PillsPicker = () => {
  const styles = useStyles()

  const takenPillsStore = useTakenPillsStore()
  const [ pills, setPills ] = useState<PillState[]>([])

  const setPillState = (name: PillName, state: LocalPillState): PillState[] => {
    const namePred = createNamePred(name)
    const itemIndex = findIndex(namePred, pills)
    const nextPillState = { name, ...state }

    const stateUpdator = (
      itemIndex === -1
        ? append(nextPillState)
        : update(itemIndex, nextPillState)
    )

    const nextPills = stateUpdator(pills)

    setPills(nextPills)
    return nextPills
  }

  const getPillState = (name: PillName): LocalPillState | undefined => (
    find(createNamePred(name), pills) 
  )

  const checkIfCanSubmit = useCallback(() => (
    any(isActiveState, pills)
  ), [ pills ])

  const handleSubmit = () => {
    if(!checkIfCanSubmit()) return

    forEach(
      (pillState) => {
        if(!isActiveState(pillState)) return

        const record: TakenPill = {
          name: pillState.name,
          takenAt: Date.now(),
          amountOfPills: clamp(1, Infinity, pillState.amount || 1),
        }

        takenPillsStore.recordPill(record)
      },
      pills,
    )

    setPills([])
  }

  return (
    <AlignmentView
      x="center"
      y="center"
      full="both"
      type="column"
      gap={ 15 }
    >
      <h2>Record a pill 🕰</h2>
      <div className={ styles.pillsGrid }>
        {
          addIndex<typeof Pills[number]>(map)(
            ({ iconURL, name }, index) => {
              const state = getPillState(name)

              return (
                <Pill
                  key={ index }
                  iconURL={ iconURL }
                  name={ name }
                  onChange={ (amount) => setPillState(
                    name,
                    { amount },
                  ) }
                  selectedAmount={ state?.amount }
                />
              )
            },
            Pills,
          )
        }
      </div>
      <button
        type="button"
        disabled={ !checkIfCanSubmit() }
        className={ styles.submitButton }
        onClick={ handleSubmit }
      >
        Record
      </button>
    </AlignmentView>
  )
}
