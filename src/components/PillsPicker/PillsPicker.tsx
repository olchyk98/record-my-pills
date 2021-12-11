import { find, map, forEach, clamp, any,  none, reject, append } from 'ramda'
import { useMemo, useState } from 'react'
import { AlignmentView } from '../AlignmentView'
import { Pill } from './Pill'
import { useStyles } from './PillsPicker.styles'
import { Pills, PillName } from '../../data/Pills'
import { createNamePred } from './createNamePred'
import { useTakenPills } from '../../stores/takenPills'
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

  const takenPills = useTakenPills()
  const [ pills, setPills ] = useState<PillState[]>([])

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

  const getPillState = (name: PillName): LocalPillState | undefined => (
    find(createNamePred(name), pills) 
  )

  const handleSubmit = () => {
    forEach(
      (pillState) => {
        if(isActiveState(pillState)) return

        const record: TakenPill = {
          name: pillState.name,
          takenAt: Date.now(),
          amountOfPills: clamp(1, Infinity, pillState.amount || 1),
        }

        takenPills.recordPill(record)
      },
      pills,
    )
  }

  const canSubmit = useMemo(() => any(isActiveState, pills), [ pills ])

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
          map(
            ({ iconURL, name, maxAmountPerDay }) => {
              const state = getPillState(name)

              return (
                <Pill
                  iconURL={ iconURL }
                  name={ name }
                  onChange={ (amount) => setPillState(
                    name,
                    { amount },
                  ) }
                  selectedAmount={ state?.amount }
                  amountLeft={  maxAmountPerDay - 0  }
                  totalAmount={ maxAmountPerDay }
                />
              )
            },
            Pills,
          )
        }
      </div>
      {
        canSubmit && (
          <button
            type="button"
            className={ styles.submitButton }
            onClick={ handleSubmit }
          >
            Record
          </button>
        )
      }
    </AlignmentView>
  )
}
