import { addIndex, map } from 'ramda'
import { AlignmentView } from '../AlignmentView'
import { useTakenPillsStore } from '../../stores/takenPills'
import { PillTake } from './PillTake'
import { TakenPill } from 'src/types'

export const PillsHistory = () => {
  const takenPillsStore = useTakenPillsStore()

  return (
    <AlignmentView
      x="center"
      y="center"
      full="both"
      type="column"
      gap={ 30 }
    >
      <h2>My Pills Log 💊</h2>
      <AlignmentView gap={ 30 } type="column">
        {
          addIndex<TakenPill>(map)(({ name, amountOfPills, takenAt }, index) => (
            <PillTake
              key={ index }
              name={ name }
              takenAt={ takenAt }
              amount={ amountOfPills }
            />
          ), takenPillsStore.takenPills)
        }
      </AlignmentView>
    </AlignmentView>
  )
}
