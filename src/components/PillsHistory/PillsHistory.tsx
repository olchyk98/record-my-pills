import { addIndex, map, take } from 'ramda'
import { AlignmentView } from '../AlignmentView'
import { useTakenPillsStore } from '../../stores/takenPills'
import { PillTake } from './PillTake'
import { TakenPill } from '../../types'
import { useStyles } from './PillsHistory.styles'

export const PillsHistory = () => {
  const takenPillsStore = useTakenPillsStore()
  const styles = useStyles()

  const renderableItems = take(15, takenPillsStore.takenPills)

  return (
    <AlignmentView
      className={ styles.container }
      y="center"
      full="x"
    >
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
            ), renderableItems)
          }
        </AlignmentView>
      </AlignmentView>
    </AlignmentView>
  )
}
