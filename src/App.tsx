import { AlignmentView } from './components/AlignmentView'
import { PillsHistory } from './components/PillsHistory'
import { PillsPicker } from './components/PillsPicker'

export function App() {
  return (
    <AlignmentView full="both">
      <PillsPicker />
      <PillsHistory />
    </AlignmentView>
  )
}
