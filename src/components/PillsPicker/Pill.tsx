import { useRef } from 'react'
import { AlignmentView } from '../AlignmentView'
import { useStyles } from './Pill.styles'
import { PillProps } from './types'

const parseInputValue = (input: HTMLInputElement | null): number => (
  parseFloat(input?.value || '0')
)

export const Pill = (props: PillProps) => {
  const {
    name,
    iconURL,
    onChange,
    amountLeft,
    totalAmount,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = useStyles(props)

  return (
    <AlignmentView
      type="column"
      y="center"
      gap={ 40 }
      className={ styles.container }
    >
      <span>
        <img className={ styles.icon } alt="pill" src={ iconURL } />
      </span>
      <span className={ styles.name }>{ name }</span>
      <input
        ref={ inputRef }
        onChange={ ({ target }) => {
          onChange(parseInputValue(target))
        } }
        type="number"
        placeholder={ `${amountLeft}/${totalAmount} pills left` }
        className={ styles.amountInput }
      />
    </AlignmentView>
  )
}
