import { AlignmentView } from './components/AlignmentView'
import { PillsHistory } from './components/PillsHistory'
import { PillsPicker } from './components/PillsPicker'

export const App = () => (
  <AlignmentView
    full="both"
  >
    <PillsPicker />
    <PillsHistory />
  </AlignmentView>
)
