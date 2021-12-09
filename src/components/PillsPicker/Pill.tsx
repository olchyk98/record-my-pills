import { MouseEvent, useRef } from 'react'
import { AlignmentView } from '../AlignmentView'
import { useStyles } from './Pill.styles'
import { PillProps } from './types'

const parseInputValue = (input: HTMLInputElement | null): number => (
  parseFloat(input?.value ?? '0')
)

export const Pill = (props: PillProps) => {
  const {
    name,
    iconURL,
    onChange,
    active,
    amountLeft,
    totalAmount,
    selectedAmount,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = useStyles(props)

  const handleSelect = (e: MouseEvent) => {
    if(e.target === inputRef.current) return

    onChange(
      !active,
      parseInputValue(inputRef?.current),
    )
  }

  console.log( (active) ? (selectedAmount || 1) : '' , selectedAmount)
  return (
    <AlignmentView
      onClick={ handleSelect }
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
        value={ (active) ? (selectedAmount || 1) : '' }
        onChange={ ({ target }) => {
          console.log(active, parseInputValue(target))
          onChange(active, parseInputValue(target))
        } }
        type="number"
        placeholder={ `${amountLeft}/${totalAmount} pills left` }
        className={ styles.amountInput }
      />
    </AlignmentView>
  )
}
