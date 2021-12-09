import cx from 'classnames'
import { useStyles } from './AlignmentView.styles'
import { AlignmentViewProps } from './types'

export const AlignmentView = (props: AlignmentViewProps) => {
  const { children, ...otherProps } = props
  const styles = useStyles(props)

  return (
    <div
      { ...otherProps }
      className={ cx(styles.container, otherProps.className) }
    >
      { children }
    </div>
  )
}
