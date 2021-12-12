import cx from 'classnames'
import { useStyles } from './AlignmentView.styles'
import { AlignmentViewProps } from './types'

export const AlignmentView = (props: AlignmentViewProps) => {
  const { children, ...otherProps } = props
  const styles = useStyles(props)

  // TODO: Fix property leak
  return (
    <div
      { ...otherProps }
      className={ cx(styles.container, otherProps.className) }
    >
      { children }
    </div>
  )
}
