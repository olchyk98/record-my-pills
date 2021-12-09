import { find, map, forEach, clamp } from 'ramda'
import { AlignmentView } from '../AlignmentView'
import { Pill } from './Pill'
import { useStyles } from './PillsPicker.styles'
import { Pills, PillName } from 'src/data/Pills'
import { usePills } from './usePills'
import { createNamePred } from './createNamePred'
import { LocalPillState } from './usePills'
import { useTakenPills } from '../../stores/takenPills'
import { TakenPill } from '../../types'

export const PillsPicker = () => {
  const styles = useStyles()

  const takenPills = useTakenPills()
  const [ activePills, setPillState ] = usePills([])

  const getPillState = (name: PillName): LocalPillState | undefined => (
    find(createNamePred(name), activePills) 
  )

  const handleSubmit = () => {
    forEach(
      (pillState) => {
        if(!pillState.isActive) return

        const record: TakenPill = {
          name: pillState.name,
          takenAt: Date.now(),
          amountOfPills: clamp(1, Infinity, pillState.amount || 1),
        }

        takenPills.recordPill(record)
      },
      activePills,
    )
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
          map(
            ({ iconURL, name, maxAmountPerDay }) => {
              const state = getPillState(name)
              const isActive = state?.isActive || false

              return (
                <Pill
                  active={ isActive }
                  iconURL={ iconURL }
                  name={ name }
                  onChange={ (isActive, amount) => setPillState(
                    name,
                    { isActive, amount },
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
      <button
        type="button"
        className={ styles.submitButton }
        onClick={ handleSubmit }
      >
        Record
      </button>
    </AlignmentView>
  )
}
