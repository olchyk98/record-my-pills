import { makeStyles } from '@material-ui/styles'
import { Dictionary } from 'ramda'
import { Alignment, AlignmentViewProps } from './types'

const createFullFn = (axis: 'y' | 'x') => (
  ({ full }: AlignmentViewProps) => (
    (full === 'both' || full === axis)
      ? '100%'
      : 'auto'
  )
)

const getAlignmentName = (alignment?: Alignment) => (
  {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  }[alignment || 'start']
)

export const useStyles = makeStyles<Dictionary<unknown>, AlignmentViewProps>({
  container: {
    height: createFullFn('y'),
    width: createFullFn('x'),
    display: 'flex',
    gap: ({ gap }) => gap || 0,
    alignItems: ({ y }) => getAlignmentName(y),
    justifyContent: ({ x }) => getAlignmentName(x),
    flexDirection: ({ type }) => type || 'row',
    position: 'relative',
  },
})

